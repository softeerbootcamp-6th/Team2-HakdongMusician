package com.daycan.auth;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.AuthErrorStatus;

public class AuthException extends ApplicationException {

  public AuthException(AuthErrorStatus errorStatus) {
    super(errorStatus);
  }

  public AuthException(AuthErrorStatus errorStatus, Object data) {
    super(errorStatus, data);
  }

}
