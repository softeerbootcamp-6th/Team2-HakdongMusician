package com.daycan.adapter.member;

import com.daycan.application.admin.dto.CareReportCountResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/member/care-sheet")
@Tag(name = "📜기록지 관리", description = "관리자용 기록지 관련 API")
public class CareSheetController {

  @GetMapping("/count")
  @Operation(summary = "기록지 카운트 조회", description = "미완료된 기록지 수와 지연된 기록지 수를 조회합니다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "조회 성공"),
      @ApiResponse(responseCode = "500", description = "서버 오류")
  })
  public ResponseEntity<CareReportCountResponse> getCareReportCount() {
    return ResponseEntity.ok(new CareReportCountResponse(5, 2));
  }
}
