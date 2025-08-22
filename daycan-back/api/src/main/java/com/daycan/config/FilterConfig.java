package com.daycan.config;

import com.daycan.auth.service.AuthService;
import com.daycan.auth.service.BlacklistService;
import com.daycan.auth.security.JwtTokenProvider;
import com.daycan.auth.security.filter.JwtAuthFilter;
import com.daycan.auth.security.filter.LoginFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.springframework.web.filter.CorsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class FilterConfig {

  @Bean
  public FilterRegistrationBean<CorsFilter> corsFilter() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.setAllowedOriginPatterns(List.of(
        "http://localhost:5173",
        "http://localhost:5174",
        "https://*.daycan.kr"
    ));
    config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS","PATCH"));
    config.setAllowedHeaders(List.of("*"));
    config.setExposedHeaders(List.of("Set-Cookie"));
    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
    bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
    return bean;
  }
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


