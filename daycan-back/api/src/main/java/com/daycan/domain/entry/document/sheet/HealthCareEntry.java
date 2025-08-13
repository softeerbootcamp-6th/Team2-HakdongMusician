package com.daycan.domain.entry.document.sheet;

import com.daycan.domain.entry.document.vital.TemperatureEntry;
import com.daycan.domain.entry.document.vital.BloodPressureEntry;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record HealthCareEntry(
    @Schema(description = "건강관리(40분) 수행 여부", example = "true")
    boolean healthCare,

    @Schema(description = "간호관리 수행 여부", example = "false")
    boolean nursingCare,

    @Schema(description = "응급서비스 수행 여부", example = "false")
    boolean emergencyService,

    @Valid @NotNull
    BloodPressureEntry bloodPressure,

    @Valid @NotNull
    TemperatureEntry temperature,

    @Schema(description = "건강관리 특이사항", example = "정상 범위 유지")
    @Size(max = 100)
    String comment
) {

}
