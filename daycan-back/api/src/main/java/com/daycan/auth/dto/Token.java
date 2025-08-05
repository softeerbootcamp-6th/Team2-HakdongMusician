package com.daycan.auth.dto;

import java.util.Date;

public record Token(String value, Date expiry) {
  public boolean isExpired() {
    return expiry.before(new Date());
  }
}

