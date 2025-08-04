package com.daycan.dto.entry;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "체온 기록 항목")
public record TemperatureEntry(
    @Schema(description = "섭씨 온도")
    double temperature
) {

  public static TemperatureEntry of(double temperature) {
    return new TemperatureEntry(temperature);
  }
}
