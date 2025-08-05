package com.daycan.auth.payload;

public record LoginResponse(
    String accessToken,
    String refreshToken
) {}