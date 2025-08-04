package com.daycan.dto.admin.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "리포트 카운트 응답")
public record CareReportCountResponse(
    @Schema(description = "미완료된 케어 리포트 수", example = "5")
    int pendingCount,

    @Schema(description = "지연된 케어 리포트 수", example = "2")
    int delayedCount
) {

}
