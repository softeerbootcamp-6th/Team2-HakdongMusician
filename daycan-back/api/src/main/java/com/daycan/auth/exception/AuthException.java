package com.daycan.auth.exception;

import com.daycan.common.response.status.AuthErrorStatus;

public class AuthException extends RuntimeException {

  public AuthException(AuthErrorStatus errorStatus) {
    super(errorStatus.getMessage());
  }

}
