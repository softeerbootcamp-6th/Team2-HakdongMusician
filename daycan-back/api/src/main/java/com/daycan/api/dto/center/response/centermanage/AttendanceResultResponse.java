package com.daycan.api.dto.center.response.centermanage;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "출결 처리 결과")

public record AttendanceResultResponse(
    @Schema(description = "성공 건수") int succeeded,
    @Schema(description = "실패 건수") int failed) {

}
