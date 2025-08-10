package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum DocumentErrorStatus implements Status {
  // 400
  VITAL_NOT_NULL(HttpStatus.BAD_REQUEST, 40050, "vital의 모든 정보는 null일 수 없습니다."),

  // 404
  DOCUMENT_NOT_FOUND(HttpStatus.NOT_FOUND, 40450, "존재하지 않는 문서."),
  SHEET_NOT_FOUND(HttpStatus.NOT_FOUND, 40451, "존재하지 않는 기록지"),
  REPORT_NOT_FOUND(HttpStatus.NOT_FOUND, 40452, "존재하지 않는 리포트."),
  ;

  private final HttpStatus httpStatus;
  private final int code;
  private final String message;

  DocumentErrorStatus(HttpStatus httpStatus, int code, String message) {
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
  }
}
