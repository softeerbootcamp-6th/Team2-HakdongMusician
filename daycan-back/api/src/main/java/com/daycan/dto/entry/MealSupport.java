package com.daycan.dto.entry;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;

public record MealSupport(
    @Schema(description = "해당 식사 제공 여부", example = "true")
    boolean provided,

    @Valid
    @Schema(description = "식사 정보 (제공 시 필수)")
    MealEntry entry
) {

  @AssertTrue(message = "식사를 제공한 경우, 식사 정보는 필수입니다.")
  public boolean isValidProvidedEntry() {
    return !provided || (entry != null);
  }
}
