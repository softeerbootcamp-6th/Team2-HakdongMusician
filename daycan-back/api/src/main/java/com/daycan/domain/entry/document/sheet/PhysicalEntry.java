package com.daycan.domain.entry.document.sheet;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PhysicalEntry(
    @Schema(description = "세면, 구강 청결 도움 여부", example = "true")
    boolean assistWashing,

    @Schema(description = "이동 도움 여부", example = "true")
    boolean assistMovement,

    @Schema(description = "목욕 도움 여부", example = "true")
    boolean assistBathing,

    @Schema(description = "목욕 시간", example = "30분")
    String bathingDurationMinutes,

    @Schema(description = "목욕 유형", example = "샤워")
    String bathingType,

    @Valid @NotNull
    @Schema(description = "아침 식사 지원 정보")
    MealSupport breakfast,

    @Valid @NotNull
    @Schema(description = "점심 식사 지원 정보")
    MealSupport lunch,

    @Valid @NotNull
    @Schema(description = "저녁 식사 지원 정보")
    MealSupport dinner,

    @Schema(description = "대변 횟수", example = "1")
    @Min(0)
    int numberOfStool,

    @Schema(description = "소변 횟수", example = "3")
    @Min(0)
    int numberOfUrine,

    @Schema(description = "신체 활동 특이사항", example = "보행 시 통증 호소")
    @Size(max = 100)
    String comment
) { }

