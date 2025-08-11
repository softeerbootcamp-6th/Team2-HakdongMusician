package com.daycan.auth.security.filter;

import com.daycan.auth.model.UserDetails;
import com.daycan.auth.model.TokenType;
import com.daycan.auth.model.UserType;
import com.daycan.auth.service.AuthService;
import com.daycan.auth.service.BlacklistService;
import com.daycan.auth.security.JwtTokenProvider;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.common.response.status.AuthErrorStatus;
import com.daycan.common.response.status.Status;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.AntPathMatcher;

@Slf4j
public class JwtAuthFilter implements Filter {

  private static final String ADMIN_PREFIX = "/admin";
  private static final String USER_DETAILS_ATTRIBUTE = "userDetails";
  private static final List<String> EXCLUDE_PATTERNS = List.of(
      "/auth/login", "/auth/reissue",
      "/swagger-ui.html", "/swagger-ui/**",
      "/v3/api-docs/**", "/", "/api"
  );


  private final JwtTokenProvider jwtTokenProvider;
  private final AuthService authService;          //  주입
  private final BlacklistService blacklistService;
  private final ObjectMapper objectMapper;
  private final AntPathMatcher matcher;

  public JwtAuthFilter(
      JwtTokenProvider jwtTokenProvider,
      AuthService authService,
      BlacklistService blacklistService,
      ObjectMapper objectMapper,
      AntPathMatcher matcher
  ) {
    this.jwtTokenProvider = jwtTokenProvider;
    this.authService = authService;
    this.blacklistService = blacklistService;
    this.objectMapper = objectMapper;
    this.matcher = matcher;
  }
  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    HttpServletRequest req = (HttpServletRequest) request;
    HttpServletResponse res = (HttpServletResponse) response;

    // 경로 제외 하기
    if (isExcluded(req)) {
      log.debug("인증 제외 경로: {}", req.getRequestURI());
      chain.doFilter(request, response);
      return;
    }

    String rawToken = resolveToken(req);
    try {
      if (rawToken == null || rawToken.isBlank()) {
        throw new ApplicationException(AuthErrorStatus.NON_TOKEN);
      }
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

  private String resolveToken(HttpServletRequest request) {
    String bearer = request.getHeader("Authorization");
    return (bearer != null && bearer.startsWith("Bearer "))
        ? bearer.substring(7)
        : null;
  }

  private void handleError(HttpServletResponse res, Status status, String msg)
      throws IOException {
    res.setStatus(status.getHttpStatus().value());
    res.setCharacterEncoding("UTF-8");
    res.setContentType("application/json");
    res.getWriter().write(
        objectMapper.writeValueAsString(ResponseWrapper.onFailure(status, msg))
    );
  }

  private boolean isExcluded(HttpServletRequest req) {
    String uri = req.getRequestURI();
    String ctx = req.getContextPath();
    if (ctx != null && !ctx.isEmpty() && uri.startsWith(ctx)) {
      uri = uri.substring(ctx.length());
    }
    if ("OPTIONS".equalsIgnoreCase(req.getMethod())) return true;

    for (String p : EXCLUDE_PATTERNS) {
      if (matcher.match(p, uri)) return true;
    }
    return false;
  }
}
