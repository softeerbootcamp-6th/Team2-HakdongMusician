package com.daycan.application.member.dto.report;

import com.daycan.application.member.dto.report.entry.CardFooter;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "활동 지원 응답")
public record ActivitySupportResponse(
    @Schema(description = "활동 이름")
    String activityName,
    @Schema(description = "활동 속성")
    String activityAttribute,
    @Schema(description = "개인 노트")
    String personalNote,
    @Schema(description = "점수와 메모, 카드 밑에 들어감")
    CardFooter cardFooter
) {
  public static ActivitySupportResponse of(
      String activityName, String activityAttribute,
      String personalNote, CardFooter cardFooter
      ) {
    return new ActivitySupportResponse(
        activityName, activityAttribute,
        personalNote, cardFooter
    );
  }
}
