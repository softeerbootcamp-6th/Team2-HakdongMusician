package com.daycan.common.response.status;

import org.springframework.http.HttpStatus;

public enum AuthErrorStatus implements ErrorStatus {

  INVALID_CREDENTIAL(HttpStatus.UNAUTHORIZED, "아이디 또는 비밀번호가 일치하지 않습니다."),
  USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),
  INVALID_USER_TYPE(HttpStatus.BAD_REQUEST, "잘못된 사용자 타입입니다."),
  MALFORMED_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 토큰 형식입니다."),
  EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
  UNSUPPORTED_TOKEN(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다."),
  INVALID_SIGNATURE(HttpStatus.UNAUTHORIZED, "토큰 서명이 유효하지 않습니다."),
  TOKEN_BLACKLISTED(HttpStatus.UNAUTHORIZED, "사용이 중지된 토큰입니다."),
  UNKNOWN_AUTH_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "인증 중 알 수 없는 오류가 발생했습니다."),
  BLACKLISTED_TOKEN(HttpStatus.UNAUTHORIZED, "블랙리스트에 등록된 토큰입니다.")
  ;

  private final HttpStatus httpStatus;
  private final String message;

  AuthErrorStatus(HttpStatus httpStatus, String message) {
    this.httpStatus = httpStatus;
    this.message = message;
  }

  @Override
  public HttpStatus getHttpStatus() {
    return httpStatus;
  }

  @Override
  public String getMessage() {
    return message;
  }
}
