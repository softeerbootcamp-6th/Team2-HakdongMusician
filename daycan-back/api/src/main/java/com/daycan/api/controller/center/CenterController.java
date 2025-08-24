package com.daycan.api.controller.center;


import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.dto.PasswordRequest;
import com.daycan.auth.model.CenterDetails;
import com.daycan.auth.service.AuthService;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.entity.Center;
import com.daycan.api.dto.center.response.centermanage.CenterResponse;
import com.daycan.service.center.CenterService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/center")
@RequiredArgsConstructor
@Validated
@Tag(name = "\uD83C\uDFE5 센터 관리", description = "관리자용 센터 관련 API")
public class CenterController {

  private final CenterService centerService;
  private final AuthService authService;


  @GetMapping("/me")
  public ResponseWrapper<CenterResponse> getCenterInfo(
      @AuthenticatedUser CenterDetails centerDetails
  ) {
    Center center = centerDetails.getCenter();
    CenterResponse centerResponse = centerService.getCenterInfo(center.getId());
    return ResponseWrapper.onSuccess(centerResponse);
  }

  @PostMapping("/verify-password")
  public ResponseWrapper<Void> verifyPassword(
      @AuthenticatedUser CenterDetails centerDetails,
      @Valid @RequestBody PasswordRequest request
  ) {
    authService.verifyPassword(centerDetails, request.password());
    return ResponseWrapper.onSuccess(null);
  }
}
