package com.daycan.auth.security.resolver;

import com.daycan.auth.model.UserDetails;
import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.AuthErrorStatus;
import jakarta.annotation.Nullable;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.lang.NonNull;
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
    return parameter.hasParameterAnnotation(AuthenticatedUser.class);
  }

  @Override
  public Object resolveArgument(
      @NonNull MethodParameter parameter,
      ModelAndViewContainer mavContainer,
      @NonNull NativeWebRequest webRequest,
      WebDataBinderFactory binderFactory
  ) {
    HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
    Object attr = request.getAttribute(USER_DETAILS_ATTRIBUTE);

    if (!(attr instanceof UserDetails<?> principal)) {
      throw new ApplicationException(AuthErrorStatus.UNAUTHENTICATED);
    }

    Class<?> required = parameter.getParameterType();

    if (required.isInstance(principal)) {
      return required.cast(principal);
    }

    Object entity = principal.getEntity();
    if (required.isInstance(entity)) {
      return entity;
    }

    throw new ApplicationException(
        AuthErrorStatus.PRINCIPAL_TYPE_MISMATCH,
        "required=" + required.getName()
            + ", actualPrincipal=" + principal.getClass().getName()
            + ", entity=" + (entity == null ? "null" : entity.getClass().getName())
    );
  }
}

