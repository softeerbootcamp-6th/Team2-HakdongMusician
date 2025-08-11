package com.daycan.api.dto.center.response;

import com.daycan.api.dto.entry.document.report.ReportStatus;
import java.time.LocalDate;

public record CareReportMetaResponse(
    Long id,
    String recipientName,
    LocalDate scheduledDate,      // 예정 발송일 (or 생성일)
    ReportStatus status,
    boolean delayed               // 지연 여부 플래그
) {

}
