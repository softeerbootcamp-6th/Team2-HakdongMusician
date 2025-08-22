package com.daycan.api.dto.center;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


public record SendMessageRequest(
    @NotEmpty(message = "수신자 ID는 1개 이상이어야 합니다.")
    List<Long> memberIds,

    @NotNull(message = "발송 날짜는 필수입니다.")
    @Schema(example = "2025-08-22")
    LocalDate sendDate,

    @Schema(description = "발송 시간(HH:mm). 비우면 즉시 전송", example = "10:30", nullable = true)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    LocalTime sendTime
) {

}
