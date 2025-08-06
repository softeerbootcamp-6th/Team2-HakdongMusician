package com.daycan.controller.admin;

import com.daycan.common.annotations.CenterPrinciple;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.entity.Center;
import com.daycan.dto.admin.response.DocumentCountResponse;
import com.daycan.dto.admin.response.DocumentStatusResponse;
import com.daycan.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/document")
@Tag(name = "센터용 문서 관리", description = "센터 문서(기록지/리포트 통합) 관련 API")
@RequiredArgsConstructor
public class AdminDocumentController {

  private final DocumentService documentService;

  @GetMapping("/status")
  @Operation(summary = "기록지, 리포트 상태 조회", description = "page마다 10개의 기록지와 리포트 상태를 조회합니다. 1페이지부터 시작합니다.")
  public List<DocumentStatusResponse> getDocumentStatusList(
      @Parameter(description = "페이지", example = "1") @RequestParam(required = true) int page) {
    return documentService.getDocumentStatusList(page);
  }

  @GetMapping("/count")
  @Operation(summary = "기록지/리포트 카운트 조회", description = "미완료된 기록지/리포트 수와 지연된 기록지/리포트 수를 조회합니다. (어드민 페이지 사이드 바)")
  public ResponseWrapper<DocumentCountResponse> getDocumentCount(
      @CenterPrinciple Center center) {
    return ResponseWrapper.onSuccess(documentService.getDocumentCount(center.getOrganizationId()));
  }
}
