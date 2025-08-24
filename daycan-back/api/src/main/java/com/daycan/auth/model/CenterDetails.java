package com.daycan.auth.model;

import com.daycan.domain.entity.Center;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
public class CenterDetails extends UserDetails {

  private final Center center;

  public CenterDetails(Center center) {
    this.center = center;
    this.username = center.getCenterCode();
    this.userType = UserType.CENTER;
  }

  @Override
  public String getPassword() {
    return center.getPassword();
  }

  @Override
  public String getUniqueIdentifier() {
    return "CENTER:" + username;
  }
}


