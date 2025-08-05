package com.daycan.auth.security.filter;

import com.daycan.auth.model.AuthPrincipal;
import com.daycan.auth.service.AuthService;
import com.daycan.auth.exception.AuthException;
import com.daycan.auth.dto.LoginRequest;
import com.daycan.auth.dto.LoginResponse;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.common.response.status.AuthErrorStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoginFilter implements Filter {

  private final AuthService  authService;
  private final ObjectMapper objectMapper;

  public LoginFilter(AuthService authService, ObjectMapper objectMapper) {
    this.authService  = authService;
    this.objectMapper = objectMapper;
  }

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    HttpServletRequest  req = (HttpServletRequest) request;
    HttpServletResponse res = (HttpServletResponse) response;

    /* /auth/login POST 만 처리 */
    if (!req.getRequestURI().equals("/auth/login") ||
        !req.getMethod().equalsIgnoreCase("POST")) {
      chain.doFilter(request, response);
      return;
    }

    try {
      /* 1. 요청 파싱 */
      LoginRequest login = objectMapper.readValue(req.getInputStream(), LoginRequest.class);

      /* 2. 인증 */
      AuthPrincipal principal = authService.authenticate(
          login.username(), login.password(), login.userType());

      /* 3. 토큰 발급 */
      LoginResponse tokens = authService.issueTokens(principal);
      log.info("로그인 성공 → {} [{}]", principal.getUsername(), principal.getUserType());

      /* 4. 성공 응답 */
      writeJson(res, HttpServletResponse.SC_OK, ResponseWrapper.onSuccess(tokens));

    } catch (AuthException e) {                       // 인증 오류
      writeJson(res, e.getErrorStatus().getHttpStatus().value(),
          ResponseWrapper.onFailure(e.getErrorStatus(), e.getMessage()));

    } catch (Exception e) {                           // 기타 예외
      writeJson(res, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
          ResponseWrapper.onFailure(AuthErrorStatus.UNKNOWN_AUTH_ERROR, e.getMessage()));
    }
  }

  /* --------------------------------------------------
     공통 JSON 응답 헬퍼
     -------------------------------------------------- */
  private void writeJson(HttpServletResponse res, int status, Object body) throws IOException {
    res.setStatus(status);
    res.setCharacterEncoding("UTF-8");
    res.setContentType("application/json;charset=UTF-8");
    res.getWriter().write(objectMapper.writeValueAsString(body));
  }
}
