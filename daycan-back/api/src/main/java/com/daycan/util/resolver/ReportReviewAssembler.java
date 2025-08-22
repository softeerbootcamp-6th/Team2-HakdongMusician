package com.daycan.util.resolver;

import com.daycan.api.dto.center.request.ReportReviewRequest;
import com.daycan.domain.entry.document.report.ReportEntry;
import com.daycan.domain.model.ProgramNote;
import com.daycan.domain.model.ReportReview;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class ReportReviewAssembler {

  private ReportReviewAssembler() {}

  // 키 상수 (ReportEntryMapper와 동일 키 사용)
  private static final String KEY_BREAKFAST = "아침";
  private static final String KEY_LUNCH     = "점심";
  private static final String KEY_DINNER    = "저녁";

  public static ReportReview from(ReportReviewRequest req) {
    if (req == null) return ReportReview.empty();

    // 식사: key 로 매칭해 value를 코멘트로 사용
    String breakfast = extractMeal(req.mealEntries(), KEY_BREAKFAST);
    String lunch     = extractMeal(req.mealEntries(), KEY_LUNCH);
    String dinner    = extractMeal(req.mealEntries(), KEY_DINNER);

    // 프로그램: name=key, benefit=value, personalNote=additionalInfo
    Map<String, ProgramNote> physical = toProgramNoteMap(req.physicalEntries());
    Map<String, ProgramNote> cognitive = toProgramNoteMap(req.cognitiveEntries());

    return new ReportReview(
        breakfast, lunch, dinner,
        nullIfBlank(req.mealMemo()),
        nullIfBlank(req.healthMemo()),
        nullIfBlank(req.physicalMemo()),
        nullIfBlank(req.cognitiveMemo()),
        emptyIfNull(physical),
        emptyIfNull(cognitive)
    );
  }

  private static String extractMeal(List<ReportEntry> entries, String targetKey) {
    if (entries == null || entries.isEmpty()) return null;
    for (ReportEntry e : entries) {
      if (e == null) continue;
      String k = safe(e.key());
      if (k.equalsIgnoreCase(targetKey)) {
        return nullIfBlank(e.value());
      }
    }
    return null;
  }

  private static Map<String, ProgramNote> toProgramNoteMap(List<ReportEntry> entries) {
    if (entries == null || entries.isEmpty()) return Map.of();
    Map<String, ProgramNote> map = new LinkedHashMap<>();
    for (ReportEntry e : entries) {
      if (e == null) continue;
      String name = safe(e.key());
      if (name.isEmpty()) continue;
      String benefit = nullIfBlank(e.value());
      String personal = nullIfBlank(e.additionalInfo());
      map.put(name, new ProgramNote(benefit, personal));
    }
    return map;
  }

  private static String safe(String s) { return s == null ? "" : s.trim(); }
  private static String nullIfBlank(String s) { return (s == null || s.isBlank()) ? null : s; }
  private static <K,V> Map<K,V> emptyIfNull(Map<K,V> m) { return m == null ? Map.of() : m; }
}