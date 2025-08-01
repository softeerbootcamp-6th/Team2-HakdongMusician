package com.daycan.application.admin.dto;

import com.daycan.domain.enums.CareReportStatus;
import com.daycan.domain.enums.CareSheetStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Date;

public record DocumentStatusResponse(
    @Schema(description = "생성 날짜", example = "5")
    Date createdAt,
    @Schema(description = "기록지 정보", example = "5")
    CareSheetStatusResponse careSheet,
    @Schema(description = "리포트 정보", example = "5")
    CareReportStatusResponse careReport
) {

  public record CareSheetStatusResponse(
      @Schema(description = "기록지 ID", example = "5")
      Long careSheetId,

      @Schema(description = "기록지 상태", example = "2")
      CareSheetStatus status
  ) {

  }

  public record CareReportStatusResponse(
      @Schema(description = "리포트 ID", example = "5")
      Long careReportId,

      @Schema(description = "리포트 상태", example = "2")
      CareReportStatus status
  ) {

  }
}
