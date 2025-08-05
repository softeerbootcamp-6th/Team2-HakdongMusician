package com.daycan.controller.admin;

import com.daycan.common.response.ResponseWrapper;
import com.daycan.dto.FullReportDto;
import com.daycan.dto.ReportEntry;
import com.daycan.dto.admin.request.ReportQueryParameters;
import com.daycan.dto.admin.response.CareReportMetaResponse;
import com.daycan.common.response.PageResponse;
import com.daycan.domain.enums.CareReportStatus;
import com.daycan.dto.member.report.CardFooter;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/care-report")
@Tag(name = "📋 리포트 관리", description = "관리자용 리포트 관련 API")
public class AdminCareReportController {

  /**
   * get: 리포트 리스트 조회 api - 리포트 상태별로 조회(검토 완료, 검토 대기, 생성 중, 생성 불가) (중복선택 가능) - sort by (날짜 오름, 내림 차순)
   * 가능 (default: 내림차순) - 고령자 이름으로 검색 가능
   * <p>
   * get: 리포트 상세 조회 api
   * <p>
   * post: 생성 된 리포트 검토 api
   * <p>
   * post: 검토 된 리포트 전송 api (시간 파라미터로 추가하고 없으면 즉시 전송)
   */

  @GetMapping
  public PageResponse<List<CareReportMetaResponse>> getReportList(
      @ParameterObject @ModelAttribute ReportQueryParameters query,
      // 스프링이 query-param <-> record 바인딩
      Pageable pageable               // page, size, sort 파라미터 처리
  ) {

    /* mock 데이터 생성 (임시) */
    List<CareReportMetaResponse> mock = List.of(
        new CareReportMetaResponse(1L, "김순애", LocalDate.now(), CareReportStatus.REVIEWED, false),
        new CareReportMetaResponse(2L, "박철수", LocalDate.now().minusDays(1),
            CareReportStatus.PENDING, true)
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
        new ReportEntry("저녁", "죽", "소화불량 우려", "식욕 저하로 죽 섭취")
    );

    List<ReportEntry> healthEntries = List.of(
        new ReportEntry("혈압", "120/80 mmHg", null, null),
        new ReportEntry("체온", "38.1도", "정상(36~37.5)보다 높음", null),
        new ReportEntry("용변", "대변 1회, 소변 4회", null, null)
    );

    List<ReportEntry> physicalEntries = List.of(
        new ReportEntry("노래 부르기 활동", "노래 부르기는 기분 전환과 정서적 안정, 인지 능력 향상에 도움이 되는 활동이에요.", null,
            "좋아하는 노래가 나오자 밝은 표정으로 따라 부르며 즐겁게 참여하셨어요!")
        , new ReportEntry("스트레칭", "신체 건강 유지에 도움", "김동성 할아버지께서는 매일 아침 산책을 즐기십니다.", null)
    );

    List<ReportEntry> cognitiveEntries = List.of(
        new ReportEntry("민화투", "김동성 할아버지께서는 타짜이십니다", null, null)
    );

    FullReportDto response = new FullReportDto(
        1L,
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

}
