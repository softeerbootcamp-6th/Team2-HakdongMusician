package com.daycan.application.member.dto.report;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "식사 지원 응답")
public record MealSupportResponse(
    @Schema(description = "아침 식사 내용 (null 가능)")
    String breakfast,
    @Schema(description = "점심 식사 내용 (null 가능)")
    String lunch,
    @Schema(description = "저녁 식사 내용 (null 가능)")
    String dinner,
    @Schema(description = "점수")
    int score,
    @Schema(description = "추가 메모 (null 가능, 예: \"식사량이 부족함\" 등)")
    String additionalNot
) {


  public static MealSupportResponse of(
      String breakfast,
      String lunch,
      String dinner,
      int score,
      String additionalNote
  ) {
    return new MealSupportResponse(breakfast, lunch, dinner, score, additionalNote);
  }
}
