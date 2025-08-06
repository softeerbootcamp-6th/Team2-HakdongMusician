package com.daycan.auth;

import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.UserDetails;
import com.daycan.auth.model.UserType;
import com.daycan.auth.service.AuthService;
import com.daycan.auth.security.JwtTokenProvider;
import com.daycan.auth.service.TokenService;
import com.daycan.auth.dto.LoginResponse;
import com.daycan.auth.dto.ReissueRequest;
import com.daycan.common.response.ResponseWrapper;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/example")
@RequiredArgsConstructor
public class AuthExampleController {

  private final AuthService authService;
  private final TokenService tokenService;
  private final JwtTokenProvider jwtTokenProvider;

  /* -------------------------------------------------------------
     1) 데모용 로그인 (고정 계정)
     ------------------------------------------------------------- */
  @GetMapping("/login")
  public ResponseWrapper<LoginResponse> mockLogin() {

    // ① 사용자 인증
    UserDetails principal =
        authService.authenticate("123456", "1234", UserType.CENTER);

    // ② Access / Refresh 토큰 한 번에 발급 & 저장
    LoginResponse tokens = authService.issueTokens(principal);

    return ResponseWrapper.onSuccess(tokens);
  }

  /* -------------------------------------------------------------
     2) 내 정보 조회  (Authorization: Bearer <access> 필요)
     ------------------------------------------------------------- */
  @SecurityRequirement(name = "Authorization")
  @GetMapping("/me")
  public ResponseWrapper<String> getMyInfo(@AuthenticatedUser UserDetails principal) {

    String msg = "Hello %s (%s)".formatted(
        principal.getUsername(), principal.getUserType());

    return ResponseWrapper.onSuccess(msg);
  }

  /* -------------------------------------------------------------
     3) 토큰 재발급 (RTR)
        └ Header: Authorization: Bearer <old-access>
        └ Body: { "refreshToken": "<refresh>" }
     ------------------------------------------------------------- */
  @PostMapping("/reissue")
  public ResponseWrapper<LoginResponse> reissueToken(
      @RequestHeader("Authorization") String bearerAccessToken,
      @RequestBody ReissueRequest req          // ↓ DTO 로 명확히 받기
  ) {
    String oldAccess = bearerAccessToken.replace("Bearer ", "");
    String refresh = req.refreshToken();

    LoginResponse newTokens = tokenService.reissue(refresh, oldAccess);

    return ResponseWrapper.onSuccess(newTokens);
  }
}