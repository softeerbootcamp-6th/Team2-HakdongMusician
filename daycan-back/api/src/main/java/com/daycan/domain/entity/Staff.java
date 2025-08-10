package com.daycan.domain.entity;

import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.StaffRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(
    name = "staff",
    indexes = {
        @Index(name = "idx_staff_center", columnList = "center_id")
    }
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Staff extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String name;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Gender gender;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private StaffRole staffRole;

  private LocalDate birthDate;

  @Column(length = 20)
  private String phoneNumber;

  private String avatarUrl;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "center_id", nullable = false, updatable = false)
  private Center center;

  @Builder
  public Staff(
      String name,
      Gender gender,
      StaffRole staffRole,
      LocalDate birthDate,
      String phoneNumber,
      String avatarUrl,
      Center center) {
    this.name = name;
    this.gender = gender;
    this.staffRole = staffRole;
    this.birthDate = birthDate;
    this.phoneNumber = phoneNumber;
    this.avatarUrl = avatarUrl;
    this.center = center;
  }

  public Staff update(
      String name,
      Gender gender,
      StaffRole staffRole,
      LocalDate birthDate,
      String phoneNumber,
      String avatarUrl
  ) {
    if (name != null) {
      this.name = name;
    }
    if (gender != null) {
      this.gender = gender;
    }
    if (staffRole != null) {
      this.staffRole = staffRole;
    }
    if (birthDate != null) {
      this.birthDate = birthDate;
    }
    if (phoneNumber != null) {
      this.phoneNumber = phoneNumber;
    }
    if (avatarUrl != null) {
      this.avatarUrl = avatarUrl;
    }
    return this;
  }


}
