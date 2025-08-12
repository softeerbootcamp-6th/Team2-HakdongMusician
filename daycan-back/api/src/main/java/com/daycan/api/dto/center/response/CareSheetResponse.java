package com.daycan.api.dto.center.response;

import com.daycan.domain.entry.document.sheet.CognitiveEntry;
import com.daycan.domain.entry.document.sheet.HealthCareEntry;
import com.daycan.domain.entry.document.sheet.PhysicalEntry;
import com.daycan.domain.entry.document.sheet.RecoveryProgramEntry;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.time.LocalTime;

@Schema(description = "기록지 정보 응답")
public record CareSheetResponse(
    @Schema(description = "기록지 고유 ID", example = "10")
    Long id,

    @Schema(description = "기록 작성자 id", example = "1")
    Long writerId,

    @Schema(description = "수급자Id", example = "1")
    Long memberId,

    @Schema(description = "장기요양인정번호", example = "RP123456")
    String memberCode,

    @Schema(description = "이용 날짜", example = "2025-08-01")
    LocalDate date,

    @Schema(description = "서비스 시작 시간", example = "09:00")
    LocalTime startTime,

    @Schema(description = "서비스 종료 시간", example = "17:00")
    LocalTime endTime,

    @Schema(description = "이동 서비스 차량번호", example = "123가4567")
    String mobilityNumber,

    PhysicalEntry physical,
    CognitiveEntry cognitive,
    HealthCareEntry healthCare,
    RecoveryProgramEntry recoveryProgram
){
}