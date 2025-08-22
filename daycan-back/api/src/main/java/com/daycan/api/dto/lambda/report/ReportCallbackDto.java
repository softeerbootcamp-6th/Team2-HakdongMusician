package com.daycan.api.dto.lambda.report;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;

public record ReportCallbackDto(
    String taskType,          // "REPORT_CREATE"
    String jobId,             // ex) "1e1c8afe-...."
    String idempotencyKey,    // 운영에선 보통 문서 ID 기반을 권장
    Long requestAt,           // epoch millis
    String result,            // "success" | "failure"
    ReportPayload payload     // 실내용 result가 payload.result에 들어있음
) {

  public record ReportPayload(
      @JsonProperty("result")
      ReportContent content
  ) {
  }

  public record ReportContent(
      String breakfast,
      String lunch,
      String dinner,
      @JsonProperty("physical_program_comments")
      Map<String, ProgramCommentDto> physicalProgramComments,
      @JsonProperty("cognitive_program_comments")
      Map<String, ProgramCommentDto> cognitiveProgramComments
  ) {

  }

  public record ProgramCommentDto(
      String benefit,
      @JsonProperty("personal_note")
      String personalNote
  ) {

  }

  private Long parseLong(String s) {
    if (s == null) {
      return null;
    }
    try {
      return Long.parseLong(s.trim());
    } catch (Exception e) {
      return null;
    }
  }
}
