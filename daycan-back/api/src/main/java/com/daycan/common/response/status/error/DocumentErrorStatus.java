package com.daycan.common.response.status.error;

import com.daycan.common.response.status.Status;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum DocumentErrorStatus implements Status {
  // 400
  VITAL_NOT_NULL(HttpStatus.BAD_REQUEST, 40050, "vital의 모든 정보는 null일 수 없습니다."),
  INVALID_STATUS_TRANSITION(HttpStatus.BAD_REQUEST, 40051,
      "잘못된 상태 전이입니다. 현재 상태에서 해당 상태로 전이할 수 없습니다."),
  INVALID_STATUS_FOR_REPORT(HttpStatus.BAD_REQUEST, 40052,
      "리포트가 생성될 수 없는 상태입니다. 기록지가 '작성 완료' 상태여야 합니다."),
  // 404
  DOCUMENT_NOT_FOUND(HttpStatus.NOT_FOUND, 40450, "존재하지 않는 문서."),
  SHEET_NOT_FOUND(HttpStatus.NOT_FOUND, 40451, "존재하지 않는 기록지"),
  REPORT_NOT_FOUND(HttpStatus.NOT_FOUND, 40452, "존재하지 않는 리포트."),

  NULL_MEMBER_OR_CENTER(HttpStatus.PRECONDITION_FAILED, 41350,
      "기록지 작성 시, memberId와 centerId는 null일 수 없습니다."),
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
