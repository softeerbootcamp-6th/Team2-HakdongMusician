package com.daycan.domain.entity;


import com.daycan.common.response.status.MemberErrorStatus;
import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.enums.Gender;
import com.daycan.domain.helper.MemberCommand;

import com.daycan.exceptions.ApplicationException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import java.time.LocalDate;

import lombok.Getter;



@Getter
@Entity
@Table(
    name = "member"
//    ,indexes = {
//        @Index(name = "idx_member_active", columnList = "active")
//    }
)
public class Member extends BaseTimeEntity {

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

  @Column(name = "guardian_birth_date")
  private LocalDate guardianBirthDate;

  @Column(name = "guardian_phone_number")
  private String guardianPhoneNumber;

  @Column(name = "accept_report", nullable = false)
  private Boolean acceptReport = Boolean.FALSE;

  @Column(name = "guardian_avatar_url")
  private String guardianAvatarUrl;

  @Column(name = "organization_id", length = 11, nullable = false)
  private String organizationId;

  @Column(name = "password", length = 100, nullable = false)
  private String password;

  @Column(name = "active", nullable = false)
  private Boolean active = true;

  @Version
  private Long version; // 경합 방지(권장)

  protected Member() {} // JPA

  public void apply(MemberCommand cmd) {
    if (cmd.name() != null) this.name = cmd.name();
    if (cmd.gender() != null) this.gender = cmd.gender();
    if (cmd.birthDate() != null) this.birthDate = cmd.birthDate();
    if (cmd.careLevel() != null) this.careLevel = cmd.careLevel();
    if (cmd.avatarUrl() != null) this.avatarUrl = cmd.avatarUrl();
    if (cmd.guardianName() != null) this.guardianName = cmd.guardianName();
    if (cmd.guardianRelation() != null) this.guardianRelation = cmd.guardianRelation();
    if (cmd.guardianBirthDate() != null) this.guardianBirthDate = cmd.guardianBirthDate();
    if (cmd.guardianPhoneNumber() != null) this.guardianPhoneNumber = cmd.guardianPhoneNumber();
    if (cmd.guardianAvatarUrl() != null) this.guardianAvatarUrl = cmd.guardianAvatarUrl();
    if (cmd.acceptReport() != null) this.acceptReport = cmd.acceptReport();
    if (cmd.hashedPassword() != null) this.password = cmd.hashedPassword();
  }

  public static Member createNew(String username, String organizationId,
      String name, Gender gender, LocalDate birthDate,
      String hashedPassword) {
    if (isBlank(username) || isBlank(organizationId) || isBlank(name) || gender == null || birthDate == null || isBlank(hashedPassword)) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_INVALID_PARAM, "필수 파라미터가 누락되었습니다.");
    }
    Member m = new Member();
    m.username = username;
    m.organizationId = organizationId;
    m.name = name;
    m.gender = gender;
    m.birthDate = birthDate;
    m.password = hashedPassword;
    m.active = Boolean.TRUE;
    return m;
  }

  public void deactivate() {
    this.active = Boolean.FALSE;
  }

  public void reactivateTo(String newOrganizationId) {
    if (isBlank(newOrganizationId)) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_INVALID_PARAM, "organizationId 누락");
    }
    this.organizationId = newOrganizationId;
    this.active = Boolean.TRUE;
  }

  private static boolean isBlank(String v) { return v == null || v.isBlank(); }
}