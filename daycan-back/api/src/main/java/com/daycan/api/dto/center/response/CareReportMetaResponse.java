package com.daycan.api.dto.center.response;

import com.daycan.domain.enums.DocumentStatus;
import java.time.LocalDate;

public record CareReportMetaResponse(
    Long id,
    String recipientName,
    LocalDate scheduledDate,      // 예정 발송일 (or 생성일)
    DocumentStatus status,
    boolean delayed               // 지연 여부 플래그
) {

}
