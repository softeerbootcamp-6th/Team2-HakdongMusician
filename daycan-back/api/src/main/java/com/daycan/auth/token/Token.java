package com.daycan.auth.token;

import com.daycan.auth.AuthException;
import com.daycan.common.response.status.AuthErrorStatus;
import java.util.Date;
import lombok.Value;

public record Token(String value, Date expiry) {
  public boolean isExpired() {
    return expiry.before(new Date());
  }
}

