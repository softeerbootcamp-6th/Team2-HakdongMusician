package com.daycan.domain.enums;

import lombok.Getter;

@Getter
public enum DocumentStatus {
  SHEET_PENDING("대기중"),
  SHEET_DONE("작성 완료"),
  REPORT_PENDING("리포트 대기중"),
  REPORT_CREATED("리포트 생성 완료"),
  REPORT_REVIEWED("리포트 검토 완료"),
  REPORT_SENDING("리포트 전송중"),
  REPORT_DONE("리포트 전송 완료");

  private final String description;

  DocumentStatus(String description) {
    this.description = description;
  }


}
