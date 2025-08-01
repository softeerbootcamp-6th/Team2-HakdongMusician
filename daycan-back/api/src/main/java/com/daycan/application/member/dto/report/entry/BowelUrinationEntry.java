package com.daycan.application.member.dto.report.entry;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "배변/배뇨 기록 항목")
public record BowelUrinationEntry(
    @Schema(description = "대변 횟수")
    int numberOfBowelMovement,
    @Schema(description = "소변 횟수")
    int numberOfUrination,
    @Schema(description = "용변 점수 (0~15점)")
    int score
) {

  public static BowelUrinationEntry of(
      int numberOfBowelMovement,
      int numberOfUrination,
      int score
  ) {
    return new BowelUrinationEntry(numberOfBowelMovement, numberOfUrination, score);
  }
}
