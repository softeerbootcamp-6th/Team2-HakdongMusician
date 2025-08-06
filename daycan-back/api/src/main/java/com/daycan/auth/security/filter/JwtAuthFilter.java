package com.daycan.auth.security.filter;

import com.daycan.auth.model.UserDetails;
import com.daycan.auth.model.TokenType;
import com.daycan.auth.model.UserType;
import com.daycan.auth.service.AuthService;
import com.daycan.auth.service.BlacklistService;
import com.daycan.auth.security.JwtTokenProvider;
import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.common.response.status.AuthErrorStatus;
import com.daycan.common.response.status.Status;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthFilter implements Filter {
  private static final String ADMIN_PREFIX = "/admin";
  private static final String USER_DETAILS_ATTRIBUTE = "userDetails";

  private final JwtTokenProvider jwtTokenProvider;
  private final AuthService authService;          //  주입
  private final BlacklistService blacklistService;
  private final ObjectMapper objectMapper;

  public JwtAuthFilter(
      JwtTokenProvider jwtTokenProvider,
      AuthService authService,
      BlacklistService blacklistService,
      ObjectMapper objectMapper) {
    this.jwtTokenProvider = jwtTokenProvider;
    this.authService = authService;
    this.blacklistService = blacklistService;
    this.objectMapper = objectMapper;
  }

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    HttpServletRequest req = (HttpServletRequest) request;
    HttpServletResponse res = (HttpServletResponse) response;

    String rawToken = resolveToken(req);
    if (rawToken == null) {                       // 비인증 요청
      chain.doFilter(request, response);
      return;
    }

    try {
      // 블랙리스트 확인
      if (blacklistService.isBlacklisted(rawToken, TokenType.ACCESS)) {
        throw new ApplicationException(AuthErrorStatus.BLACKLISTED_TOKEN);
      }

      // 구조·서명 검증
      if (!jwtTokenProvider.validate(rawToken)) {
        throw new ApplicationException(AuthErrorStatus.INVALID_SIGNATURE);
      }

      // 주체(subject) -> UserDetails 복원
      String subject = jwtTokenProvider.parseSubject(rawToken);   // "CENTER:123456"
      UserDetails user = authService.loadByUserId(subject);

      // 4. 권한 체크
      if (user.getUserType() == UserType.MEMBER && req.getRequestURI().startsWith(ADMIN_PREFIX)) {
        throw new ApplicationException(AuthErrorStatus.CENTER_ONLY);
      }

      // 컨트롤러로 전달
      log.debug("인증 완료 → {} [{}]", user.getUsername(), user.getUserType());
      req.setAttribute(USER_DETAILS_ATTRIBUTE, user);

      chain.doFilter(request, response);

    } catch (ApplicationException e) {                    // 토큰 관련 예외
      handleError(res, e.getStatus(), e.getMessage());

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
  private void handleError(HttpServletResponse res, Status status, String msg)
      throws IOException {
    res.setStatus(status.getHttpStatus().value());
    res.setCharacterEncoding("UTF-8");
    res.setContentType("application/json");
    res.getWriter().write(
        objectMapper.writeValueAsString(ResponseWrapper.onFailure(status, msg))
    );
  }
}
