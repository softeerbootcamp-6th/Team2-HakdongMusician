package com.daycan.dto.admin.response;

import com.daycan.domain.enums.CareReportStatus;
import java.time.LocalDate;

public record CareReportMetaResponse(
    Long id,
    String recipientName,
    LocalDate scheduledDate,      // 예정 발송일 (or 생성일)
    CareReportStatus status,
    boolean delayed               // 지연 여부 플래그
) {

}
