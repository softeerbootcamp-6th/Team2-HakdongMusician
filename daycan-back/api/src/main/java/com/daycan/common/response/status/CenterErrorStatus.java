package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CenterErrorStatus implements ErrorStatus {
  /**
   * 존재하지 않는 센터입니다. (HTTP 400)
   */
  NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 센터입니다.");

  private final HttpStatus httpStatus;
  private final String message;

  CenterErrorStatus(HttpStatus httpStatus, String message) {
    this.httpStatus = httpStatus;
    this.message = message;
  }
}
