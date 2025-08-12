package com.daycan.api.dto.center.response;

import com.daycan.domain.entry.document.report.ReportStatus;
import com.daycan.domain.entry.document.sheet.SheetStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;

public record DocumentStatusResponse(
    @Schema(description = "문서 날짜", example = "2025-08-03")
    LocalDate documentDate,
    @Schema(description = "기록지 정보")
    CareSheetStatusResponse careSheet,
    @Schema(description = "리포트 정보")
    CareReportStatusResponse careReport
) {

  public record CareSheetStatusResponse(
      @Schema(description = "기록지 ID", example = "5") Long careSheetId,
      @Schema(description = "기록지 상태", example = "DONE") SheetStatus status
  ) {

  }

  public record CareReportStatusResponse(
      @Schema(description = "리포트 ID", example = "5") Long careReportId,
      @Schema(description = "리포트 상태", example = "REVIEWED") ReportStatus status
  ) {

  }
}
