package com.daycan.domain.model;

import com.daycan.api.dto.center.response.sheet.CareSheetResponse;
import com.daycan.domain.entity.document.CareSheet;
import com.daycan.domain.entity.document.PersonalProgram;
import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.entry.document.sheet.CognitiveEntry;
import com.daycan.domain.entry.document.sheet.HealthCareEntry;
import com.daycan.domain.entity.document.Meal;
import com.daycan.domain.entry.document.sheet.MealEntry;
import com.daycan.domain.entry.document.sheet.MealSupport;
import com.daycan.domain.entry.document.sheet.PhysicalEntry;
import com.daycan.domain.entry.document.sheet.ProgramEntry;
import com.daycan.domain.entry.document.sheet.RecoveryProgramEntry;
import com.daycan.domain.entry.document.vital.BloodPressureEntry;
import com.daycan.domain.entry.document.vital.TemperatureEntry;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;


public record CareSheetView(
    Long id,
    Long writerId,
    Long memberId,
    String memberCode,
    LocalDate date,
    CareSheet careSheet,              // 엔티티 그대로 (null 허용)
    Vital vital,                      // 엔티티 그대로 (null 허용)
    List<PersonalProgram> programs    // 목록 (없으면 빈 리스트)
) {
  public CareSheetResponse toResponse() {
    final CareSheet cs = this.careSheet;
    final Vital vt = this.vital;

    // 섹션 매핑
    PhysicalEntry physical   = mapPhysical(cs, vt);
    CognitiveEntry cognitive = mapCognitive(cs);
    HealthCareEntry health   = mapHealth(cs, vt);
    RecoveryProgramEntry recognize = mapRecovery(cs, programs);

    return new CareSheetResponse(
        id,
        writerId,
        memberId,
        memberCode,
        date,
        cs != null ? cs.getArrivalTime()  : null,
        cs != null ? cs.getEndTime()      : null,
        cs != null ? cs.getVehicleNumber(): null,
        physical,
        cognitive,
        health,
        recognize
    );
  }

  // 매핑 Helper

  private static PhysicalEntry mapPhysical(CareSheet cs, Vital vt) {
    if (cs == null) return null;

    MealSupport breakfast = toMealSupport(cs.getBreakfast());
    MealSupport lunch     = toMealSupport(cs.getLunch());
    MealSupport dinner    = toMealSupport(cs.getDinner());

    int stool = (vt != null && vt.getNumberOfStool() != null) ? vt.getNumberOfStool() : 0;
    int urine = (vt != null && vt.getNumberOfUrine() != null) ? vt.getNumberOfUrine() : 0;

    return new PhysicalEntry(
        cs.isWashCare(),
        cs.isMobilityCare(),
        cs.isBathingCare(),
        cs.getBathingDurationMinutes(),
        cs.getBathingType(),
        breakfast,
        lunch,
        dinner,
        stool,
        urine,
        cs.getPhysicalComment()
    );
  }

  private static CognitiveEntry mapCognitive(CareSheet cs) {
    if (cs == null) return null;
    return new CognitiveEntry(
        cs.isCognitiveSupport(),
        cs.isCommunicationSupport(),
        cs.getCognitiveComment()
    );
  }

  private static HealthCareEntry mapHealth(CareSheet cs, Vital vt) {
    if (cs == null) return null;

    BloodPressureEntry bp = mapBp(vt);

    TemperatureEntry temp = null;
    if (vt != null && vt.getTemperature() != null) {
      temp = new TemperatureEntry(vt.getTemperature().doubleValue()); // BigDecimal -> double
    }

    return new HealthCareEntry(
        cs.isHealthCare(),
        cs.isNursingCare(),
        cs.isEmergencyService(),
        bp,
        temp,
        cs.getHealthComment()
    );
  }

  private static BloodPressureEntry mapBp(Vital vt) {
    if (vt == null) return null;
    Integer sys = vt.getBloodPressureSystolic();
    Integer dia = vt.getBloodPressureDiastolic();
    if (sys == null || dia == null) return null;
    return BloodPressureEntry.of(sys, dia);
  }


  private static RecoveryProgramEntry mapRecovery(CareSheet cs, List<PersonalProgram> programs) {
    if (cs == null) return null;

    List<ProgramEntry> entries = toProgramEntries(programs);

    return new RecoveryProgramEntry(
        cs.isMotionTraining(),
        cs.isCognitiveProgram(),
        cs.isCognitiveInitiativeProgram(), // = cognitiveEnhancement
        cs.isPhysicalTherapy(),
        entries,
        cs.getFunctionalComment() // 기능회복훈련 특이사항
    );
  }

  private static MealSupport toMealSupport(Meal meal) {
    if (meal == null) return new MealSupport(false, null); // 제공 안 함

    boolean provided = meal.isProvided();
    MealEntry entry = provided
        ? new MealEntry(meal.getType(), meal.getAmount())
        : null; // AssertTrue: provided=true면 entry != null 이어야 함

    return new MealSupport(provided, entry);
  }

  private static List<ProgramEntry> toProgramEntries(List<PersonalProgram> programs) {
    if (programs == null || programs.isEmpty()) return List.of();
    // id 기준 정렬(안돼있다면)
    return programs.stream()
        .sorted(Comparator.comparing(PersonalProgram::getId))
        .map(pp -> new ProgramEntry(pp.getType(), pp.getProgramName(), pp.getScore()))
        .toList();
  }

}
