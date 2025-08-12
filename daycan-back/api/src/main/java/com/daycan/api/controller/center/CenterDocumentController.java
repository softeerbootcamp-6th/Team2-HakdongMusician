package com.daycan.api.controller.center;

import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.CenterDetails;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.entity.Center;
import com.daycan.api.dto.center.response.document.DocumentCountResponse;
import com.daycan.api.dto.center.response.document.DocumentStatusResponse;
import com.daycan.service.document.DocumentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.YearMonth;
import java.util.List;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/document")
@Tag(name = "\uD83D\uDCDA 센터용 문서 관리", description = "센터 문서(기록지/리포트 통합) 관련 API")
@RequiredArgsConstructor
public class CenterDocumentController {
  private final DocumentService documentService;

  @GetMapping("/count")
  @Operation(summary = "기록지/리포트 카운트 조회", description = "미완료된 기록지/리포트 수와 지연된 기록지/리포트 수를 조회합니다. (어드민 페이지 사이드 바)")
  public ResponseWrapper<DocumentCountResponse> getDocumentCount(
      @AuthenticatedUser CenterDetails centerDetails) {
    Center center = centerDetails.getCenter();
    return ResponseWrapper.onSuccess(documentService.getDocumentCount(center.getId()));
  }

  @GetMapping("/status")
  @Operation(summary = "기록지, 리포트 상태 조회", description = "page마다 10개의 기록지와 리포트 상태를 조회합니다. 1페이지부터 시작합니다.")
  public List<DocumentStatusResponse> getDocumentStatusList(
      @Parameter(description = "페이지", example = "1") @RequestParam(required = true) int page) {
    return documentService.getDocumentStatusList(page);
  }

  @GetMapping("/{memberId}/{month:\\d{4}-\\d{2}}")
  @Operation(summary = "특정 수급자의 월별 기록지/리포트 조회",
      description = "특정 수급자의 특정 월에 대한 기록지와 리포트를 조회합니다. 기록지/리포트 내역 화면")
  public ResponseWrapper<List<DocumentStatusResponse>> getDocumentStatusListByMemberAndMonth(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "수급자 ID", example = "1")
      @RequestParam(required = true) @Valid @NotNull
      Long memberId,
      @Parameter(description = "조회할 월 (yyyy-MM)", example = "2025-08")
      @RequestParam(required = true) @Valid @NotNull
      YearMonth month) {
    List<DocumentStatusResponse> statusList = documentService.getDocumentStatusListByMemberAndMonth(
        centerDetails.getCenter(), memberId, month);
    return ResponseWrapper.onSuccess(statusList);
  }
}
