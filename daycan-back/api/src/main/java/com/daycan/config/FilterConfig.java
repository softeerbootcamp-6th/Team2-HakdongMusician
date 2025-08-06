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

@Configuration
public class FilterConfig {

  /* -------------------------------------------------
     1) 로그인 필터 (예시용)
     ------------------------------------------------- */
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

  /* -------------------------------------------------
     2) JWT 인증 필터  (← AuthService 추가 주입)
     ------------------------------------------------- */
  @Bean
  public FilterRegistrationBean<JwtAuthFilter> jwtAuthFilter(
      JwtTokenProvider jwtTokenProvider,
      AuthService authService,
      BlacklistService blacklistService,
      ObjectMapper objectMapper
  ) {
    FilterRegistrationBean<JwtAuthFilter> reg = new FilterRegistrationBean<>();
    reg.setFilter(new JwtAuthFilter(jwtTokenProvider, authService, blacklistService, objectMapper));
    reg.addUrlPatterns("/*");                      // 전역
    reg.setOrder(2);
    return reg;
  }
}


