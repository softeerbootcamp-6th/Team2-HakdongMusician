package com.daycan.api.mapper;

import com.daycan.domain.entity.document.CareSheet;
import com.daycan.domain.entity.document.Document;
import com.daycan.domain.entity.document.PersonalProgram;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.entry.Meal;
import com.daycan.api.dto.center.request.CareSheetRequest;

import com.daycan.api.dto.entry.document.sheet.CognitiveEntry;
import com.daycan.api.dto.entry.document.sheet.HealthCareEntry;
import com.daycan.api.dto.entry.document.sheet.MealSupport;
import com.daycan.api.dto.entry.document.sheet.PhysicalEntry;
import com.daycan.api.dto.entry.document.sheet.ProgramEntry;
import com.daycan.api.dto.entry.document.sheet.RecoveryProgramEntry;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.Objects;
import java.util.stream.Collectors;

public final class SheetMapper {

  private SheetMapper() {
  }

  public static CareSheet toCareSheet(Document document, CareSheetRequest req, Staff staff) {
    return CareSheet.builder()
        .id(document.getId())// 공유 PK
        .document(document)  // @MapsId 매핑
        .writer(staff)
        .arrivalTime(req.startTime())
        .endTime(req.endTime())
        .vehicleNumber(req.mobilityNumber())
        .signatureUrl(req.signatureUrl())

        // ── 목욕/이동 ──
        .washCare(safe(req.physical(), PhysicalEntry::assistWashing))
        .mobilityCare(safe(req.physical(), PhysicalEntry::assistMovement))
        .bathingCare(safe(req.physical(), PhysicalEntry::assistBathing))
        .bathingDurationMinutes(safe(req.physical(), PhysicalEntry::bathingDurationMinutes))
        .bathingType(safe(req.physical(), PhysicalEntry::bathingType))

        // ── 식사 ──
        .breakfast(toMeal(safe(req.physical(), PhysicalEntry::breakfast)))
        .lunch(toMeal(safe(req.physical(), PhysicalEntry::lunch)))
        .dinner(toMeal(safe(req.physical(), PhysicalEntry::dinner)))

        // ── 서비스 지원 여부 ──
        .cognitiveSupport(safe(req.cognitive(), CognitiveEntry::assistCognitiveCare))
        .communicationSupport(safe(req.cognitive(), CognitiveEntry::assistCommunication))
        .healthCare(safe(req.healthCare(), HealthCareEntry::healthCare))
        .nursingCare(safe(req.healthCare(), HealthCareEntry::nursingCare))
        .emergencyService(safe(req.healthCare(), HealthCareEntry::emergencyService))

        .motionTraining(safe(req.recoveryProgram(), RecoveryProgramEntry::motionTraining))
        .cognitiveProgram(safe(req.recoveryProgram(), RecoveryProgramEntry::cognitiveProgram))
        .cognitiveInitiativeProgram(
            safe(req.recoveryProgram(), RecoveryProgramEntry::cognitiveEnhancement))
        .physicalTherapy(safe(req.recoveryProgram(), RecoveryProgramEntry::physicalTherapy))

        // ── 코멘트 ──
        .functionalComment(safe(req.physical(), PhysicalEntry::comment))
        .cognitiveComment(safe(req.cognitive(), CognitiveEntry::comment))
        .healthComment(safe(req.healthCare(), HealthCareEntry::comment))
        .physicalComment(safe(req.recoveryProgram(), RecoveryProgramEntry::comment))
        .build();
  }

  public static void updateSheet(CareSheet entity, CareSheetRequest req) {
    entity.update(
        req.startTime(),
        req.endTime(),
        req.mobilityNumber(),
        req.signatureUrl(),
        safe(req.physical(), PhysicalEntry::assistWashing),
        safe(req.physical(), PhysicalEntry::assistMovement),
        safe(req.physical(), PhysicalEntry::assistBathing),
        safe(req.physical(), PhysicalEntry::bathingDurationMinutes),
        safe(req.physical(), PhysicalEntry::bathingType),
        toMeal(safe(req.physical(), PhysicalEntry::breakfast)),
        toMeal(safe(req.physical(), PhysicalEntry::lunch)),
        toMeal(safe(req.physical(), PhysicalEntry::dinner)),
        safe(req.cognitive(), CognitiveEntry::assistCognitiveCare),
        safe(req.cognitive(), CognitiveEntry::assistCommunication),
        safe(req.healthCare(), HealthCareEntry::healthCare),
        safe(req.healthCare(), HealthCareEntry::nursingCare),
        safe(req.healthCare(), HealthCareEntry::emergencyService),
        safe(req.recoveryProgram(), RecoveryProgramEntry::motionTraining),
        safe(req.recoveryProgram(), RecoveryProgramEntry::cognitiveProgram),
        safe(req.recoveryProgram(), RecoveryProgramEntry::cognitiveEnhancement),
        safe(req.recoveryProgram(), RecoveryProgramEntry::physicalTherapy),
        safe(req.physical(), PhysicalEntry::comment),
        safe(req.cognitive(), CognitiveEntry::comment),
        safe(req.healthCare(), HealthCareEntry::comment),
        safe(req.recoveryProgram(), RecoveryProgramEntry::comment)
    );
  }

  public static Vital toVital(Document document, CareSheetRequest req) {
    return Vital.builder()
        .id(document.getId())
        .document(document)
        .bloodPressureSystolic(req.healthCare().bloodPressure().systolic())
        .bloodPressureDiastolic(req.healthCare().bloodPressure().diastolic())
        .temperature(req.healthCare().temperature().temperature())
        .numberOfStool(req.physical().numberOfStool())
        .numberOfUrine(req.physical().numberOfUrine())
        .build();
  }


  public static List<PersonalProgram> toPersonalPrograms(List<ProgramEntry> entries) {
    if (entries == null || entries.isEmpty()) {
      return List.of();
    }

    Map<String, ProgramEntry> latestByName = entries.stream()
        .filter(Objects::nonNull)
        .filter(e -> e.name() != null && !e.name().isBlank())
        .collect(Collectors.toMap(
            e -> truncate(e.name().trim(), 100),
            e -> e,
            (oldV, newV) -> newV,              // 같은 이름 있으면 나중 값으로
            LinkedHashMap::new
        ));

    return latestByName.entrySet().stream()
        .map(it -> new PersonalProgram(
            it.getKey(),
            it.getValue().type(),
            it.getValue().score()
        ))
        .toList();
  }

  private static String truncate(String s, int max) {
    return s.length() <= max ? s : s.substring(0, max);
  }


  private static Meal toMeal(MealSupport support) {
    if (support == null) {
      return new Meal(false, null, null);
    }
    // support.entry()가 null일 수도 있으면 안전 가드
    var entry = support.entry();
    if (entry == null) {
      return new Meal(support.provided(), null, null);
    }
    return new Meal(support.provided(), entry.mealType(), entry.amount());
  }

  // 작은 널가드 유틸 (req 서브객체가 null이어도 NPE 방지)
  private static <T, R> R safe(T target, java.util.function.Function<T, R> getter) {
    return target == null ? null : getter.apply(target);
  }
}
