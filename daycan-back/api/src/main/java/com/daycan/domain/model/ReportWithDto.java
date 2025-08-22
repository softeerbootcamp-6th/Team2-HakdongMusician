package com.daycan.domain.model;

import com.daycan.api.dto.common.FullReportDto;
import com.daycan.domain.entity.document.CareReport;

public record ReportWithDto(
    CareReport careReport,
    FullReportDto fullReportDto
) {

}
