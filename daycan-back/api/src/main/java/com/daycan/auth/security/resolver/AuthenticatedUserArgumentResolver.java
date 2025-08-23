package com.daycan.auth.security.resolver;

import com.daycan.auth.model.UserDetails;
import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.AuthErrorStatus;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class AuthenticatedUserArgumentResolver implements HandlerMethodArgumentResolver {

  private static final String USER_DETAILS_ATTRIBUTE = "userDetails";
  @Override
  public boolean supportsParameter(MethodParameter parameter) {
    return parameter.hasParameterAnnotation(AuthenticatedUser.class)
        && UserDetails.class.isAssignableFrom(parameter.getParameterType());
  }

  @Override
  public Object resolveArgument(
      MethodParameter parameter,
      ModelAndViewContainer mavContainer,
      NativeWebRequest webRequest,
      WebDataBinderFactory binderFactory
  ) {
    HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
    Object attribute = request.getAttribute(USER_DETAILS_ATTRIBUTE);

    if (!(attribute instanceof UserDetails principal)) {
      throw new ApplicationException(AuthErrorStatus.UNAUTHENTICATED);
    }

    Class<?> requiredType = parameter.getParameterType();

    if (!requiredType.isInstance(principal)) {
      throw new ApplicationException(AuthErrorStatus.PRINCIPAL_TYPE_MISMATCH);
    }

    return requiredType.cast(principal);
  }

}

