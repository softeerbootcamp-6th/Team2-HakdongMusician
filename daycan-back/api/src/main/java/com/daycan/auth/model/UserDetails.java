package com.daycan.auth.model;

import lombok.Getter;

@Getter
public abstract class UserDetails {

  protected String username;
  protected UserType userType;

  public abstract String getUniqueIdentifier(); // JWT subject
}

