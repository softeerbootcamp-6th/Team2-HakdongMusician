package com.daycan.auth.model;

import com.daycan.domain.entity.Center;
import com.daycan.domain.entity.Member;
import lombok.Getter;

public class MemberDetails extends UserDetails<Member> {

  private final Member member;

  public MemberDetails(Member member) {
    this.member = member;
    this.username = member.getUsername();
    this.userType = UserType.MEMBER;
  }

  @Override
  public String getPassword() {
    return member.getPassword();
  }
  @Override
  public String getUniqueIdentifier() {
    return "MEMBER:" + username;
  }

  @Override
  public Member getEntity() {
    return member;
  }

  public Member getMember() {
    return this.getEntity();
  }
}
