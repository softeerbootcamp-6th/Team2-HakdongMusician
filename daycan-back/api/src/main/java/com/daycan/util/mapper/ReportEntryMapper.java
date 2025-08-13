package com.daycan.util.mapper;

import com.daycan.domain.entity.document.CareReport;
import com.daycan.domain.entry.ProgramComment;
import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.entry.document.report.ReportEntry;
import java.util.List;

public class ReportEntryMapper {

  /* ───── threshold 상수 ───── */
  private static final double HIGH_TEMPERATURE_THRESHOLD = 37.5;
  private static final int HIGH_SYSTOLIC_THRESHOLD = 140;

  /* ───── 문자열 상수 ───── */
  private static final String KEY_BREAKFAST = "아침";
  private static final String KEY_LUNCH = "점심";
  private static final String KEY_DINNER = "저녁";
  private static final String KEY_TEMPERATURE = "체온";
  private static final String KEY_BLOOD_PRESS = "혈압";
  private static final String KEY_STOOL  = "대변";
  private static final String KEY_URINE  = "소변";


  private static final String UNIT_TEMPERATURE = "℃";
  private static final String UNIT_BLOOD_PRESS = " mmHg";

  private static final String WARN_HIGH_FEVER = "고열 주의";
  private static final String WARN_HYPERTENSION = "고혈압 의심";

  /* ───────── 식사 ───────── */
  public static List<ReportEntry> mealEntries(CareReport r) {
    return List.of(
        ReportEntry.fromMeal(KEY_BREAKFAST, r.getBreakfastComment()),
        ReportEntry.fromMeal(KEY_LUNCH, r.getLunchComment()),
        ReportEntry.fromMeal(KEY_DINNER, r.getDinnerComment())
    );
  }

  /* ───────── 건강 ───────── */
  public static List<ReportEntry> healthEntries(CareReport r) {
    Vital v = r.getDocument().getVital();

    String tempWarn = (v.getTemperature() != null &&
        v.getTemperature().doubleValue() > HIGH_TEMPERATURE_THRESHOLD)
        ? WARN_HIGH_FEVER : null;

    String bpWarn = (v.getBloodPressureSystolic() != null &&
        v.getBloodPressureSystolic() > HIGH_SYSTOLIC_THRESHOLD)
        ? WARN_HYPERTENSION : null;

    return List.of(
        ReportEntry.fromHealth(
            KEY_TEMPERATURE,
            v.getTemperature() != null ? v.getTemperature() + UNIT_TEMPERATURE : "-",
            tempWarn
        ),
        ReportEntry.fromHealth(
            KEY_BLOOD_PRESS,
            v.getBloodPressureSystolic() + "/" +
                v.getBloodPressureDiastolic() + UNIT_BLOOD_PRESS,
            bpWarn
        ),
        ReportEntry.fromHealth(KEY_STOOL,
            String.valueOf(v.getNumberOfStool()), null),
        ReportEntry.fromHealth(KEY_URINE,
            String.valueOf(v.getNumberOfUrine()), null)
    );
  }

  /* ───────── 프로그램(인지·신체) ───────── */
  public static List<ReportEntry> programEntries(List<ProgramComment> list) {
    return list.stream()
        .map(p -> ReportEntry.fromProgram(
            p.programName(),
            p.benefit(),
            p.personalNote()
        ))
        .toList();
  }

  private ReportEntryMapper() {
  } // util-class
}
