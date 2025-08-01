package com.daycan.adapter.admin;

import com.daycan.application.admin.dto.UrlResponse;
import com.daycan.common.response.ResponseWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController()
@RequestMapping("/admin/care-sheet")
@Tag(name = "📜 기록지 관리", description = "관리자용 기록지 관련 API")
public class AdminCareSheetController {

  @GetMapping("/download")
  @Operation(summary = "공단 제출용 기록지 파일 다운로드", description = "국민건강보험공단 제출용 기록지 파일(Excel)을 다운로드합니다.")
  public ResponseWrapper<UrlResponse> downloadCareReportFile(
      @RequestParam(required = true) String year,
      @RequestParam(required = true) String month) {
    // TODO presigned URL 생성 후 반환
    return ResponseWrapper.onSuccess(
        new UrlResponse("https://cdn.example.com/excel/care_report_공단제출용.xlsx"));
  }

  @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @Operation(summary = "사진으로 등록", description = "이미지 파일(.jpg, .jpeg, .png)을 업로드하여 수급자를 일괄 등록합니다. 최대 10개까지")
  public ResponseWrapper<Void> createMemberFromExcel(
      @Parameter(description = "이미지 파일 여러 개(.jpg, .jpeg, .png)", required = true)
      @RequestParam("file") MultipartFile[] files) {
    // TODO: 10개 제한
    return ResponseWrapper.onSuccess(null);
  }
}
