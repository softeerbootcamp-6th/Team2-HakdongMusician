package com.daycan.dto.member.statistics;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.Map;

@Schema(description = "건강 통계 항목")
public record HealthStatisticsEntry(
    @Schema(description = "날짜별 값 (예: 혈압, 체온 등)")
    Map<LocalDate, Number> values,
    @Schema(description = "평균 값")
    double average
) {

}
