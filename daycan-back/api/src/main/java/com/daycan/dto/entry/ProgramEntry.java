package com.daycan.dto.entry;

import com.daycan.domain.enums.ProgramScore;
import com.daycan.domain.enums.ProgramType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProgramEntry(
    @Schema(description = "프로그램 타입 (신체 / 인지)", example = "PHYSICAL")
    @NotNull
    ProgramType type,

    @Schema(description = "프로그램명", example = "숫자 맞추기 게임")
    @NotBlank
    String name,

    @Schema(description = "프로그램 평가 (상 / 중 / 하)", example = "HIGH")
    @NotNull
    ProgramScore score
) {}
