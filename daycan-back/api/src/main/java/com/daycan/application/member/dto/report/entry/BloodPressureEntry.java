package com.daycan.application.member.dto.report.entry;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "혈압 기록 항목")
public record BloodPressureEntry(
    @Schema(description = "수축기 혈압")
    int systolic,
    @Schema(description = "이완기 혈압")
    int diastolic,
    @Schema(description = "혈압 점수 (0~20점)")
    int score
) {

  public static BloodPressureEntry of(int systolic, int diastolic, int score) {
    return new BloodPressureEntry(systolic, diastolic, score);
  }
}
