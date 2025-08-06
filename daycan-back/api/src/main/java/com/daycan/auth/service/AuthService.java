package com.daycan.auth.service;

import com.daycan.auth.model.UserDetails;
import com.daycan.auth.model.CenterDetails;
import com.daycan.auth.model.MemberDetails;
import com.daycan.auth.model.UserType;
import com.daycan.auth.dto.LoginResponse;
import com.daycan.auth.repository.RefreshTokenRepository;
import com.daycan.auth.entity.RefreshToken;
import com.daycan.auth.dto.Token;
import com.daycan.auth.security.JwtTokenProvider;
import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.AuthErrorStatus;
import com.daycan.domain.entity.Center;
import com.daycan.domain.entity.Member;
import com.daycan.repository.CenterRepository;
import com.daycan.repository.MemberRepository;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.mindrot.jbcrypt.BCrypt;


@Service
@RequiredArgsConstructor
public class AuthService {

  private final JwtTokenProvider jwtTokenProvider;
  private final RefreshTokenRepository refreshTokenRepository;
  private final CenterRepository centerRepository;
  private final MemberRepository memberRepository;


  // 1) 로그인
  public UserDetails authenticate(String username, String rawPw, UserType userType) {
    return switch (userType) {
      case CENTER -> {
        Center center = centerRepository.findByUsername(username)
            .orElseThrow(() -> new ApplicationException(AuthErrorStatus.INVALID_CREDENTIAL));

        if (!verifyPassword(rawPw, center.getPassword())) {
          throw new ApplicationException(AuthErrorStatus.INVALID_CREDENTIAL);
        }

        yield new CenterDetails(center);
      }

      case MEMBER -> {
        Member member = memberRepository.findByUsername(username)
            .orElseThrow(() -> new ApplicationException(AuthErrorStatus.INVALID_CREDENTIAL));

        if (!verifyPassword(rawPw, member.getPassword())) {
          throw new ApplicationException(AuthErrorStatus.INVALID_CREDENTIAL);
        }

        yield new MemberDetails(member);
      }
    };
  }

  // 2) 토큰 발급  (RefreshToken 저장 or 갱신)
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
  // 3) 토큰 재발급 (RTR)  –  token 컬럼으로 조회
  public LoginResponse reissue(String refreshToken, String oldAccessToken) {

    RefreshToken saved = refreshTokenRepository.findByToken(refreshToken)
        .orElseThrow(() -> new ApplicationException(AuthErrorStatus.BLACKLISTED_TOKEN));

    if (saved.isExpired()) {
      throw new ApplicationException(AuthErrorStatus.EXPIRED_TOKEN);
    }

    UserDetails principal = loadByUserId(saved.getUserId());

    // 기존 RefreshToken 폐기
    refreshTokenRepository.delete(saved);

//    // (선택) 기존 AccessToken 블랙리스트 처
//    blacklistService.blacklist(oldAccessToken, TokenType.ACCESS);

    // 새 토큰 발급 & 저장
    return issueTokens(principal);
  }

  // 4) 헬퍼
  public UserDetails parse(String token) {
    String subject = jwtTokenProvider.parseSubject(token);
    return loadByUserId(subject);
  }

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


  private boolean verifyPassword(String raw, String hashed) {
    return BCrypt.checkpw(raw, hashed);
  }
}
