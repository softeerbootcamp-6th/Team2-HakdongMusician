package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum SuccessStatus implements Status {
  OK(HttpStatus.OK, 200, "응답 성공");

  private final HttpStatus httpStatus;
  private final int code;
  private final String message;

  SuccessStatus(HttpStatus httpStatus, int code, String message) {
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
  }

}
