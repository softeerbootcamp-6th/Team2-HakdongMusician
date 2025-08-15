package com.daycan.common.response.status.error;

import com.daycan.common.response.status.Status;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AuthErrorStatus implements Status {
  // 400
  INVALID_USER_TYPE(HttpStatus.BAD_REQUEST,40010 ,"잘못된 사용자 타입입니다."),
  NON_TOKEN(HttpStatus.UNAUTHORIZED, 40011,"토큰이 없습니다."),

  // 401
  INVALID_CREDENTIAL(HttpStatus.UNAUTHORIZED, 40110,"아이디 또는 비밀번호가 일치하지 않습니다."),
  MALFORMED_TOKEN(HttpStatus.UNAUTHORIZED, 40111,"잘못된 토큰 형식입니다."),
  EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED,40112 ,"토큰이 만료되었습니다."),
  INVALID_SIGNATURE(HttpStatus.UNAUTHORIZED, 40113,"토큰 서명이 유효하지 않습니다."),
  BLACKLISTED_TOKEN(HttpStatus.UNAUTHORIZED, 40114,"블랙리스트에 등록된 토큰입니다."),
  TOKEN_BLACKLISTED(HttpStatus.UNAUTHORIZED, 40115,"사용이 중지된 토큰입니다."),

  // 403
  CENTER_ONLY(HttpStatus.FORBIDDEN, 40310,"접근이 금지된 사용자입니다."),

  // 404
  USER_NOT_FOUND(HttpStatus.NOT_FOUND, 40410,"사용자를 찾을 수 없습니다."),

  // 500
  UNKNOWN_AUTH_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,50000, "인증 중 알 수 없는 오류가 발생했습니다."),
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
