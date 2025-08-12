package com.daycan.domain.entry.statistics;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.YearMonth;
import java.util.Map;

@Schema(description = "건강 통계 – 월별")
public record MonthlyHealthStatisticsEntry(
    Map<YearMonth, Number> values,
    double average
) implements HealthStatisticsEntry { }