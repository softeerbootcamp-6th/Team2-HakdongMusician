package com.daycan.dto.admin.request;

import com.daycan.dto.entry.CognitiveEntry;
import com.daycan.dto.entry.HealthCareEntry;
import com.daycan.dto.entry.PhysicalEntry;
import com.daycan.dto.entry.RecoveryProgramEntry;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

public record CareSheetRequest(
    @Schema(description = "기록 작성자 id (종사자 id)", example = "1")
    @NotBlank
    Long writerId,

    @Schema(description = "수급자Id", example = "RP123456")
    @NotBlank
    String recipientId,

    @Schema(description = "이용 날짜", example = "2025-08-01")
    @NotNull
    LocalDate date,

    @Schema(description = "서비스 시작 시간", example = "09:00")
    @NotNull
    LocalTime startTime,

    @Schema(description = "서비스 종료 시간", example = "17:00")
    @NotNull
    LocalTime endTime,

    @Schema(description = "이동 서비스 (nullable)", example = "123가 4567")
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

) {}
