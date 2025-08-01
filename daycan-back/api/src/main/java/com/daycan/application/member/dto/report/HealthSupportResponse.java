package com.daycan.application.member.dto.report;

import com.daycan.application.member.dto.report.entry.BloodPressureEntry;
import com.daycan.application.member.dto.report.entry.BowelUrinationEntry;
import com.daycan.application.member.dto.report.entry.CardFooter;
import com.daycan.application.member.dto.report.entry.TemperatureEntry;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "건강 지원 응답")
public record HealthSupportResponse(
    @Schema(description = "혈압 기록")
    BloodPressureEntry bloodPressureEntry,
    @Schema(description = "체온 기록")
    TemperatureEntry temperatureEntry,
    @Schema(description = "배변/배뇨 기록")
    BowelUrinationEntry bowelUrinationEntry,
    @Schema(description = "점수와 메모, 카드 밑에 들어감")
    CardFooter cardFooter
) {

  public static HealthSupportResponse of(
      BloodPressureEntry bloodPressureEntry, TemperatureEntry temperatureEntry,
      BowelUrinationEntry bowelUrinationEntry, CardFooter cardFooter
  ) {
    return new HealthSupportResponse(
        bloodPressureEntry, temperatureEntry,
        bowelUrinationEntry, cardFooter
    );
  }
}
