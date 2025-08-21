package com.daycan.api.dto.center.request;

import com.daycan.domain.entry.document.sheet.CognitiveEntry;
import com.daycan.domain.entry.document.sheet.HealthCareEntry;
import com.daycan.domain.entry.document.sheet.PhysicalEntry;
import com.daycan.domain.entry.document.sheet.RecoveryProgramEntry;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

public record CareSheetRequest(

    @Schema(description = "기록 작성자 id (종사자 id)", example = "1")
    @NotNull @Positive
    Long writerId,

    @Schema(description = "수급자 memberId", example = "101")
    @NotNull @Positive
    Long memberId,

    @Schema(description = "이용 날짜", example = "2025-08-01")
    @NotNull
    LocalDate date,

    @Schema(description = "서비스 시작 시간", example = "09:00")
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    LocalTime startTime,

    @Schema(description = "서비스 종료 시간", example = "17:00")
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    LocalTime endTime,

    @Schema(description = "이동 서비스 차량번호 (nullable)", example = "123가4567")
    @Size(max = 32)
    String mobilityNumber,

    @Valid @NotNull
    PhysicalEntry physical,

    @Valid @NotNull
    CognitiveEntry cognitive,

    @Valid @NotNull
    HealthCareEntry healthCare,

    @Valid @NotNull
    RecoveryProgramEntry recoveryProgram,

    @Schema(description = "작성자 서명 이미지 URL", example = "https://cdn.example.com/signature/center/1/2.svg")
    @Size(max = 500)
    String signatureUrl

) {
    @Schema(hidden = true)
    @AssertTrue(message = "startTime은 endTime보다 이르거나 같아야 합니다.")
    public boolean isTimeRangeValid() {
        return startTime == null || endTime == null || !startTime.isAfter(endTime);
    }
}
