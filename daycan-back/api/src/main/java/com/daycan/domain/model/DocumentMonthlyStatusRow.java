package com.daycan.domain.model;

import com.daycan.api.dto.center.response.DocumentStatusResponse;

import com.daycan.domain.entry.document.report.ReportStatus;
import com.daycan.domain.entry.document.sheet.SheetStatus;
import com.daycan.domain.enums.DocumentStatus;
import java.time.LocalDate;

public record DocumentMonthlyStatusRow(
    LocalDate date,
    Long careSheetId,
    Long careReportId,
    DocumentStatus docStatus
) {
  public DocumentStatusResponse toResponse() {
    SheetStatus sheet   = docStatus.toSheetStatus();
    ReportStatus report = docStatus.toReportStatus(careSheetId);

    return new DocumentStatusResponse(
        date,
        new DocumentStatusResponse.CareSheetStatusResponse(careSheetId, sheet),
        new DocumentStatusResponse.CareReportStatusResponse(careReportId, report)
    );
  }
}

