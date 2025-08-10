package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum StaffErrorStatus implements Status {
  // 404
  NOT_FOUND(HttpStatus.NOT_FOUND, 40440,"존재하지 않는 종사자입니다."),


  // 400
  ALREADY_EXISTS(HttpStatus.CONFLICT,40940 ,"이미 존재하는 사용자명입니다.");

  private final HttpStatus httpStatus;
  private final int code;
  private final String message;

  StaffErrorStatus(HttpStatus httpStatus,int code ,String message) {
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
  }
}