package com.daycan.adapter.admin;

import com.daycan.application.admin.dto.CareReportCountResponse;
import com.daycan.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/care-sheet")
@Tag(name = "📜 기록지 관리", description = "관리자용 기록지 관련 API")
public class AdminCareSheetController {

  @GetMapping("/count")
  @Operation(summary = "기록지 카운트 조회", description = "미완료된 기록지 수와 지연된 기록지 수를 조회합니다.")
  public ApiResponse<CareReportCountResponse> getCareReportCount() {
    return ApiResponse.onSuccess(new CareReportCountResponse(5, 2));
  }

  @GetMapping("/download")
  @Operation(summary = "공단 제출용 기록지 파일 다운로드", description = "국민건강보험공단 제출용 기록지 파일(Excel)을 다운로드합니다.")
  public ApiResponse<String> downloadCareReportFile(
      @RequestParam(required = true) String year,
      @RequestParam(required = true) String month) {
    // file을 바로 다운로드?
    return ApiResponse.onSuccess("https://cdn.example.com/excel/care_report_공단제출용.xlsx");
  }
}
