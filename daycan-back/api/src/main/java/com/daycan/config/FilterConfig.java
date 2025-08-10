package com.daycan.config;

import com.daycan.auth.service.AuthService;
import com.daycan.auth.service.BlacklistService;
import com.daycan.auth.security.JwtTokenProvider;
import com.daycan.auth.security.filter.JwtAuthFilter;
import com.daycan.auth.security.filter.LoginFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.AntPathMatcher;

@Configuration
public class FilterConfig {
  /**
   * 로그인 필터 등록
   * - /auth/login 경로에 대해 LoginFilter를 적용
   * - 순서: 1
   */
  @Bean
  public FilterRegistrationBean<LoginFilter> loginFilter(
      AuthService authService,
      ObjectMapper objectMapper
  ) {
    FilterRegistrationBean<LoginFilter> reg = new FilterRegistrationBean<>();
    reg.setFilter(new LoginFilter(authService, objectMapper));
    reg.addUrlPatterns("/auth/login");
    reg.setOrder(1);
    return reg;
  }

  /**
   * JWT 인증 필터 등록
   * - 모든 경로에 대해 JwtAuthFilter를 적용
   * - 순서: 2 (LoginFilter 다음)
   */
  @Bean
  public FilterRegistrationBean<JwtAuthFilter> jwtAuthFilter(
      JwtTokenProvider jwtTokenProvider,
      AuthService authService,
      BlacklistService blacklistService,
      ObjectMapper objectMapper
  ) {
    FilterRegistrationBean<JwtAuthFilter> reg = new FilterRegistrationBean<>();

    reg.setFilter(new JwtAuthFilter(
        jwtTokenProvider, authService, blacklistService, objectMapper, new AntPathMatcher()));
    reg.addUrlPatterns("/*");
    reg.setOrder(2);
    return reg;
  }
}


