package com.daycan.application.member.dto.report;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "활동 지원 그룹")
public record ActivitySupportGroup (
    @Schema(description = "신체 활동 지원 응답 목록")
    List<ActivitySupportResponse> physicalActivitySupportResponses,
    @Schema(description = "인지 활동 지원 응답 목록")
    List<ActivitySupportResponse> cognitiveActivitySupportResponses
){
}
