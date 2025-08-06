package com.daycan.domain.entity;


import com.daycan.domain.enums.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "member")
public class Member {

  /**
   * 장기요양인정번호 (PK)
   */
  @Id
  @Column(name = "username", length = 11, nullable = false)
  private String username;

  @Column(name = "name", nullable = false)
  private String name;

  @Enumerated(EnumType.STRING)
  @Column(name = "gender", nullable = false)
  private Gender gender;

  @Column(name = "birth_date")
  private LocalDate birthDate;

  @Column(name = "care_level")
  private Integer careLevel;

  @Column(name = "avatar_url")
  private String avatarUrl;

  @Column(name = "guardian_name")
  private String guardianName;

  @Column(name = "guardian_relation")
  private String guardianRelation;

  @Column(name = "guardian_relation_birth_date")
  private LocalDate guardianRelationBirthDate;

  @Column(name = "guardian_phone_number")
  private String guardianPhoneNumber;

  @Column(name = "accept_report")
  private Boolean acceptReport;

  @Column(name = "guardian_avatar_url")
  private String guardianAvatarUrl;

  @Column(name = "organization_id", length = 11, nullable = false)
  private String organizationId;

  @Column(name = "password", length = 100, nullable = false)
  private String password;

  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @Column(name = "deleted_at")
  private LocalDateTime deletedAt;
}