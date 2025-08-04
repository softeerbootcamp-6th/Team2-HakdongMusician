package com.daycan.controller.admin;


import com.daycan.dto.admin.response.CenterResponse;
import com.daycan.common.response.ResponseWrapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/center")
@Tag(name = "🏥 센터 관리", description = "관리자용 센터 관련 API")
public class AdminCenterController {

  @GetMapping("/me")
  public ResponseWrapper<CenterResponse> getMemberList() {
    return ResponseWrapper.onSuccess(new CenterResponse(
        "센터 이름",
        "센터 주소",
        "센터 전화번호",
        "센터 소개"
    ));
  }
}
