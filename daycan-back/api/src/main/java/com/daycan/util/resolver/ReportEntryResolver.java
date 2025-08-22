package com.daycan.util.resolver;

import com.daycan.domain.entity.document.CareReport;
import com.daycan.domain.entry.ProgramComment;
import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.entry.document.report.ReportEntry;
import com.daycan.util.prefiller.VitalCommenter;
import java.util.List;

public class ReportEntryResolver {

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


  public static List<ReportEntry> mealEntries(CareReport r) {
    return List.of(
        ReportEntry.fromMeal(KEY_BREAKFAST, r.getBreakfastComment()),
        ReportEntry.fromMeal(KEY_LUNCH, r.getLunchComment()),
        ReportEntry.fromMeal(KEY_DINNER, r.getDinnerComment())
    );
  }

  public static List<ReportEntry> healthEntries(CareReport r) {
    Vital v = r.getDocument().getVital();

    String tempWarn = VitalCommenter.warningCommentTemp(v.getTemperature().doubleValue());
    String bpWarn = VitalCommenter.warningCommentBp(v.getBloodPressureSystolic(),
        v.getBloodPressureDiastolic());

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
            String.valueOf(v.getNumberOfStool()), ""),
        ReportEntry.fromHealth(KEY_URINE,
            String.valueOf(v.getNumberOfUrine()), "")
    );
  }

  public static List<ReportEntry> programEntries(List<ProgramComment> list) {
    return list.stream()
        .map(p -> ReportEntry.fromProgram(
            p.programName(),
            p.benefit(),
            p.personalNote()
        ))
        .toList();
  }

  private ReportEntryResolver() {
  }
}
