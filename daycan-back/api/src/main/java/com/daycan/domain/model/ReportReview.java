package com.daycan.domain.model;

import java.util.Map;

public record ReportReview(
    String breakfast, String lunch, String dinner,
    String mealMemo, String healthMemo, String physicalMemo, String cognitiveMemo,
    Map<String, ProgramNote> physicalNotes,   // key=프로그램명, value=(benefit, personalNote)
    Map<String, ProgramNote> cognitiveNotes
) {
  public static ReportReview empty() {
    return new ReportReview(null, null, null, null, null, null, null,
        null, null);
  }
}
