package com.daycan.api.dto.center.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "결석 처리 결과 DTO")
public record AbsenceRegisterResponse(

    @Schema(description = "결석 처리된 수급자 ID 목록")
    List<String> processedIds,

    @Schema(description = "총 결석 처리 건수", example = "2")
    int count
) {}
