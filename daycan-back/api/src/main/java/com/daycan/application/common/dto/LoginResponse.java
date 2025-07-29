package com.daycan.application.common.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "로그인 응답 DTO")
public record LoginResponse(
    @Schema(description = "access token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    String accessToken,

    @Schema(description = "refresh token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    String refreshToken
) {
  public static LoginResponse of(String accessToken, String refreshToken) {
    return LoginResponse.builder()
        .accessToken(accessToken)
        .refreshToken(refreshToken)
        .build();
  }
}
