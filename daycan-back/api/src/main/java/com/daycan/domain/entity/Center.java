package com.daycan.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
@Entity
@Table(name = "center")
public class Center {

  @Id
  @Column(name = "organization_id", length = 11, nullable = false)
  // 장기요양 인증번호
  private String organizationId;

  @Column(name = "name", length = 128)
  private String name;

  @Column(name = "location", length = 128)
  private String location;

  @Column(name = "phone_number", length = 20)
  private String phoneNumber;

  @Column(name = "logo_url", length = 1024)
  private String logoUrl;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @Column(name = "deleted_at")
  private LocalDateTime deletedAt;

  @Column(name = "car_numbers", columnDefinition = "json")
  private String carNumbers; // JSON 필드는 String으로 매핑

  @Column(name = "username", length = 20)
  private String username;

  @Column(name = "password", length = 20)
  private String password;
}
