package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum SuccessStatus {
  OK(HttpStatus.OK, "응답 성공");

  private final HttpStatus httpStatus;
  private final String message;

  SuccessStatus(HttpStatus httpStatus, String message) {
    this.httpStatus = httpStatus;
    this.message = message;
  }

}
