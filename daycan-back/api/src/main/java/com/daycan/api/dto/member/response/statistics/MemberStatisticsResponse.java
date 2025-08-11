package com.daycan.api.dto.member.response.statistics;

import com.daycan.api.dto.entry.statistics.HealthStatisticsEntry;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "회원 건강 통계 응답")
public record MemberStatisticsResponse(
    @Schema(description = "체온 통계")
    HealthStatisticsEntry temperatureValues,
    @Schema(description = "이완기 혈압 통계")
    HealthStatisticsEntry bloodPressureDiastolicValues,
    @Schema(description = "수축기 혈압 통계")
    HealthStatisticsEntry bloodPressureSystolicValues,
    @Schema(description = "대변 횟수 통계")
    HealthStatisticsEntry defecationCountValues,
    @Schema(description = "소변 횟수 통계")
    HealthStatisticsEntry urinationCountValues
) { }
