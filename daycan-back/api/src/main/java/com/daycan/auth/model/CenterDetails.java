package com.daycan.auth.model;

import com.daycan.domain.entity.Center;
import lombok.Getter;

@Getter
public class CenterDetails extends UserDetails {

  private final Center center;

  public CenterDetails(Center center) {
    this.center = center;
    this.username = center.getUsername();
    this.userType = UserType.CENTER;
  }

  @Override
  public String getUniqueIdentifier() {
    return "CENTER:" + username;
  }
}


