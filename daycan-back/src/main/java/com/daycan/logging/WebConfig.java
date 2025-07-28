package com.tmp.boiler.logging;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Interceptor 등록 설정
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

  /**
   * MdcLoggingInterceptor를 등록한다.
   */
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new MdcLoggingInterceptor());
  }
}
