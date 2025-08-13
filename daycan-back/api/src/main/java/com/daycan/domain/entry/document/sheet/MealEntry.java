package com.daycan.domain.entry.document.sheet;

import com.daycan.domain.enums.MealAmount;
import com.daycan.domain.enums.MealType;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "식사 기록 항목")
public record MealEntry(
    @Schema(description = "타입", example = "REGULAR")
    MealType mealType,
    @Schema(description = "식사량", example = "FULL")
    MealAmount amount
) {

  public static MealEntry of(MealType type, MealAmount amount) {
    return new MealEntry(type, amount);
  }
}
