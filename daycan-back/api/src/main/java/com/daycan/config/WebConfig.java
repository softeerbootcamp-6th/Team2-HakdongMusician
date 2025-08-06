package com.daycan.config;

import com.daycan.auth.security.resolver.AuthenticatedUserArgumentResolver;
import com.daycan.common.logging.MdcLoggingInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

  private final AuthenticatedUserArgumentResolver resolver;

//  @Override
//  public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
//    resolvers.add(resolver);
//  }
   @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new MdcLoggingInterceptor());
  }
}
