package com.daycan.auth.bean;

import com.daycan.auth.AuthException;
import com.daycan.auth.AuthPrincipal;
import com.daycan.auth.CenterPrincipal;
import com.daycan.auth.MemberPrincipal;
import com.daycan.auth.UserType;
import com.daycan.auth.payload.LoginResponse;
import com.daycan.auth.repository.RefreshTokenRepository;
import com.daycan.auth.token.RefreshToken;
import com.daycan.auth.token.Token;
import com.daycan.common.response.status.AuthErrorStatus;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.mindrot.jbcrypt.BCrypt;


@Service
@RequiredArgsConstructor
public class AuthService {

  private final JwtTokenProvider jwtTokenProvider;
  private final RefreshTokenRepository refreshTokenRepository;

  /* ----------------------------------------------------------------
     데모용 인-메모리 계정 DB
     ---------------------------------------------------------------- */
  private final Map<String, Center> centerMap = new HashMap<>();
  private final Map<String, Member> memberMap = new HashMap<>();

  {
    centerMap.put("123456", new Center("123456", hashPassword("1234")));
    memberMap.put("AA123", new Member("AA123", hashPassword("abcd")));
  }

  /* ================================================================
     1) 로그인
     ================================================================ */
  public AuthPrincipal authenticate(String username, String rawPw, UserType userType) {
    return switch (userType) {
      case CENTER -> {
        Center c = centerMap.get(username);
        if (c == null || !verifyPassword(rawPw, c.getPassword())) {
          throw new AuthException(AuthErrorStatus.INVALID_CREDENTIAL);
        }
        yield new CenterPrincipal(c.getUsername());
      }
      case MEMBER -> {
        Member m = memberMap.get(username);
        if (m == null || !verifyPassword(rawPw, m.getPassword())) {
          throw new AuthException(AuthErrorStatus.INVALID_CREDENTIAL);
        }
        yield new MemberPrincipal(m.getUsername());
      }
    };
  }

  /* ================================================================
     2) 토큰 발급  (▶  RefreshToken 저장 or 갱신)
     ================================================================ */
  public LoginResponse issueTokens(AuthPrincipal principal) {

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

  /* ================================================================
     3) 토큰 재발급 (RTR)  –  token 컬럼으로 조회!
     ================================================================ */
  public LoginResponse reissue(String refreshToken, String oldAccessToken) {

    RefreshToken saved = refreshTokenRepository.findByToken(refreshToken)
        .orElseThrow(() -> new AuthException(AuthErrorStatus.BLACKLISTED_TOKEN));

    if (saved.isExpired()) {
      throw new AuthException(AuthErrorStatus.EXPIRED_TOKEN);
    }

    AuthPrincipal principal = loadByUserId(saved.getUserId());

    // ① 기존 RefreshToken 폐기
    refreshTokenRepository.delete(saved);

    // ② (선택) 기존 AccessToken 블랙리스트 처리
    //    blacklistService.blacklist(oldAccessToken, TokenType.ACCESS);

    // ③ 새 토큰 발급 & 저장
    return issueTokens(principal);
  }

  /* ================================================================
     4) 헬퍼
     ================================================================ */
  public AuthPrincipal parse(String token) {
    String subject = jwtTokenProvider.parseSubject(token);
    return loadByUserId(subject);
  }

  public AuthPrincipal loadByUserId(String sub) {
    String[] parts = sub.split(":");
    if (parts.length != 2) {
      throw new AuthException(AuthErrorStatus.MALFORMED_TOKEN);
    }

    UserType type = UserType.from(parts[0]);
    String username = parts[1];

    return switch (type) {
      case CENTER -> {
        Center c = centerMap.get(username);
        if (c == null) {
          throw new AuthException(AuthErrorStatus.USER_NOT_FOUND);
        }
        yield new CenterPrincipal(c.getUsername());
      }
      case MEMBER -> {
        Member m = memberMap.get(username);
        if (m == null) {
          throw new AuthException(AuthErrorStatus.USER_NOT_FOUND);
        }
        yield new MemberPrincipal(m.getUsername());
      }
    };
  }

  private String hashPassword(String raw) {
    return BCrypt.hashpw(raw, BCrypt.gensalt());
  }

  private boolean verifyPassword(String raw, String hashed) {
    return BCrypt.checkpw(raw, hashed);
  }

  @Getter
  @AllArgsConstructor
  static class Center {

    String username;
    String password;
  }

  @Getter
  @AllArgsConstructor
  static class Member {

    String username;
    String password;
  }
}
