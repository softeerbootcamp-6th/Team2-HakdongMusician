package com.daycan.api.controller.member;

import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.MemberDetails;
import com.daycan.api.dto.common.NumberValue;

import com.daycan.domain.entry.statistics.DailyHealthStatisticsEntry;
import com.daycan.api.dto.member.response.statistics.MemberStatisticsResponse;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.entry.statistics.MonthlyHealthStatisticsEntry;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.YearMonth;
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
    name = "\uD83D\uDCC8 고령자 건강 정보 통계 API",
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
      @AuthenticatedUser MemberDetails memberDetails,
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
  @GetMapping("/overall/from/{startDate}/to/{endDate}/average")
  public ResponseWrapper<Double> getOverallAverage(
      @AuthenticatedUser MemberDetails memberDetails,
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
      summary     = "바이탈(Vitals) 일별 조회",
      description = """
        startDate~endDate 구간의 체온·혈압·배변·배뇨 데이터를
        일자별 값과 평균으로 반환합니다.
        """
  )
  @GetMapping("/vitals/from/{startDate:\\d{4}-\\d{2}-\\d{2}}/to/{endDate:\\d{4}-\\d{2}-\\d{2}}")
  public ResponseWrapper<MemberStatisticsResponse> getVitals(
      @AuthenticatedUser MemberDetails memberDetails,
      @Parameter(description = "조회 시작일 (yyyy-MM-dd)", example = "2024-07-01")
      @PathVariable @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate startDate,
      @Parameter(description = "조회 종료일 (yyyy-MM-dd)", example = "2024-07-07")
      @PathVariable @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate endDate
  ) {
    /* mock */
    DailyHealthStatisticsEntry temperatureValues = new DailyHealthStatisticsEntry(
        Map.of(startDate, 36.5, startDate.plusDays(1), 36.7), 36.6);

    DailyHealthStatisticsEntry bloodPressureDiastolicValues = new DailyHealthStatisticsEntry(
        Map.of(startDate, 75, startDate.plusDays(1), 77), 76.0);

    DailyHealthStatisticsEntry bloodPressureSystolicValues = new DailyHealthStatisticsEntry(
        Map.of(startDate, 120, startDate.plusDays(1), 122), 121.0);

    DailyHealthStatisticsEntry defecationCountValues = new DailyHealthStatisticsEntry(
        Map.of(startDate, 1, startDate.plusDays(1), 2), 1.5);

    DailyHealthStatisticsEntry urinationCountValues = new DailyHealthStatisticsEntry(
        Map.of(startDate, 5, startDate.plusDays(1), 6), 5.5);

    return ResponseWrapper.onSuccess(new MemberStatisticsResponse(
        temperatureValues,
        bloodPressureDiastolicValues,
        bloodPressureSystolicValues,
        defecationCountValues,
        urinationCountValues
    ));
  }

  /* ------------------------------------------------------------------
   * 월별 통계
   * ------------------------------------------------------------------ */
  @Operation(
      summary     = "바이탈(Vitals) 월별 통계 조회",
      description = """
        startMonth~endMonth 구간의 체온·혈압·배변·배뇨 데이터를
        월별 값과 평균으로 반환합니다.
        """
  )
  @GetMapping("/vitals/from/{startMonth:\\d{4}-\\d{2}}/to/{endMonth:\\d{4}-\\d{2}}")
  public ResponseWrapper<MemberStatisticsResponse> getMonthlyVitals(
      @AuthenticatedUser MemberDetails memberDetails,
      @Parameter(description = "조회 시작월 (yyyy-MM)", example = "2024-02")
      @PathVariable @Valid @NotNull @DateTimeFormat(pattern = "yyyy-MM")
      YearMonth startMonth,
      @Parameter(description = "조회 종료월 (yyyy-MM)", example = "2024-07")
      @PathVariable @Valid @NotNull @DateTimeFormat(pattern = "yyyy-MM")
      YearMonth endMonth
  ) {
    /* mock */
    MonthlyHealthStatisticsEntry temperatureValues = new MonthlyHealthStatisticsEntry(
        Map.of(startMonth, 36.4, startMonth.plusMonths(1), 36.6), 36.5);

    MonthlyHealthStatisticsEntry bloodPressureDiastolicValues = new MonthlyHealthStatisticsEntry(
        Map.of(startMonth, 76, startMonth.plusMonths(1), 78), 77.0);

    MonthlyHealthStatisticsEntry bloodPressureSystolicValues = new MonthlyHealthStatisticsEntry(
        Map.of(startMonth, 121, startMonth.plusMonths(1), 123), 122.0);

    MonthlyHealthStatisticsEntry defecationCountValues = new MonthlyHealthStatisticsEntry(
        Map.of(startMonth, 45, startMonth.plusMonths(1), 48), 46.5);

    MonthlyHealthStatisticsEntry urinationCountValues = new MonthlyHealthStatisticsEntry(
        Map.of(startMonth, 155, startMonth.plusMonths(1), 160), 157.5);

    return ResponseWrapper.onSuccess(new MemberStatisticsResponse(
        temperatureValues,
        bloodPressureDiastolicValues,
        bloodPressureSystolicValues,
        defecationCountValues,
        urinationCountValues
    ));
  }


}
