package com.daycan.dto.member.report;

import com.daycan.domain.enums.ProgramType;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "활동 지원 응답")
public record ProgramSupportResponse(
    @Schema(description = "활동 타입")
    ProgramType programType,
    @Schema(description = "활동 이름")
    String activityName,
    @Schema(description = "활동 속성")
    String activityAttribute,
    @Schema(description = "개인 노트")
    String personalNote,
    @Schema(description = "점수와 메모, 카드 밑에 들어감")
    CardFooter cardFooter
) {
  public static ProgramSupportResponse of(
      ProgramType programType, String activityName,
      String activityAttribute, String personalNote, CardFooter cardFooter
      ) {
    return new ProgramSupportResponse(
        programType, activityName, activityAttribute,
        personalNote, cardFooter
    );
  }
}
