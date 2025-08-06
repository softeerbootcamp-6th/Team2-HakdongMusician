package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum StaffErrorStatus implements ErrorStatus {
  /**
   * 존재하지 않는 종사자입니다. (HTTP 404)
   */
  NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 종사자입니다."),

  /**
   * 이미 존재하는 사용자명입니다. (HTTP 409)
   */
  USERNAME_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 사용자명입니다.");

  private final HttpStatus httpStatus;
  private final String message;

  StaffErrorStatus(HttpStatus httpStatus, String message) {
    this.httpStatus = httpStatus;
    this.message = message;
  }
}