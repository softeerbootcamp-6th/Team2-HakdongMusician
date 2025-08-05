package com.daycan.auth;

public class CenterPrincipal extends AuthPrincipal {
  public CenterPrincipal(String username) {
    this.username = username;
    this.role = "CENTER";
    this.userType = "CENTER";
  }

  @Override
  public String getUniqueIdentifier() {
    return "CENTER:" + username;
  }
}

