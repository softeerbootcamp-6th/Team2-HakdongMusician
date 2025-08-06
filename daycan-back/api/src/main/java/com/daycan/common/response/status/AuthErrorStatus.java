package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AuthErrorStatus implements Status {

  INVALID_CREDENTIAL(HttpStatus.UNAUTHORIZED, 40110,"아이디 또는 비밀번호가 일치하지 않습니다."),
  USER_NOT_FOUND(HttpStatus.NOT_FOUND, 40411,"사용자를 찾을 수 없습니다."),
  INVALID_USER_TYPE(HttpStatus.BAD_REQUEST,40012 ,"잘못된 사용자 타입입니다."),
  MALFORMED_TOKEN(HttpStatus.UNAUTHORIZED, 40113,"잘못된 토큰 형식입니다."),
  EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED,40114 ,"토큰이 만료되었습니다."),
  INVALID_SIGNATURE(HttpStatus.UNAUTHORIZED, 40115,"토큰 서명이 유효하지 않습니다."),
  UNKNOWN_AUTH_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,50016, "인증 중 알 수 없는 오류가 발생했습니다."),
  BLACKLISTED_TOKEN(HttpStatus.UNAUTHORIZED, 40117,"블랙리스트에 등록된 토큰입니다."),
  TOKEN_BLACKLISTED(HttpStatus.UNAUTHORIZED, 40118,"사용이 중지된 토큰입니다."),
  CENTER_ONLY(HttpStatus.FORBIDDEN, 40319,"접근이 금지된 사용자입니다."),

  ;

  private final HttpStatus httpStatus;
  private final int code;
  private final String message;

  AuthErrorStatus(HttpStatus httpStatus, int code,String message) {
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
  }
}
