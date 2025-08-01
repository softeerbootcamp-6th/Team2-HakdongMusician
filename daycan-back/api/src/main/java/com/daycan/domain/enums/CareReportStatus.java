package com.daycan.domain.enums;

import lombok.Getter;

@Getter
public enum CareReportStatus {
  PENDING("생성 중"),
  CREATED("생성 완료"),
  REVIEWED("검토 완료"),
  SENDING("메세지 전송중"),
  DONE("메세지 전송 완료");

  private final String description;

  CareReportStatus(String description) {
    this.description = description;
  }


}
