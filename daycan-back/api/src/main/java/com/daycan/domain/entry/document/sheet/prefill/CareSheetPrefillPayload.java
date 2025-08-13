package com.daycan.domain.entry.document.sheet.prefill;

import com.daycan.domain.entry.document.sheet.CognitiveEntry;
import com.daycan.domain.entry.document.sheet.HealthCareEntry;
import com.daycan.domain.entry.document.sheet.PhysicalEntry;
import com.daycan.domain.entry.document.sheet.RecoveryProgramEntry;
import java.time.LocalDate;
import java.time.LocalTime;

public record CareSheetPrefillPayload(
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

}
