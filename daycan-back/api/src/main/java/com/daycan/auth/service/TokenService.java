package com.daycan.auth.service;

import com.daycan.auth.model.AuthPrincipal;
import com.daycan.auth.model.TokenType;
import com.daycan.auth.dto.LoginResponse;
import com.daycan.auth.repository.RefreshTokenRepository;
import com.daycan.auth.entity.RefreshToken;
import com.daycan.auth.dto.Token;
import com.daycan.auth.security.JwtTokenProvider;
import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.AuthErrorStatus;
import jakarta.security.auth.message.AuthException;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {

  private final JwtTokenProvider jwtTokenProvider;
  private final BlacklistService blacklistService;
  private final RefreshTokenRepository refreshTokenRepository;
  private final AuthService authService;

  /* ================================================================
     Refresh-Token -> Access / Refresh 재발급  (RTR 정책)
     ================================================================ */
  public LoginResponse reissue(String rawRefreshToken, String rawOldAccessToken) {

    /* 1. 저장된 RefreshToken 존재‧만료 확인 */
    RefreshToken saved = refreshTokenRepository.findByToken(rawRefreshToken)
        .orElseThrow(() -> new ApplicationException(AuthErrorStatus.BLACKLISTED_TOKEN));

    if (saved.isExpired()) {
      throw new ApplicationException(AuthErrorStatus.EXPIRED_TOKEN);
    }

    /* 2. 구조·서명 검증 */
    if (!jwtTokenProvider.validate(rawRefreshToken)) {
      throw new ApplicationException(AuthErrorStatus.INVALID_SIGNATURE);
    }

    /* 3. subject → AuthPrincipal 복원 */
    String subject = jwtTokenProvider.parseSubject(rawRefreshToken);
    AuthPrincipal principal = authService.loadByUserId(subject);

    /* 4. 기존 토큰 무효화 ― DB 삭제 + 블랙리스트 */
    refreshTokenRepository.delete(saved);

    Instant refreshExp = jwtTokenProvider.getExpiry(rawRefreshToken).toInstant();
    blacklistService.blacklist(rawRefreshToken, TokenType.REFRESH, refreshExp);

    if (rawOldAccessToken != null && jwtTokenProvider.validate(rawOldAccessToken)) {
      Instant accessExp = jwtTokenProvider.getExpiry(rawOldAccessToken).toInstant();
      blacklistService.blacklist(rawOldAccessToken, TokenType.ACCESS, accessExp);
    }

    /* 5. 새 토큰 발급 */
    Token newAccess = jwtTokenProvider.createAccessToken(subject);
    Token newRefresh = jwtTokenProvider.createRefreshToken(subject);

    /* 6. 새 RefreshToken 저장 */
    refreshTokenRepository.save(
        new RefreshToken(subject, newRefresh.value(), newRefresh.expiry().toInstant())
    );

    return new LoginResponse(newAccess.value(), newRefresh.value());
  }
}
