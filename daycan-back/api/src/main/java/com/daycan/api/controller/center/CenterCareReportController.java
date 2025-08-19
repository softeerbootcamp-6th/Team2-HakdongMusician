package com.daycan.api.controller.center;

import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.CenterDetails;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.api.dto.common.FullReportDto;
import com.daycan.api.dto.center.request.ReportQueryParameters;
import com.daycan.api.dto.center.request.ReportReviewRequest;
import com.daycan.api.dto.center.response.report.CareReportMetaResponse;
import com.daycan.service.document.CenterDocumentFacade;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/care-report")
@Tag(name = "\uD83D\uDCCB 리포트 관리", description = "관리자용 리포트 관련 API")
@RequiredArgsConstructor
@Validated
public class CenterCareReportController {

  private final CenterDocumentFacade centerDocumentFacade;

  @GetMapping(value = "/{date}")
  public ResponseWrapper<List<CareReportMetaResponse>> getReportList(
      @AuthenticatedUser
      CenterDetails centerDetails,

      @ParameterObject @ModelAttribute @Valid
      ReportQueryParameters query,

      @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2025-07-31", required = true)
      @PathVariable
      LocalDate date
  ) {
    String nameLike = query.memberNameLikeNorm().orElse(null);

    List<CareReportMetaResponse> response = centerDocumentFacade.getCareReportMetaListByDate(
        centerDetails.getCenter(),
        date,
        query.statuses(),
        nameLike
    );
    return ResponseWrapper.onSuccess(
        response
    );
  }

  @Operation(
      summary = "리포트 응답",
      description = """
          성공 시, data 필드에 리포트 내용을 담아 반환합니다.
          """
  )
  @GetMapping("/{date}/{memberId}")
  public ResponseWrapper<FullReportDto> getReport(
      @AuthenticatedUser
      CenterDetails centerDetails,

      @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2025-07-31", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
      LocalDate date,

      @Parameter(description = "수급자 ID", example = "1L", required = true)
      @PathVariable
      Long memberId
  ) {
    FullReportDto response = centerDocumentFacade.getCareReportByMemberIdAndDate(
        centerDetails.getCenter(),
        memberId, date
    );
    return ResponseWrapper.onSuccess(response);
  }

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
      @AuthenticatedUser
      CenterDetails centerDetails,
      @PathVariable Long reportId,
      @Valid @RequestBody ReportReviewRequest request
  ) {

    centerDocumentFacade.reviewReport(
        centerDetails.getCenter(),reportId, request
    );
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
  @PatchMapping("/{reportId}/send")
  public ResponseWrapper<Void> sendReport(
      @PathVariable Long reportId,
      @Parameter(description = "전송 시간 (ISO 8601 형식, 예: 2025-07-31T10:00:00Z)")
      @RequestBody(required = false) String time
  ) {

    return ResponseWrapper.onSuccess(null);
  }
}
