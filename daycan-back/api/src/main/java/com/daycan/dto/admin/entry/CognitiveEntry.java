package com.daycan.dto.admin.entry;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

public record CognitiveEntry(
    @Schema(description = "인지관리 도움 여부", example = "true")
    boolean assistCognitiveCare,

    @Schema(description = "의사소통 도움 여부", example = "true")
    boolean assistCommunication,

    @Schema(description = "인지활동 특이사항", example = "대화 시 약간의 혼동 보임")
    @Size(max = 100)
    String note
) {}
