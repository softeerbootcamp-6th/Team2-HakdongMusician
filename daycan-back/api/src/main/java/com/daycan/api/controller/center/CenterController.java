package com.daycan.api.controller.center;


import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.CenterDetails;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.entity.Center;
import com.daycan.api.dto.center.response.centermanage.CenterResponse;
import com.daycan.service.center.CenterService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/center")
@RequiredArgsConstructor
@Tag(name = "\uD83C\uDFE5 센터 관리", description = "관리자용 센터 관련 API")
public class CenterController {

  private final CenterService centerService;


  @GetMapping("/me")
  public ResponseWrapper<CenterResponse> getCenterInfo(
      @AuthenticatedUser CenterDetails centerDetails
  ) {
    Center center = centerDetails.getCenter();
    CenterResponse centerResponse = centerService.getCenterInfo(center.getId());
    return ResponseWrapper.onSuccess(centerResponse);
  }
}
