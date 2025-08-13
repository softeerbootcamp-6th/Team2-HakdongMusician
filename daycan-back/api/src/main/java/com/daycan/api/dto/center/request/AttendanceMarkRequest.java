package com.daycan.api.dto.center.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Schema(description = "출결 일괄 처리 요청 DTO")
public record AttendanceMarkRequest(
    @NotNull
    @Schema(description = "대상 날짜", example = "2025-08-12")
    LocalDate date,

    @NotEmpty
    @Schema(description = "대상 수급자 ID 목록", example = "[1,2,3]")
    List<Long> memberIds,

    @NotNull
    @Schema(description = "처리 액션 (결석/출석)")
    AttendanceAction action

) { }

