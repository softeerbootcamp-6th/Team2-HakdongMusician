package com.daycan.auth.payload;

import com.daycan.auth.UserType;

public record LoginRequest(
    String username,
    String password,
    UserType userType
) {}


