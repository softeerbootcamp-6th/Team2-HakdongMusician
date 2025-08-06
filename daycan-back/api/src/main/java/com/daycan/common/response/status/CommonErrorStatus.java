package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 애플리케이션 전반에서 공통적으로 발생할 수 있는 에러 상태를 정의합니다. 도메인별 세부 에러 상태는 각 도메인 패키지 아래에 별도의 Enum 클래스로 구현하세요.
 */
@Getter
public enum CommonErrorStatus implements ErrorStatus {

  /**
   * 잘못된 요청입니다. (HTTP 400)
   */
  BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

  METHOD_ARGUMENT_NOT_VALID(HttpStatus.BAD_REQUEST, "요청 바디 검증에 실패했습니다."),

  /**
   * 파라미터 검증 실패입니다. (@RequestParam · @PathVariable · @Validated) (HTTP 400)
   */
  CONSTRAINT_VIOLATION(HttpStatus.BAD_REQUEST, "파라미터 검증에 실패했습니다."),

  /**
   * 서버 내부 오류입니다. (HTTP 500)
   */
  INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류입니다."),

  /*
   * NOT FOUND (HTTP 404)
   */
  NOT_FOUND(HttpStatus.NOT_FOUND, "찾지 못했습");

  private final HttpStatus httpStatus;
  private final String message;

  CommonErrorStatus(HttpStatus httpStatus, String message) {
    this.httpStatus = httpStatus;
    this.message = message;
  }
}