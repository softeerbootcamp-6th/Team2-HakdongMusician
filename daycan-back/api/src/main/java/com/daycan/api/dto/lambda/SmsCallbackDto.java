package com.daycan.api.dto.lambda;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Schema(description = "Lambda → 서버 SMS 콜백 DTO")
public record SmsCallbackDto(
    @NotBlank @Schema(example = "SMS_SENT_SUMMARY") String event,
    @NotNull  @Schema(example = "1756090850308") Long timestamp,
    @NotBlank @Schema(example = "G4V20250825120049AYUXKL8LV29TEHW") String idempotencyKey,
    @NotNull  Data data
) {
  public enum Status { success, partial, failed }

  @Schema(description = "콜백 데이터 페이로드")
  public record Data(
      @NotNull @Schema(implementation = Status.class, example = "success") Status status,
      @NotBlank @Schema(example = "G4V20250825120049AYUXKL8LV29TEHW") String groupId,
      @NotNull @Schema(example = "1") Integer success,
      @NotNull @Schema(example = "0") Integer failed,
      @NotNull
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
      @Schema(example = "2025-08-23") LocalDate date,
      @JsonInclude(JsonInclude.Include.NON_EMPTY)
      @Schema(example = "[101,102,103]") List<Long> docIds,
      @NotNull List<Result> results
  ) {}

  @JsonInclude(JsonInclude.Include.NON_NULL)
  @Schema(description = "수신자별 전송 결과")
  public record Result(
      @NotBlank @Schema(example = "010-1234-4567") String to,
      @NotBlank @Schema(example = "success") String status, // success | failed
      @NotNull  @Schema(example = "1") Integer ok,
      @NotNull  @Schema(example = "0") Integer fail,
      @Schema(example = "Optional error message") String error
  ) {}
}

