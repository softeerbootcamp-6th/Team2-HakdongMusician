package com.daycan.adapter.member;

import com.daycan.application.common.dto.LoginRequest;
import com.daycan.application.common.dto.LoginResponse;
import io.swagger.v3.oas.annotations.Operation;
import com.daycan.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member/auth")
@Tag(name = "🔐 보호자 인증 API", description = "보호자 계정의 로그인/로그아웃/재발급을 처리합니다.")
public class MemberAuthController {

  @PostMapping("/login")
  @Operation(
      summary = "Member Auth Login",
      description = "보호자 계정 로그인 API 입니다."
  )
  public ApiResponse<LoginResponse> login(
      @RequestBody LoginRequest loginRequest
  ) {
    return ApiResponse.onSuccess(
        LoginResponse.of(
            "mockAccessToken",
            "mockRefreshToken"
        )
    );
  }

  @PostMapping("/logout")
  @Operation(
      summary = "Member Auth Logout",
      description = "보호자 계정 로그아웃 API 입니다."
  )
  public ApiResponse<Void> logout() {

    return ApiResponse.onSuccess(null);
  }

  @PostMapping("/reissue")
  @Operation(
      summary = "Member Auth Reissue",
      description = "보호자 계정 토큰 재발급 API 입니다."
  )
  public ApiResponse<LoginResponse> reissue(){
    return ApiResponse.onSuccess(
        LoginResponse.of(
            "mockAccessToken",
            "mockRefreshToken"
        )
    );
  }
}
