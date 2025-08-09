package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MemberErrorStatus implements Status {
  MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, 40430, "존재하지 않는 회원입니다."),
  MEMBER_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, 40031, "이미 존재하는 회원입니다."),
  MEMBER_INVALID_PARAM(HttpStatus.BAD_REQUEST, 40032, "회원 파라미터가 잘못되었습니다."),
  MEMBER_PASSWORD_NOT_FOUND(HttpStatus.BAD_REQUEST, 40033, "회원 비밀번호가 없는데요?"),
  ;
  private final HttpStatus httpStatus;
  private final int code;
  private final String message;

  MemberErrorStatus(HttpStatus httpStatus, int code, String message) {
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
  }
}
