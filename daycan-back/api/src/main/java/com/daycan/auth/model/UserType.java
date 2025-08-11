package com.daycan.auth.model;

import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.AuthErrorStatus;

public enum UserType {
  CENTER, MEMBER;

  public static UserType from(String v) {
    try {
      return valueOf(v.toUpperCase());
    } catch (IllegalArgumentException e) {
      throw new ApplicationException(AuthErrorStatus.INVALID_USER_TYPE);
    }
  }
}
