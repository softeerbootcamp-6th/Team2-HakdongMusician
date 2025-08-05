package com.daycan.auth.bean;

import com.daycan.auth.AuthException;
import com.daycan.auth.AuthPrincipal;
import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.common.response.status.AuthErrorStatus;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class AuthenticatedUserArgumentResolver implements HandlerMethodArgumentResolver {

  @Override
  public boolean supportsParameter(MethodParameter parameter) {
    return parameter.hasParameterAnnotation(AuthenticatedUser.class)
        && AuthPrincipal.class.isAssignableFrom(parameter.getParameterType());
  }

  @Override
  public Object resolveArgument(
      MethodParameter parameter,
      ModelAndViewContainer mavContainer,
      NativeWebRequest webRequest,
      WebDataBinderFactory binderFactory
  ) {
    HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
    AuthPrincipal principal = (AuthPrincipal) request.getAttribute("principal");

    if (principal == null) {
      throw new AuthException(AuthErrorStatus.INVALID_CREDENTIAL);
    }

    return principal;
  }
}

