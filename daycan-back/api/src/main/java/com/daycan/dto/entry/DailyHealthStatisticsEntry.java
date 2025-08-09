package com.daycan.dto.entry;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.Map;

@Schema(description = "건강 통계 – 일별")
public record DailyHealthStatisticsEntry(
    Map<LocalDate, Number> values,
    double average
) implements HealthStatisticsEntry { }
