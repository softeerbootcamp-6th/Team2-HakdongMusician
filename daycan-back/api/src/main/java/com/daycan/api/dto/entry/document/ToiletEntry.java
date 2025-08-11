package com.daycan.api.dto.entry.document;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "배변/배뇨 기록 항목")
public record ToiletEntry(
    @Schema(description = "대변 횟수")
    int numberOfStool,
    @Schema(description = "소변 횟수")
    int numberOfUrine
) {

  public static ToiletEntry of(
      int numberOfStool,
      int numberOfUrine
  ) {
    return new ToiletEntry(numberOfStool, numberOfUrine);
  }
}
