package com.daycan.domain.enums;

import lombok.Getter;

@Getter
public enum CareSheetStatus {
  NOT_APPLICABLE("해당없음"),
  PENDING("작성 전"),
  DONE("작성 완료");

  private final String description;

  CareSheetStatus(String description) {
    this.description = description;
  }
}
