package com.daycan.domain.entry.document.vital;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

@Schema(description = "체온 기록 항목")
public record TemperatureEntry(
    @Schema(description = "섭씨 온도", example = "36.5")
    @DecimalMin("0.0") @DecimalMax("100.0")
    double temperature
) {

  public static TemperatureEntry of(double temperature) {
    return new TemperatureEntry(temperature);
  }
}
