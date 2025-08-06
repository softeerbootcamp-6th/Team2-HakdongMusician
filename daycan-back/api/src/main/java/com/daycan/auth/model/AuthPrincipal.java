package com.daycan.auth.model;

import lombok.Getter;

@Getter
public abstract class AuthPrincipal {

  protected String username;
  protected String role;      // ex: "CENTER", "GUARDIAN"
  protected String userType;  // ex: "CENTER", "GUARDIAN"

  public abstract String getUniqueIdentifier(); // JWT subject
}

