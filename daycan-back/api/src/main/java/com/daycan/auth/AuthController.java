package com.daycan.auth;

import com.daycan.auth.dto.LoginRequest;
import com.daycan.auth.dto.LoginResponse;
import com.daycan.auth.dto.ReissueRequest;
import com.daycan.auth.service.AuthService;
import com.daycan.common.response.ResponseWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  @Operation(
      summary = "로그인",
      description = "아이디, 비밀번호, 사용자 유형(CENTER or MEMBER)으로 로그인합니다. "
          + "응답으로 Access Token과 Refresh Token을 반환합니다.",
      responses = {
          @ApiResponse(responseCode = "200", description = "로그인 성공"),
          @ApiResponse(responseCode = "401", description = "잘못된 인증 정보")
      }
  )
  @PostMapping("/login")
  public void loginMock(@RequestBody LoginRequest request) {
    throw new UnsupportedOperationException("필터에서 처리됩니다.");
  }

  @PostMapping("/reissue")
  public ResponseWrapper<LoginResponse> reissue(
      @Valid @RequestBody ReissueRequest request,
      @RequestHeader("Authorization") String accessToken) {

    String rawAccessToken = extractToken(accessToken);

    LoginResponse response = authService.reissue(request.refreshToken(), rawAccessToken);
    return ResponseWrapper.onSuccess(response);
  }

  private String extractToken(String bearer) {
    if (bearer == null || !bearer.startsWith("Bearer ")) {
      throw new IllegalArgumentException("잘못된 인증 헤더 형식입니다.");
    }
    return bearer.substring(7);
  }

}
