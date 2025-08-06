package com.daycan.dto.member.statistics;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Map;

@Schema(description = "건강 통계(공통)")
public sealed interface HealthStatisticsEntry
    permits DailyHealthStatisticsEntry, MonthlyHealthStatisticsEntry {

  /** 측정값(일별·월별) */
  Map<?, Number> values();
  /** 평균값 */
  double average();
}
