package com.daycan.adapter;

import com.daycan.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("")
@Tag(name = "📜기록지 관리", description = "관리자용 기록지 관련 API")
public class HealthCheckController {

  @GetMapping("")
  public ApiResponse<Void> getCareReportCount() {
    return ApiResponse.OK;
  }
}
