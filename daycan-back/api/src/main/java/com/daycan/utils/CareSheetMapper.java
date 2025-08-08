package com.daycan.utils;

import com.daycan.domain.entity.CareSheet;
import com.daycan.domain.entity.Document;
import com.daycan.domain.entity.Meal;
import com.daycan.dto.admin.request.CareSheetRequest;

import com.daycan.dto.entry.MealSupport;

public final class CareSheetMapper {

  private CareSheetMapper() {
  }

  public static CareSheet toEntity(Document document, CareSheetRequest req) {
    return CareSheet.builder()
        .id(document.getId())
        .document(document)
        .arrivalTime(req.startTime())
        .endTime(req.endTime())
        .vehicleNumber(req.mobilityNumber())
        .signatureUrl(req.signatureUrl())

        // 목욕 정보
        .washCare(req.physical().assistWashing())
        .mobilityCare(req.physical().assistMovement())
        .bathingCare(req.physical().assistBathing())
        .bathingDurationMinutes(req.physical().bathingDurationMinutes())
        .bathingType(req.physical().bathingType())

        // 식사 정보
        .breakfast(toMeal(req.physical().breakfast()))
        .lunch(toMeal(req.physical().lunch()))
        .dinner(toMeal(req.physical().dinner()))

        // 서비스 지원 여부
        .cognitiveSupport(req.cognitive().assistCognitiveCare())
        .communicationSupport(req.cognitive().assistCommunication())
        .healthCare(req.healthCare().healthCare())
        .nursingCare(req.healthCare().nursingCare())
        .emergencyService(req.healthCare().emergencyService())
        .healthTraining(req.healthCare().healthCare())
        .cognitiveProgram(req.recoveryProgram().cognitiveProgram())
        .cognitiveInitiativeProgram(req.recoveryProgram().cognitiveEnhancement())
        .physicalTherapy(req.recoveryProgram().physicalTherapy())

        // 코멘트
        .functionalComment(req.physical().note())
        .cognitiveComment(req.cognitive().note())
        .healthComment(req.healthCare().note())
        .physicalComment(req.recoveryProgram().note())

        .build();
  }

  public static void update(CareSheet entity, CareSheetRequest req) {
    entity.update(
        req.startTime(),
        req.endTime(),
        req.mobilityNumber(),
        req.signatureUrl(),
        req.physical().assistWashing(),
        req.physical().assistMovement(),
        req.physical().assistBathing(),
        req.physical().bathingDurationMinutes(),
        req.physical().bathingType(),
        toMeal(req.physical().breakfast()),
        toMeal(req.physical().lunch()),
        toMeal(req.physical().dinner()),
        req.cognitive().assistCognitiveCare(),
        req.cognitive().assistCommunication(),
        req.healthCare().healthCare(),
        req.healthCare().nursingCare(),
        req.healthCare().emergencyService(),
        req.healthCare().healthCare(),
        req.recoveryProgram().cognitiveProgram(),
        req.recoveryProgram().cognitiveEnhancement(),
        req.recoveryProgram().physicalTherapy(),
        req.physical().note(),
        req.cognitive().note(),
        req.healthCare().note(),
        req.recoveryProgram().note()
    );
  }

  private static Meal toMeal(MealSupport support) {
    return new Meal(support.provided(), support.entry().mealType(), support.entry().amount());
  }

}

