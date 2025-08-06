package com.daycan.auth.model;

import com.daycan.domain.entity.Member;
import lombok.Getter;

@Getter
public class MemberDetails extends UserDetails {

  private final Member member;

  public MemberDetails(Member member) {
    this.member = member;
    this.username = member.getUsername();
    this.userType = UserType.MEMBER;
  }

  @Override
  public String getUniqueIdentifier() {
    return "MEMBER:" + username;
  }
}
