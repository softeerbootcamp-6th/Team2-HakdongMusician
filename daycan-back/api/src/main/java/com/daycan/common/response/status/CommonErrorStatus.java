package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 애플리케이션 전반에서 공통적으로 발생할 수 있는 에러 상태를 정의합니다. 도메인별 세부 에러 상태는 각 도메인 패키지 아래에 별도의 Enum 클래스로 구현하세요.
 */
@Getter
public enum CommonErrorStatus implements Status {

  //400
  METHOD_ARGUMENT_NOT_VALID(HttpStatus.BAD_REQUEST, 40000, "요청 바디 검증에 실패했습니다."),

  CONSTRAINT_VIOLATION(HttpStatus.BAD_REQUEST, 40001, "파라미터 검증에 실패했습니다."),
  INVALID_FILE_FORMAT(HttpStatus.BAD_REQUEST, 40002,
      "잘못된 파일 형식입니다. 지원하지 않는 파일입니다."),

  // 404
  NOT_FOUND(HttpStatus.NOT_FOUND, 40403, "찾지 못했습니다"),

  // 409
  CONFLICT(HttpStatus.CONFLICT, 40900, "요청이 충돌했습니다. 중복된 데이터가 존재합니다."),

  //500
  INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 50000, "서버 내부 오류입니다."),
  ;


  private final HttpStatus httpStatus;
  private final int code;
  private final String message;

  CommonErrorStatus(HttpStatus httpStatus, int code, String message) {
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
  }
}