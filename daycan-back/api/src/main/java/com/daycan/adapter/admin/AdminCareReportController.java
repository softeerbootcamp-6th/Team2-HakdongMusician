package com.daycan.adapter.admin;

import com.daycan.application.admin.dto.CareReportCountResponse;
import com.daycan.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/care-report")
@Tag(name = "📋 리포트 관리", description = "관리자용 리포트 관련 API")
public class AdminCareReportController {

  @GetMapping("/count")
  @Operation(summary = "리포트 카운트 조회", description = "미완료된 리포트 수와 지연된 리포트 수를 조회합니다.")
  public ApiResponse<CareReportCountResponse> getCareReportCount() {
    return ApiResponse.onSuccess(new CareReportCountResponse(5, 2));
  }

  
}
