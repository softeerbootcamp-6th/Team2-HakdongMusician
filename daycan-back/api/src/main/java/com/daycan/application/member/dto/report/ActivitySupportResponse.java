package com.daycan.application.member.dto.report;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "활동 지원 응답")
public record ActivitySupportResponse(
    @Schema(description = "활동 이름")
    String activityName,
    @Schema(description = "활동 속성")
    String activityAttribute,
    @Schema(description = "개인 노트")
    String personalNote,
    @Schema(description = "점수")
    int score
) {
  public static ActivitySupportResponse of(
      String activityName,
      String activityAttribute,
      String personalNote,
      int score
  ) {
    return new ActivitySupportResponse(activityName, activityAttribute, personalNote, score);
  }
}
