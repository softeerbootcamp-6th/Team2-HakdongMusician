package com.daycan.auth.dto;

public record LoginResponse(
    String accessToken,
    String refreshToken
) {

}