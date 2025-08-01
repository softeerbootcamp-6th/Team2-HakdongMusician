package com.daycan.application.member.dto.report.entry;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "식사 기록 항목")
public record MealEntry(
    @Schema(description = "메뉴")
    String menu,
    @Schema(description = "식사량")
    String amount
) {

  // 메뉴, 식사량 -> enum
  // enum -> String 생성자 만드셈
  public static MealEntry of(String menu, String amount) {
    return new MealEntry(menu, amount);
  }
}
