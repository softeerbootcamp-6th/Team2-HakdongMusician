package com.daycan.auth;

public class MemberPrincipal extends AuthPrincipal {
  public MemberPrincipal(String username) {
    this.username = username;
    this.role = "MEMBER";
    this.userType = "MEMBER";
  }

  @Override
  public String getUniqueIdentifier() {
    return "MEMBER:" + username;
  }
}
