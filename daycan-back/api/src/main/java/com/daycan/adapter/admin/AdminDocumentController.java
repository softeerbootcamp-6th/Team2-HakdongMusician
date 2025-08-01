package com.daycan.adapter.admin;

import com.daycan.application.admin.dto.CareReportCountResponse;
import com.daycan.application.admin.dto.CareSheetCountResponse;
import com.daycan.application.admin.dto.DocumentCountResponse;
import com.daycan.application.admin.dto.DocumentStatusResponse;
import com.daycan.application.admin.dto.DocumentStatusResponse.CareSheetStatusResponse;
import com.daycan.common.response.ApiResponse;
import com.daycan.domain.enums.CareReportStatus;
import com.daycan.domain.enums.CareSheetStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Date;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/document")
@Tag(name = "🏥 센터 관리", description = "관리자용 센터 관련 API")
public class AdminDocumentController {

  private final List<DocumentStatusResponse> mockDocumentStatus = List.of(
      new DocumentStatusResponse(new Date(),
          new CareSheetStatusResponse(
              5L, CareSheetStatus.DONE
          ), new DocumentStatusResponse.CareReportStatusResponse(
          3L, CareReportStatus.CREATED
      )),
      new DocumentStatusResponse(new Date(),
          new CareSheetStatusResponse(
              2L, CareSheetStatus.PENDING
          ), new DocumentStatusResponse.CareReportStatusResponse(
          1L, CareReportStatus.DONE
      )),
      new DocumentStatusResponse(new Date(),
          new CareSheetStatusResponse(
              1L, CareSheetStatus.PENDING
          ), new DocumentStatusResponse.CareReportStatusResponse(
          2L, CareReportStatus.CREATED
      ))
  );

  @GetMapping("status")
  @Operation(summary = "기록지, 리포트 상태 조회", description = "page마다 10개의 기록지와 리포트 상태를 조회합니다. 1페이지부터 시작합니다.")
  public List<DocumentStatusResponse> getDocumentStatusList(
      @Parameter(description = "페이지", example = "1") @RequestParam(required = true) int page
  ) {
    //
    return mockDocumentStatus;
  }

  @GetMapping("/count")
  @Operation(summary = "기록지/리포트 카운트 조회", description = "미완료된 기록지/리포트 수와 지연된 기록지/리포트 수를 조회합니다. (어드민 페이지 사이드 바)")
  public ApiResponse<DocumentCountResponse> getCareReportCount() {
    return ApiResponse.onSuccess(
        new DocumentCountResponse(
            new CareReportCountResponse(5, 2),
            new CareSheetCountResponse(5, 2)
        )
    );
  }
}
