package com.daycan.domain.model;

import com.daycan.api.dto.center.response.CareSheetResponse;
import com.daycan.domain.entry.document.sheet.CognitiveEntry;
import com.daycan.domain.entry.document.sheet.HealthCareEntry;
import com.daycan.domain.entry.document.sheet.PhysicalEntry;
import com.daycan.domain.entry.document.sheet.RecoveryProgramEntry;
import java.time.LocalDate;
import java.time.LocalTime;

public record CareSheetView(
    Long id,
    Long writerId,
    Long memberId,
    String memberCode,
    LocalDate date,
    LocalTime startTime,
    LocalTime endTime,
    String mobilityNumber,
    PhysicalEntry physical,
    CognitiveEntry cognitive,
    HealthCareEntry healthCare,
    RecoveryProgramEntry recoveryProgram
) {
  public CareSheetResponse toResponse() {
    return new CareSheetResponse(
        this.id(),
        this.writerId(),
        this.memberId(),
        this.memberCode(),
        this.date(),
        this.startTime(),
        this.endTime(),
        this.mobilityNumber(),
        this.physical(),
        this.cognitive(),
        this.healthCare(),
        this.recoveryProgram()
    );
  }

}
