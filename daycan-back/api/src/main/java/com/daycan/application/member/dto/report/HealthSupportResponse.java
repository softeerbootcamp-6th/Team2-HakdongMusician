package com.daycan.application.member.dto.report;

import com.daycan.application.member.dto.report.entry.BloodPressureEntry;
import com.daycan.application.member.dto.report.entry.BowelUrinationEntry;
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
    @Schema(description = "총 점수")
    int totalScore,
    @Schema(description = "추가 노트")
    String additionalNote
) {

  public static HealthSupportResponse of(
      BloodPressureEntry bloodPressureEntry, TemperatureEntry temperatureEntry,
      BowelUrinationEntry bowelUrinationEntry, int totalScore, String additionalNote
  ) {
    return new HealthSupportResponse(
        bloodPressureEntry, temperatureEntry,
        bowelUrinationEntry, totalScore, additionalNote
    );
  }
}
