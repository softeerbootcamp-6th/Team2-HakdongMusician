package com.daycan.domain.entity;

import com.daycan.common.response.status.MemberErrorStatus;
import com.daycan.domain.Account;
import com.daycan.exceptions.ApplicationException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;

@Getter
@Entity
@Table(
    name = "center",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_center_code", columnNames = {"center_code"})
    }
)
public class Center extends Account {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "center_code", length = 11, nullable = false, updatable = false)
  private String centerCode; // 비즈니스 식별자

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
  private String username; // 센터 로그인 계정(있다면)

  protected Center() {}

  public static Center createNew(String centerCode, String hashedPassword) {
    if (isBlank(centerCode) || isBlank(hashedPassword)) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_INVALID_PARAM, "필수 파라미터가 누락되었습니다.");
    }
    Center c = new Center();
    c.centerCode = centerCode;
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
