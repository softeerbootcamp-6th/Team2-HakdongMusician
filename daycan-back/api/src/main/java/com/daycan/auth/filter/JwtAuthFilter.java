package com.daycan.auth.filter;

import com.daycan.auth.AuthPrincipal;
import com.daycan.auth.TokenType;
import com.daycan.auth.bean.AuthService;
import com.daycan.auth.bean.BlacklistService;
import com.daycan.auth.bean.JwtTokenProvider;
import com.daycan.auth.AuthException;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.common.response.status.AuthErrorStatus;
import com.daycan.common.response.status.ErrorStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthFilter implements Filter {

  private final JwtTokenProvider jwtTokenProvider;
  private final AuthService authService;          // ◀  주입
  private final BlacklistService blacklistService;
  private final ObjectMapper     objectMapper;

  public JwtAuthFilter(
      JwtTokenProvider jwtTokenProvider,
      AuthService      authService,
      BlacklistService blacklistService,
      ObjectMapper     objectMapper) {
    this.jwtTokenProvider = jwtTokenProvider;
    this.authService      = authService;
    this.blacklistService = blacklistService;
    this.objectMapper     = objectMapper;
  }

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    HttpServletRequest  req = (HttpServletRequest) request;
    HttpServletResponse res = (HttpServletResponse) response;

    String rawToken = resolveToken(req);          // "eyJhbGciOi..."
    if (rawToken == null) {                       // 비인증 요청
      chain.doFilter(request, response);
      return;
    }

    try {
      /* 1. 블랙리스트 확인 */
      if (blacklistService.isBlacklisted(rawToken, TokenType.ACCESS))
        throw new AuthException(AuthErrorStatus.BLACKLISTED_TOKEN);

      /* 2. 구조·서명 검증 */
      if (!jwtTokenProvider.validate(rawToken))
        throw new AuthException(AuthErrorStatus.INVALID_SIGNATURE);

      /* 3. 주체(subject) → AuthPrincipal 복원 */
      String        subject    = jwtTokenProvider.parseSubject(rawToken);   // "CENTER:123456"
      AuthPrincipal principal  = authService.loadByUserId(subject);

      /* 4. 컨트롤러로 전달 */
      log.debug("인증 완료 → {} [{}]", principal.getUsername(), principal.getUserType());
      req.setAttribute("principal", principal);

      chain.doFilter(request, response);

    } catch (AuthException e) {                    // 토큰 관련 예외
      handleError(res, e.getErrorStatus(), e.getMessage());

    } catch (Exception e) {                        // 기타 예외
      log.error("인증 필터 예외", e);
      handleError(res, AuthErrorStatus.UNKNOWN_AUTH_ERROR, e.getMessage());
    }
  }

  /* --------------------------------------------------
     Bearer 토큰 추출
     -------------------------------------------------- */
  private String resolveToken(HttpServletRequest request) {
    String bearer = request.getHeader("Authorization");
    return (bearer != null && bearer.startsWith("Bearer "))
        ? bearer.substring(7)
        : null;
  }

  /* --------------------------------------------------
     공통 에러 응답
     -------------------------------------------------- */
  private void handleError(HttpServletResponse res, ErrorStatus status, String msg)
      throws IOException {
    res.setStatus(status.getHttpStatus().value());
    res.setCharacterEncoding("UTF-8");
    res.setContentType("application/json");
    res.getWriter().write(
        objectMapper.writeValueAsString(ResponseWrapper.onFailure(status, msg))
    );
  }
}
