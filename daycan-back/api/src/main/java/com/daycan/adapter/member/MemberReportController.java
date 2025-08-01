package com.daycan.adapter.member;

import com.daycan.application.member.dto.report.ActivitySupportGroup;
import com.daycan.application.member.dto.report.ActivitySupportResponse;
import com.daycan.application.member.dto.report.HealthSupportResponse;
import com.daycan.application.member.dto.report.MealSupportResponse;
import com.daycan.application.member.dto.report.entry.BloodPressureEntry;
import com.daycan.application.member.dto.report.entry.BowelUrinationEntry;
import com.daycan.application.member.dto.report.entry.TemperatureEntry;
import com.daycan.common.response.ResponseWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Tag(name = "🧾 고령자 리포트 API",
    description = "고령자의 일일 상태 리포트를 조회하는 API입니다. 식사, 건강, 신체/인지 활동별 리포트를 각각 조회할 수 있습니다.")
public class MemberReportController {

  @Operation(
      summary = "식사 지원 리포트 조회",
      description = """
          특정 날짜에 제공된 아침/점심/저녁 식사 정보와 식사량 등을 조회합니다.
          각 식사는 제공되지 않은 경우 null로 응답됩니다.
          점수는 최대 15점입니다.
          """,
      parameters = {
          @Parameter(name = "requestDate", description = "조회할 날짜 (yyyy-MM-dd)",
              required = true, example = "2025-07-31")
      }
  )
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "식사 지원 리포트 조회 성공")
  })
  @GetMapping("/report/meal")
  public ResponseWrapper<MealSupportResponse> getMealSupportReport(@RequestParam LocalDate requestDate) {
    return ResponseWrapper.onSuccess(
        MealSupportResponse.of(
            "일반식을 모두 먹었어요",
            "점심은 절반도 드시지 못했어요",
            "아무것도 드시지 않았어요",
            10,
            "오늘은 두 끼 모두 식사량이 충분하지 않았어요. 영양 섭취에 주의가 필요합니다."
        )
    );
  }

  @Operation(
      summary = "건강 지원 리포트 조회",
      description = """
          혈압, 체온, 배뇨/배변 기록 등 건강 관련 데이터를 조회합니다.
          혈압/체온/배변 각각 별도로 점수를 부여하며, 총합 점수는 35점 만점입니다.
          """,
      parameters = {
          @Parameter(name = "requestDate", description = "조회할 날짜 (yyyy-MM-dd)",
              required = true, example = "2025-07-31")
      }
  )
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "건강 지원 리포트 조회 성공")
  })
  @GetMapping("/report/health")
  public ResponseWrapper<HealthSupportResponse> getHealthSupportReport(@RequestParam LocalDate requestDate) {
    return ResponseWrapper.onSuccess(
        HealthSupportResponse.of(
            BloodPressureEntry.of(120, 80, 10),
            TemperatureEntry.of(36.5, 10),
            BowelUrinationEntry.of(2, 5, 10),
            30,"건강과 관련된 설명이 들어갈겁니다아"
        )
    );
  }

  @Operation(
      summary = "활동 지원 리포트 조회",
      description = """
        고령자의 일일 신체 및 인지 활동 정보를 조회합니다.
        각 활동은 활동명, 활동의 특성, 개인별 특이사항, 점수를 포함합니다.
        점수는 활동별로 0~15점 사이입니다.
        """,
      parameters = {
          @Parameter(name = "requestDate", description = "조회할 날짜 (yyyy-MM-dd)",
              required = true, example = "2025-07-31")
      }
  )
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "활동 지원 리포트 조회 성공")
  })
  @GetMapping("/report/activity")
  public ResponseWrapper<ActivitySupportGroup> getActivitySupportReport(
      @RequestParam LocalDate requestDate
  ) {
    List<ActivitySupportResponse> physical = List.of(
        ActivitySupportResponse.of(
            "산책 활동",
            "신체 건강 유지에 도움",
            "김동성 할아버지께서는 매일 아침 산책을 즐기십니다.",
            10
        ),
        ActivitySupportResponse.of(
            "스트레칭",
            "근육 유연성 향상",
            "다소 무리하지 않게 진행하심",
            10
        )
    );

    List<ActivitySupportResponse> cognitive = List.of(
        ActivitySupportResponse.of(
            "화투패 맞추기 활동",
            "인지 능력 향상에 도움",
            "김동성 할아버지께서는 타짜이십니다.",
            0
        )
    );

    return ResponseWrapper.onSuccess(
        new ActivitySupportGroup(physical, cognitive)
    );
  }

}
