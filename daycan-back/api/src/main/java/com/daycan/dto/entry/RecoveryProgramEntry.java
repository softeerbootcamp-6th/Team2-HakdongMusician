package com.daycan.dto.entry;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record RecoveryProgramEntry(
    @Schema(description = "동작훈련 여부", example = "true")
    boolean motionTraining,

    @Schema(description = "인지활동프로그램 여부", example = "true")
    boolean cognitiveProgram,

    @Schema(description = "인지기능향상 훈련 여부", example = "false")
    boolean cognitiveEnhancement,

    @Schema(description = "물리치료 여부", example = "true")
    boolean physicalTherapy,

    @Schema(description = "프로그램 내역 리스트")
    @Valid @NotNull
    List<ProgramEntry> programEntries,

    @Schema(description = "기능회복훈련 특이사항", example = "프로그램에 적극적으로 참여")
    @Size(max = 100)
    String note
) {}

