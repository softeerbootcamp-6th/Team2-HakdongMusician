package com.daycan.api.dto.member.response.report;

import com.daycan.api.dto.entry.document.BloodPressureEntry;
import com.daycan.api.dto.entry.document.report.CardFooter;
import com.daycan.api.dto.entry.document.ToiletEntry;
import com.daycan.api.dto.entry.document.TemperatureEntry;
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
    ToiletEntry toiletEntry,
    @Schema(description = "점수와 메모, 카드 밑에 들어감")
    CardFooter cardFooter
) {

  public static HealthSupportResponse of(
      BloodPressureEntry bloodPressureEntry, TemperatureEntry temperatureEntry,
      ToiletEntry toiletEntry, CardFooter cardFooter
  ) {
    return new HealthSupportResponse(
        bloodPressureEntry, temperatureEntry,
        toiletEntry, cardFooter
    );
  }
}
