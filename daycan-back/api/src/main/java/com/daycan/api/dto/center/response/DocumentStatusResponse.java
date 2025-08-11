package com.daycan.api.dto.center.response;

import com.daycan.domain.enums.DocumentStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;

public record DocumentStatusResponse(
    @Schema(description = "생성 날짜", example = "5")
    LocalDate createdAt,
    @Schema(description = "기록지 정보", example = "5")
    CareSheetStatusResponse careSheet,
    @Schema(description = "리포트 정보", example = "5")
    CareReportStatusResponse careReport
) {

  public record CareSheetStatusResponse(
      @Schema(description = "기록지 ID", example = "5")
      Long careSheetId,

      @Schema(description = "기록지 상태", example = "2")
      DocumentStatus status
  ) {

  }

  public record CareReportStatusResponse(
      @Schema(description = "리포트 ID", example = "5")
      Long careReportId,

      @Schema(description = "리포트 상태", example = "2")
      DocumentStatus status
  ) {

  }
}
