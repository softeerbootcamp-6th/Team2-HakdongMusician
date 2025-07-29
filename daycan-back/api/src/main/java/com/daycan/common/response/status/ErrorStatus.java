package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorStatus {
  BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
  INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류입니다.");
  // 필요 시 추가

  private final HttpStatus httpStatus;
  private final String message;

  ErrorStatus(HttpStatus httpStatus, String message) {
    this.httpStatus = httpStatus;
    this.message = message;
  }

}
