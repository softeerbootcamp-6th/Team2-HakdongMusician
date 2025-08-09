package com.daycan.dto.entry;

public record ReportEntry(
    String key,            // 예: "혈압", "아침"
    String value,          // 예: "120/80 mmHg", "죽"
    String warning,        // 경고 메시지(없으면 null)
    String additionalInfo  // 부가 정보(없으면 null)
) {

  /* ───────── factory methods ───────── */

  /** 식사 항목 */
  public static ReportEntry fromMeal(String mealName, String comment) {
    return new ReportEntry(mealName, comment, null, null);
  }

  /** 건강 항목 – 경고가 없으면 warning 파라미터에 null 전달 */
  public static ReportEntry fromHealth(String metricName, String value, String warning) {
    return new ReportEntry(metricName, value, warning, null);
  }

  /** 프로그램(인지·신체) 항목 – personalNote 를 additionalInfo 로 사용 */
  public static ReportEntry fromProgram(String programName, String benefit, String personalNote) {
    return new ReportEntry(programName, benefit, null, personalNote);
  }
}
