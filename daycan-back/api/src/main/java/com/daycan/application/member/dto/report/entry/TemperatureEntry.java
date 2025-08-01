package com.daycan.application.member.dto.report.entry;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "체온 기록 항목")
public record TemperatureEntry(
    @Schema(description = "섭씨 온도")
    double temperature,
    @Schema(description = "체온 점수 (0 or 15점)")
    int score
) {

  public static TemperatureEntry of(double temperature, int score) {
    return new TemperatureEntry(temperature, score);
  }
}
