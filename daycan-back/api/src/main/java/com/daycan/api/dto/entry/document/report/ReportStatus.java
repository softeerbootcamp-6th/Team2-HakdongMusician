package com.daycan.api.dto.entry.document.report;

public enum ReportStatus {
  NOT_APPLICABLE, // 해당 없음
  PENDING,        // 작성 중
  CREATED,           // 작성 완료
  REVIEWED, // 검토 완료
  SENDING, // 전송 중
  RESERVED, // 예약 완료
  DONE // 전송 완료
}
