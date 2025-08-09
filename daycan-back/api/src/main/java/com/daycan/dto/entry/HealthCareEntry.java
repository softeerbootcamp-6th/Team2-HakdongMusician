package com.daycan.dto.entry;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record  HealthCareEntry(
    @Schema(description = "건강관리(40분) 수행 여부", example = "true")
    boolean healthCare,

    @Schema(description = "간호관리 수행 여부", example = "false")
    boolean nursingCare,

    @Schema(description = "응급서비스 수행 여부", example = "false")
    boolean emergencyService,

    @Valid @NotNull
    @Schema(description = "혈압 정보")
    BloodPressureEntry bloodPressure,

    @Schema(description = "체온 (섭씨 온도)", example = "36.5")
    @DecimalMin("0.0") @DecimalMax("100.0")
    TemperatureEntry temperature,

    @Schema(description = "건강관리 특이사항", example = "정상 범위 유지")
    @Size(max = 100)
    String comment
) {}
