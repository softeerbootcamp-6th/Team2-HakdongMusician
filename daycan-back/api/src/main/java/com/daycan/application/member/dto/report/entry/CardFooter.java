package com.daycan.application.member.dto.report.entry;

import io.swagger.v3.oas.annotations.media.Schema;

public record CardFooter(
    @Schema(description = "점수")
    int score,
    @Schema(description = "활동에 대한 코멘트")
    String additionalMemo
) {

  public static CardFooter of(int score, String additionalMemo) {
    return new CardFooter(score, additionalMemo);
  }
}
