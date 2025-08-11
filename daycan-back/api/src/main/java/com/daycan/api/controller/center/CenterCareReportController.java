package com.daycan.api.controller.center;

import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.api.dto.common.FullReportDto;
import com.daycan.api.dto.entry.document.report.ReportEntry;
import com.daycan.api.dto.member.request.ReportQueryParameters;
import com.daycan.api.dto.center.request.ReportReviewRequest;
import com.daycan.api.dto.center.response.CareReportMetaResponse;
import com.daycan.common.response.PageResponse;
import com.daycan.api.dto.entry.document.report.CardFooter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/care-report")
@Tag(name = "📋 리포트 관리", description = "관리자용 리포트 관련 API")
public class CenterCareReportController {

  /**
   * post: 검토 된 리포트 전송 api (시간 파라미터로 추가하고 없으면 즉시 전송)
   */

  @GetMapping
  public PageResponse<List<CareReportMetaResponse>> getReportList(
      @ParameterObject @ModelAttribute @Valid
      ReportQueryParameters query,
      // 스프링이 query-param <-> record 바인딩
      Pageable pageable               // page, size, sort 파라미터 처리
  ) {

    /* mock 데이터 생성 (임시) */
    List<CareReportMetaResponse> mock = List.of(
        new CareReportMetaResponse(1L, "김순애", LocalDate.now(), DocumentStatus.REPORT_REVIEWED, false),
        new CareReportMetaResponse(2L, "박철수", LocalDate.now().minusDays(1),
            DocumentStatus.REPORT_PENDING, true)
    );

    return new PageResponse<>(
        0,
        mock,
        pageable.getPageNumber(),
        pageable.getPageSize()
    );
  }

  @Operation(
      summary = "리포트 응답",
      description = """
          성공 시, data 필드에 리포트 내용을 담아 반환합니다.
          """
  )
  @GetMapping("/{date}/{recipientId}")
  public ResponseWrapper<FullReportDto> getReport(
      @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2025-07-31", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
      LocalDate date,

      @Parameter(description = "수급자 ID", example = "MEM123456", required = true)
      @PathVariable
      String recipientId
  ) {
    // Mock data 생성
    List<ReportEntry> mealEntries = List.of(
        new ReportEntry("아침", "밥, 김치", null, null),
        new ReportEntry("점심", "불고기, 나물", null, null),
        new ReportEntry("저녁", "죽", null, null)
    );
    // warning, additionalInfo must be null for meal entries

    List<ReportEntry> healthEntries = List.of(
        new ReportEntry("혈압", "120/80 mmHg", null, null),
        new ReportEntry("체온", "38.1도", "정상(36~37.5)보다 높음", null),
        new ReportEntry("용변", "대변 1회, 소변 4회", null, null)
    );

    List<ReportEntry> physicalEntries = List.of(
        new ReportEntry("노래 부르기 활동", "노래 부르기는 기분 전환과 정서적 안정, 인지 능력 향상에 도움이 되는 활동이에요.", null,
            "좋아하는 노래가 나오자 밝은 표정으로 따라 부르며 즐겁게 참여하셨어요!")
        , new ReportEntry("스트레칭", "신체 건강 유지에 도움", null, "김동성 할아버지께서는 매일 아침 산책을 즐기십니다.")
    );

    List<ReportEntry> cognitiveEntries = List.of(
        new ReportEntry("민화투", "김동성 할아버지께서는 타짜이십니다", null, null)
    );

    FullReportDto response = new FullReportDto(
        85,         // totalScore
        -2,          // changeAmount
        20,         // mealScore
        25,         // healthScore
        20,         // physicalScore
        20,         // cognitiveScore
        mealEntries,
        CardFooter.of(30, "식사에 대한 설명이 들어갈겁니다아"),

        healthEntries,
        CardFooter.of(30, "식사에 대한 설명이 들어갈겁니다아"),

        physicalEntries,
        CardFooter.of(30, "식사에 대한 설명이 들어갈겁니다아"),

        cognitiveEntries,
        CardFooter.of(30, "식사에 대한 설명이 들어갈겁니다아")
    );

    return ResponseWrapper.onSuccess(response);
  }

  /**
   * 생성된 리포트 검토(수정) API
   * <pre>
   * ⟶ 리포트 조회 → 검토 후 수정된 리포트 전송
   * ⟶ 수정 사항이 없으면 조회된 값 그대로 전송
   * ⟶ 전송 시 CareReportStatus.REVIEWED 로 상태 변경
   * </pre>
   *
   * @param reportId 검토 대상 리포트 PK
   * @param request  수정‧검토 내용
   * @return 성공 시 200 OK / body: { "success": true, "data": null }
   */
  @Operation(
      summary = "리포트 검토(수정)",
      description = """
          생성된 리포트를 검토 후 수정합니다.
          - 수정이 필요 없는 항목은 null 또는 빈 리스트를 보내면 기존 값을 유지합니다.
          - 요청이 완료되면 리포트 상태는 REVIEWED 로 변경됩니다.
          """
  )
  @PutMapping("/{reportId}/review")
  public ResponseWrapper<Void> reviewReport(
      @PathVariable Long reportId,
      @Valid @RequestBody ReportReviewRequest request
  ) {
    /* body 에도 reportId 가 포함돼 있으므로 불일치 방지용 체크 */
//    if (!reportId.equals(request.reportId())) {
//      throw new IllegalArgumentException("PathVariable reportId 와 body 의 reportId 가 다릅니다.");
//    }

    return ResponseWrapper.onSuccess(null);
  }

  @Operation(
      summary = "리포트 전송 api",
      description = """
          검토 완료된 리포트를 전송합니다.
          - 전송 시 CareReportStatus.SENT 로 상태 변경됩니다.
          - time 파라미터를 주지 않으면 전송 시간은 현재 시간으로 설정됩니다.
          """
  )
  @PutMapping("/{reportId}/send")
  public ResponseWrapper<Void> sendReport(
      @PathVariable Long reportId,
      @Parameter(description = "전송 시간 (ISO 8601 형식, 예: 2025-07-31T10:00:00Z)")
      @RequestBody(required = false) String time
  ) {

    return ResponseWrapper.onSuccess(null);
  }
}
