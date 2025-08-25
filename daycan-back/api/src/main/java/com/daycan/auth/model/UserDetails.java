package com.daycan.auth.model;

import lombok.Getter;

@Getter
public abstract class UserDetails<T> {

  protected String username;
  protected UserType userType;

  public abstract String getUniqueIdentifier(); // JWT subject

  public abstract String getPassword();

  public abstract T getEntity();
}

