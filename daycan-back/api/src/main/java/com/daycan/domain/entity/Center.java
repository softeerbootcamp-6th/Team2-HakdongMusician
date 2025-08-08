package com.daycan.domain.entity;

import com.daycan.common.response.status.MemberErrorStatus;
import com.daycan.domain.Account;
import com.daycan.exceptions.ApplicationException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Getter
@Entity
@Table(name = "center")
public class Center extends Account {

  @Id
  @Column(name = "organization_id", length = 11, nullable = false, updatable = false)
  private String organizationId;

  @Column(name = "name", length = 128)
  private String name;

  @Column(name = "location", length = 128)
  private String location;

  @Column(name = "phone_number", length = 20)
  private String phoneNumber;

  @Column(name = "logo_url", length = 1024)
  private String logoUrl;

  @Column(name = "car_numbers", columnDefinition = "json")
  private String carNumbers;

  @Column(name = "username", length = 20)
  private String username;

  public static Center createNew(String organizationId, String hashedPassword) {
    if (isBlank(organizationId) || isBlank(hashedPassword)) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_INVALID_PARAM, "필수 파라미터가 누락되었습니다.");
    }
    Center c = new Center();
    c.organizationId = organizationId;
    c.changePassword(hashedPassword);
    c.active = Boolean.TRUE;
    return c;
  }

  public void updateCenterInfo(String name, String location, String phoneNumber,
      String logoUrl, String carNumbers, String username) {
    if (name != null) this.name = name;
    if (location != null) this.location = location;
    if (phoneNumber != null) this.phoneNumber = phoneNumber;
    if (logoUrl != null) this.logoUrl = logoUrl;
    if (carNumbers != null) this.carNumbers = carNumbers;
    if (username != null) this.username = username;
  }
}
