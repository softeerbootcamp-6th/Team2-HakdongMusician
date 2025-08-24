package com.daycan.auth.service;

import com.daycan.auth.model.TokenType;
import com.daycan.auth.model.UserDetails;
import com.daycan.auth.model.CenterDetails;
import com.daycan.auth.model.MemberDetails;
import com.daycan.auth.model.UserType;
import com.daycan.auth.dto.LoginResponse;
import com.daycan.auth.repository.RefreshTokenRepository;
import com.daycan.auth.entity.RefreshToken;
import com.daycan.auth.dto.Token;
import com.daycan.auth.security.JwtTokenProvider;
import com.daycan.auth.security.PasswordHasher;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.AuthErrorStatus;
import com.daycan.domain.entity.Center;
import com.daycan.domain.entity.Member;
import com.daycan.repository.jpa.CenterRepository;
import com.daycan.repository.jpa.MemberRepository;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class AuthService {

  private final JwtTokenProvider jwtTokenProvider;
  private final RefreshTokenRepository refreshTokenRepository;
  private final CenterRepository centerRepository;
  private final MemberRepository memberRepository;
  private final BlacklistService blacklistService;


  // 1) 로그인
  @Transactional(readOnly = true)
  public UserDetails authenticate(String username, String rawPw, UserType userType) {
    return switch (userType) {
      case CENTER -> {
        Center center = centerRepository.findByUsername(username)
            .orElseThrow(() -> new ApplicationException(AuthErrorStatus.INVALID_CREDENTIAL));

        if (isWrong(rawPw, center.getPassword())) {
          throw new ApplicationException(AuthErrorStatus.INVALID_CREDENTIAL);
        }

        yield new CenterDetails(center);
      }

      case MEMBER -> {
        Member member = memberRepository.findByUsername(username)
            .orElseThrow(() -> new ApplicationException(AuthErrorStatus.INVALID_CREDENTIAL));

        if (isWrong(rawPw, member.getPassword())) {
          throw new ApplicationException(AuthErrorStatus.INVALID_CREDENTIAL);
        }

        yield new MemberDetails(member);
      }
    };
  }

  // 2) 토큰 발급  (RefreshToken 저장 or 갱신)
  @Transactional
  public LoginResponse issueTokens(UserDetails principal) {

    Token access = jwtTokenProvider.createAccessToken(principal.getUniqueIdentifier());
    Token refresh = jwtTokenProvider.createRefreshToken(principal.getUniqueIdentifier());

    String userId = principal.getUniqueIdentifier();
    Instant exp = refresh.expiry().toInstant();

    refreshTokenRepository.findById(userId)
        .ifPresentOrElse(
            entity -> entity.updateToken(refresh.value(), exp),     // 기존값 갱신
            () -> refreshTokenRepository.save(
                new RefreshToken(userId, refresh.value(), exp)) // 최초 저장
        );

    return new LoginResponse(access.value(), refresh.value());
  }

  // 토큰 재발급 : RTR
  @Transactional
  public LoginResponse reissue(String rawRefreshToken) {
    RefreshToken saved = refreshTokenRepository.findByToken(rawRefreshToken)
        .orElseThrow(() -> new ApplicationException(AuthErrorStatus.INVALID_REFRESH));

    if(blacklistService.isBlacklisted(rawRefreshToken, TokenType.REFRESH) ) {
      throw new ApplicationException(AuthErrorStatus.BLACKLISTED_TOKEN);
    }

    if (saved.isExpired()) {
      throw new ApplicationException(AuthErrorStatus.EXPIRED_TOKEN);
    }

    /* 구조, 서명 검증 */
    if (!jwtTokenProvider.validate(rawRefreshToken)) {
      throw new ApplicationException(AuthErrorStatus.INVALID_SIGNATURE);
    }

    /* subject, UserDetails 복원 */
    String subject = jwtTokenProvider.parseSubject(rawRefreshToken);
    UserDetails principal = loadByUserId(subject);

    /* 기존 토큰 무효화 ― DB 삭제 + 블랙리스트 */
    refreshTokenRepository.delete(saved);

    Instant refreshExp = jwtTokenProvider.getExpiry(rawRefreshToken).toInstant();
    blacklistService.blacklist(rawRefreshToken, TokenType.REFRESH, refreshExp);

    /* 새 토큰 발급 */
    Token newAccess = jwtTokenProvider.createAccessToken(subject);
    Token newRefresh = jwtTokenProvider.createRefreshToken(subject);

    /* 새 RefreshToken 저장 */
    refreshTokenRepository.save(
        new RefreshToken(subject, newRefresh.value(), newRefresh.expiry().toInstant())
    );

    return new LoginResponse(newAccess.value(), newRefresh.value());
  }

  public void verifyPassword(UserDetails principal, String inputPassword) {
    String hashed = PasswordHasher.hash(inputPassword);
    if (!principal.checkPassword(hashed)) {
      throw new ApplicationException(AuthErrorStatus.CENTER_ONLY);
    }
  }

  @Transactional(readOnly = true, propagation = Propagation.MANDATORY)
  public UserDetails loadByUserId(String sub) {
    String[] parts = sub.split(":");
    if (parts.length != 2) {
      throw new ApplicationException(AuthErrorStatus.MALFORMED_TOKEN);
    }

    UserType type = UserType.from(parts[0]);
    String username = parts[1];

    return switch (type) {
      case CENTER -> {
        Center center = centerRepository.findByUsername(username)
            .orElseThrow(() -> new ApplicationException(AuthErrorStatus.USER_NOT_FOUND));
        yield new CenterDetails(center);
      }

      case MEMBER -> {
        Member member = memberRepository.findByUsername(username)
            .orElseThrow(() -> new ApplicationException(AuthErrorStatus.USER_NOT_FOUND));
        yield new MemberDetails(member);
      }
    };
  }


  private boolean isWrong(String raw, String hashed) {
    return !PasswordHasher.matches(raw, hashed);
  }
}
