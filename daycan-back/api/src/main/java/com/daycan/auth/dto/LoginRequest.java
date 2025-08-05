package com.daycan.auth.dto;

import com.daycan.auth.model.UserType;

public record LoginRequest(
    String username,
    String password,
    UserType userType
) {}


