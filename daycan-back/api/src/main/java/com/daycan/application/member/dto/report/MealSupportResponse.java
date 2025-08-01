package com.daycan.application.member.dto.report;

import com.daycan.application.member.dto.report.entry.CardFooter;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "식사 지원 응답")
public record MealSupportResponse(
    @Schema(description = "아침 식사 내용 (null 가능)")
    String breakfast,
    @Schema(description = "점심 식사 내용 (null 가능)")
    String lunch,
    @Schema(description = "저녁 식사 내용 (null 가능)")
    String dinner,
    @Schema(description = "점수와 메모, 카드 밑에 들어감")
    CardFooter cardFooter
) {


  public static MealSupportResponse of(
      String breakfast, String lunch,
      String dinner, CardFooter cardFooter
  ) {
    return new MealSupportResponse(
        breakfast, lunch,
        dinner, cardFooter
    );
  }
}
