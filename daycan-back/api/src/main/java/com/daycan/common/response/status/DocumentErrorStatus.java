package com.daycan.common.response.status;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum DocumentErrorStatus implements Status {
  REPORT_NOT_FOUND(HttpStatus.NOT_FOUND, 40450, "존재하지 않는 리포트."),
  DOCUMENT_NOT_FOUND(HttpStatus.NOT_FOUND, 40451, "존재하지 않는 문서.")
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
