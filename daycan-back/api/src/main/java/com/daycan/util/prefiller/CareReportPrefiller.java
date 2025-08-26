package com.daycan.util.prefiller;

import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.document.CareSheet;
import com.daycan.domain.entity.document.Document;
import com.daycan.domain.entity.document.PersonalProgram;
import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.entity.document.Meal;
import com.daycan.domain.enums.ProgramType;
import com.daycan.domain.model.CareReportInit;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public final class CareReportPrefiller {

  private CareReportPrefiller() {
  }

  public static CareReportInit computeInit(CareSheet sheet, Vital vital, Member member) {
    Objects.requireNonNull(member, "member");
    Long memberId = member.getId();
    String memberName = member.getName();
    Document doc =
        (sheet != null) ? sheet.getDocument() : (vital != null ? vital.getDocument() : null);
    if (doc == null) {
      throw new IllegalArgumentException("Document not found from sheet/vital");
    }
    LocalDate date = Objects.requireNonNull(doc.getDate(), "document.date");

    Meal breakfast = (sheet != null) ? sheet.getBreakfast() : null;
    Meal lunch = (sheet != null) ? sheet.getLunch() : null;
    Meal dinner = (sheet != null) ? sheet.getDinner() : null;
    int meal15 = MealScorer.score0to15(breakfast, lunch, dinner);
    String mealFooter = MealCommenter.comment(breakfast, lunch, dinner,
        "아침", "점심", "저녁", memberId, date);

    Integer sys = (vital != null) ? vital.getBloodPressureSystolic() : null;
    Integer dia = (vital != null) ? vital.getBloodPressureDiastolic() : null;
    Double temp = (vital != null && vital.getTemperature() != null)
        ? vital.getTemperature().doubleValue() : null;
    Integer stool = (vital != null) ? vital.getNumberOfStool() : null;
    Integer urine = (vital != null) ? vital.getNumberOfUrine() : null;

    int vital55 = VitalScorer.totalVital35(sys, dia, temp)+VitalScorer.totalExcretion20(stool, urine);
    String bpTempCmt = VitalCommenter.commentBpTemp(sys, dia, temp, memberName);
    String excrCmt = VitalCommenter.commentExcretion(stool, urine);
    String healthFooter = joinNonEmpty(bpTempCmt, excrCmt, "\n");

    List<PersonalProgram> pList = (sheet != null) ? sheet.getPersonalPrograms().stream().toList() : null;

    int physical15 = ProgramScorer.scorePhysical(pList);
    int cognitive15 = ProgramScorer.scoreCognitive(pList);

    String cognitiveFooter = ProgramCommenter.commentFromScore(
        ProgramType.COGNITIVE, cognitive15, memberId, date, memberName);

    String physicalFooter = ProgramCommenter.commentFromScore(
        ProgramType.PHYSICAL, physical15, memberId, date, memberName);

    List<String> cognitiveProgramNames = namesByType(sheet, ProgramType.COGNITIVE);
    List<String> physicalProgramNames = namesByType(sheet, ProgramType.PHYSICAL);
    return new CareReportInit(
        meal15, mealFooter,
        vital55, healthFooter,
        cognitiveProgramNames, cognitive15, cognitiveFooter,
        physicalProgramNames, physical15, physicalFooter
    );
  }
  private static int toPercent(int value, int base) {
    if (base <= 0) {
      return 0;
    }
    int pct = (int) Math.round((value * 100.0) / base);
    return Math.max(0, Math.min(100, pct));
  }

  private static String joinNonEmpty(String a, String b, String sep) {
    boolean ae = (a == null || a.isBlank());
    boolean be = (b == null || b.isBlank());
    if (ae && be) {
      return "";
    }
    if (ae) {
      return b;
    }
    if (be) {
      return a;
    }
    return a + sep + b;
  }

  private static List<String> namesByType(CareSheet sheet, ProgramType type) {
    var list = (sheet == null) ? null : sheet.getPersonalPrograms();
    if (list == null || list.isEmpty() || type == null) {
      return List.of();
    }
    return list.stream()
        .filter(p -> p != null && p.getType() == type)
        .map(PersonalProgram::getProgramName)
        .filter(n -> n != null && !n.isBlank())
        .distinct()
        .collect(Collectors.toUnmodifiableList());
  }
}
