package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;



@Getter
public enum CenterErrorStatus implements Status {

  NOT_FOUND(HttpStatus.NOT_FOUND, 40420,"존재하지 않는 센터입니다."),
  MEMBER_NOT_ALLOWED(HttpStatus.FORBIDDEN,40321 ,"센터 회원이 아닙니다."),
  ;

  private final HttpStatus httpStatus;
  private final int code;
  private final String message;

  CenterErrorStatus(HttpStatus httpStatus, int code,String message) {
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
  }
}
