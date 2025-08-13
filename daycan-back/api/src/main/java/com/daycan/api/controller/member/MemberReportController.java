package com.daycan.api.controller.member;

import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.MemberDetails;
import com.daycan.api.dto.common.FullReportDto;
import com.daycan.api.dto.member.response.report.ProgramSupportResponse;
import com.daycan.api.dto.member.response.report.HealthSupportResponse;
import com.daycan.api.dto.member.response.report.MealSupportResponse;
import com.daycan.domain.entry.document.vital.BloodPressureEntry;
import com.daycan.domain.entry.document.vital.ToiletEntry;
import com.daycan.domain.entry.document.report.CardFooter;
import com.daycan.domain.entry.document.vital.TemperatureEntry;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.enums.ProgramType;
import com.daycan.service.document.CareReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/member/reports")
@Tag(name = "\uD83D\uDCE8 고령자 리포트 API",
    description = "고령자의 일일 상태 리포트를 조회하는 API입니다. 식사, 건강, 신체/인지 활동별 리포트를 각각 조회할 수 있습니다.")
public class MemberReportController {
  private final CareReportService careReportService;

  /*--------------------------------------------------------------------
   * 0. 공통 응답
   *------------------------------------------------------------------*/
  @Operation(
      summary = "리포트 전체 응답",
      description = """
          모든 리포트 조회 API는 공통적으로 ResponseWrapper를 사용하여 응답합니다.
          성공 시, data 필드에 리포트 내용을 담아 반환합니다.
          인지 program, 건강 program이 여러개인 경우 점수는 분야별로 평균이 계산됩니다.
          """
  )
  @GetMapping("/{date}")
  public ResponseWrapper<FullReportDto> getReport(
      @AuthenticatedUser MemberDetails memberDetails,
      @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2025-07-31", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
      LocalDate date
  ) {
    FullReportDto report = careReportService.getReport(memberDetails.getMember().getUsername(), date);
    return ResponseWrapper.onSuccess(report);
  }

  /*--------------------------------------------------------------------
   * 1. 식사 리포트
   *------------------------------------------------------------------*/
  @Operation(
      summary = "식사 지원 리포트 조회",
      description = """
          지정한 날짜(date)의 아침·점심·저녁 식사 정보와 식사량을 반환합니다.
          제공되지 않은 식사는 null 로 응답되며, 총점은 최대 15점입니다.
          """
  )
  @GetMapping("/{date}/meal")
  @Deprecated
  public ResponseWrapper<MealSupportResponse> getMealSupportReport(
      @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2025-07-31", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate date
  ) {
    return ResponseWrapper.onSuccess(
        MealSupportResponse.of(
            "일반식을 모두 먹었어요",
            "점심은 절반도 드시지 못했어요",
            "아무것도 드시지 않았어요",
            CardFooter.of(30, "식사에 대한 설명이 들어갈겁니다아")
        )
    );
  }

  /*--------------------------------------------------------------------
   * 2. 건강 리포트
   *------------------------------------------------------------------*/
  @Operation(
      summary = "건강 지원 리포트 조회",
      description = """
          지정한 날짜(date)의 혈압·체온·배변/배뇨 기록을 반환합니다.
          항목별 점수를 합산하여 총 35점 만점으로 제공합니다.
          """
  )
  @GetMapping("/{date}/health")
  @Deprecated
  public ResponseWrapper<HealthSupportResponse> getHealthSupportReport(
      @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2025-07-31", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate date
  ) {
    return ResponseWrapper.onSuccess(
        HealthSupportResponse.of(
            BloodPressureEntry.of(120, 80),
            TemperatureEntry.of(36.5),
            ToiletEntry.of(2, 5),
            CardFooter.of(30, "건강 상태에 대한 설명이 들어갈겁니다아")
        )
    );
  }

  /*--------------------------------------------------------------------
   * 3. 활동 리포트 (신체·인지)
   *------------------------------------------------------------------*/
  @Operation(
      summary = "활동 지원 리포트 조회",
      description = """
          지정한 날짜(date)의 신체·인지 활동 정보를 반환합니다.
          각 활동은 활동명, 특성, 개인별 특이사항, 점수를 포함하며
          점수 범위는 0~15점입니다.
          """
  )
  @GetMapping("/{date}/program")
  @Deprecated
  public ResponseWrapper<List<ProgramSupportResponse>> getActivitySupportReport(
      @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2025-07-31", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = ISO.DATE)
      LocalDate date
  ) {
    List<ProgramSupportResponse> programList = List.of(
        ProgramSupportResponse.of(
            ProgramType.PHYSICAL,
            "산책 활동",
            "신체 건강 유지에 도움",
            "김동성 할아버지께서는 매일 아침 산책을 즐기십니다.",
            CardFooter.of(15, "활동에 대한 설명이 들어갈겁니다아")
        ),
        ProgramSupportResponse.of(
            ProgramType.PHYSICAL,
            "스트레칭",
            "근육 유연성 향상",
            "다소 무리하지 않게 진행하심",
            CardFooter.of(10, "활동에 대한 설명이 들어갈겁니다아")
        ),
        ProgramSupportResponse.of(
            ProgramType.COGNITIVE,
            "화투패 맞추기 활동",
            "인지 능력 향상에 도움",
            "김동성 할아버지께서는 타짜이십니다.",
            CardFooter.of(0, "활동에 대한 설명이 들어갈겁니다아")
        )
    );

    return ResponseWrapper.onSuccess(programList);
  }
}

