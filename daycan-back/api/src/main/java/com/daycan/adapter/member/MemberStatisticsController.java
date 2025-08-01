package com.daycan.adapter.member;

import com.daycan.application.common.dto.NumberValue;
import com.daycan.application.member.dto.statistics.HealthStatisticsEntry;
import com.daycan.application.member.dto.statistics.MemberStatisticsResponse;
import com.daycan.common.response.ResponseWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member/statistics")
@Tag(
    name = "🧾 고령자 건강 정보 통계 API",
    description = "고령자의 일일 상태 리포트를 조회하는 API입니다. 식사, 건강, 신체·인지 활동별 리포트를 각각 조회할 수 있습니다."
)
public class MemberStatisticsController {

  /*--------------------------------------------------------------------
   * 1. 단일 날짜 Overall Score
   *------------------------------------------------------------------*/
  @Operation(
      summary = "통합 점수(Overall) 단일 조회",
      description = "특정 날짜(date)의 통합 건강 점수를 반환합니다."
  )
  @GetMapping("/overall/{date}")
  public ResponseWrapper<NumberValue> getOverallScore(
      @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2025-08-01", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate date
  ) {
    return ResponseWrapper.onSuccess(new NumberValue(80)); // mock
  }

  /*--------------------------------------------------------------------
   * 2. 구간 평균 Overall Score
   *------------------------------------------------------------------*/
  @Operation(
      summary = "통합 점수(Overall) 구간 평균",
      description = "startDate~endDate 구간의 평균 통합 점수를 반환합니다."
  )
  @GetMapping("/overall/{startDate}/{endDate}/average")
  public ResponseWrapper<Double> getOverallAverage(
      @Parameter(description = "조회 시작일 (yyyy-MM-dd)", example = "2024-07-01", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate startDate,
      @Parameter(description = "조회 종료일 (yyyy-MM-dd)", example = "2024-07-07", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate endDate
  ) {
    return ResponseWrapper.onSuccess(82.5); // mock
  }

  /*--------------------------------------------------------------------
   * 3. 구간별 일자 Overall Score + 평균
   *------------------------------------------------------------------*/
  @Operation(
      summary = "통합 점수(Overall) 일자별 조회",
      description = "startDate~endDate 구간의 일자별 통합 점수와 평균을 반환합니다."
  )
  @GetMapping("/overall/{startDate}/{endDate}")
  public ResponseWrapper<HealthStatisticsEntry> getOverallByDate(
      @Parameter(description = "조회 시작일 (yyyy-MM-dd)", example = "2024-07-01", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate startDate,
      @Parameter(description = "조회 종료일 (yyyy-MM-dd)", example = "2024-07-07", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate endDate
  ) {
    // mock
    return ResponseWrapper.onSuccess(
        new HealthStatisticsEntry(
            Map.of(startDate, 81, startDate.plusDays(1), 82),
            81.5
        )
    );
  }

  /*--------------------------------------------------------------------
   * 4. Vitals 통계 (체온·혈압·배변·배뇨 등)
   *------------------------------------------------------------------*/
  @Operation(
      summary = "바이탈(Vitals) 통계 조회",
      description = """
          startDate~endDate 구간의 체온·혈압·배변·배뇨 등 바이탈 데이터를
          일자별 값과 평균으로 반환합니다.
          - 1주·1달 : 일자별 전체 데이터
          - 6달·1년 : 월별 대표값(평균)으로 요약
          """
  )
  @GetMapping("/vitals/{startDate}/{endDate}")
  public ResponseWrapper<MemberStatisticsResponse> getVitals(
      @Parameter(description = "조회 시작일 (yyyy-MM-dd)", example = "2024-07-01", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate startDate,
      @Parameter(description = "조회 종료일 (yyyy-MM-dd)", example = "2024-07-07", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate endDate
  ) {
    // mock 데이터
    HealthStatisticsEntry temperatureValues = new HealthStatisticsEntry(
        Map.of(startDate, 36.5, startDate.plusDays(1), 36.7),
        36.6
    );
    HealthStatisticsEntry bloodPressureDiastolicValues = new HealthStatisticsEntry(
        Map.of(startDate, 75, startDate.plusDays(1), 77),
        76.0
    );
    HealthStatisticsEntry bloodPressureSystolicValues = new HealthStatisticsEntry(
        Map.of(startDate, 120, startDate.plusDays(1), 122),
        121.0
    );
    HealthStatisticsEntry defecationCountValues = new HealthStatisticsEntry(
        Map.of(startDate, 1, startDate.plusDays(1), 2),
        1.5
    );
    HealthStatisticsEntry urinationCountValues = new HealthStatisticsEntry(
        Map.of(startDate, 5, startDate.plusDays(1), 6),
        5.5
    );

    return ResponseWrapper.onSuccess(
        new MemberStatisticsResponse(
            temperatureValues,
            bloodPressureDiastolicValues,
            bloodPressureSystolicValues,
            defecationCountValues,
            urinationCountValues
        )
    );
  }

}
