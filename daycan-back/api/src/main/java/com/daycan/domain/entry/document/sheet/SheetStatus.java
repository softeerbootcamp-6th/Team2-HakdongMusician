package com.daycan.domain.entry.document.sheet;

import com.daycan.domain.enums.DocumentStatus;

public enum SheetStatus {
  NOT_APPLICABLE, // 해당 없음
  PENDING,      // 작성 중
  DONE,
  ;// 작성 완료

  public static SheetStatus from(DocumentStatus status) {
    return status.toSheetStatus();
  }
}
