package com.daycan.adapter.member;

import com.daycan.application.member.dto.statistics.HealthStatisticsEntry;
import com.daycan.application.member.dto.statistics.MemberHealthStatisticsResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member/statistics")
@Tag(name = "🧾 고령자 건강 정보 통계 API",
    description = "고령자의 일일 상태 리포트를 조회하는 API입니다. 식사, 건강, 신체/인지 활동별 리포트를 각각 조회할 수 있습니다.")
public class MemberStatisticsController {

  /**
   * 시작 날짜, 기간으로 건강지수 평균 조회
   */
  @GetMapping("/health-index/average")
  public Double getHealthIndexAverage(
      @Parameter(description = "기준 날짜", example = "2024-06-01", required = true)
      @RequestParam LocalDate baseDate,
      @Parameter(description = "조회 기간(일)", example = "7", required = true)
      @RequestParam int period
  ) {
    // 가짜 평균값 반환
    return 81.0;
  }

  /**
   * 날짜 기준으로 건강지수 조회
   */
  @GetMapping("/health-index/by-date")
  public Map<LocalDate, Integer> getHealthIndexByDate(
      @Parameter(description = "기준 날짜", example = "2024-06-01", required = true)
      @RequestParam LocalDate baseDate,
      @Parameter(description = "조회 기간(일)", example = "7", required = true)
      @RequestParam int period
  ) {
    // 가짜 데이터 반환
    return Map.of(
        baseDate, 80,
        baseDate.plusDays(1), 82
    );
  }

  /**
   * 건강 데이터(체온, 혈압, 대변/소변 횟수 등) 조회
   */
  @GetMapping("/statistics")
  public MemberHealthStatisticsResponse getStatistics(
      @Parameter(description = "기준 날짜", example = "2024-06-01", required = true)
      @RequestParam LocalDate baseDate,
      @Parameter(description = "조회 기간(일)", example = "7", required = true)
      @RequestParam int period
  ) {
    // 가짜 데이터 생성
    HealthStatisticsEntry temperatureValues = new HealthStatisticsEntry(
        Map.of(baseDate, 36.5, baseDate.plusDays(1), 36.7),
        36.6
    );
    HealthStatisticsEntry bloodPressureDiastolicValues = new HealthStatisticsEntry(
        Map.of(baseDate, 75, baseDate.plusDays(1), 77),
        76.0
    );
    HealthStatisticsEntry bloodPressureSystolicValues = new HealthStatisticsEntry(
        Map.of(baseDate, 120, baseDate.plusDays(1), 122),
        121.0
    );
    HealthStatisticsEntry defecationCountValues = new HealthStatisticsEntry(
        Map.of(baseDate, 1, baseDate.plusDays(1), 2),
        1.5
    );
    HealthStatisticsEntry urinationCountValues = new HealthStatisticsEntry(
        Map.of(baseDate, 5, baseDate.plusDays(1), 6),
        5.5
    );

    return new MemberHealthStatisticsResponse(
        temperatureValues,
        bloodPressureDiastolicValues,
        bloodPressureSystolicValues,
        defecationCountValues,
        urinationCountValues
    );
  }
}
