package com.daycan.domain.entity;


import com.daycan.common.response.status.MemberErrorStatus;
import com.daycan.domain.Account;
import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.enums.Gender;
import com.daycan.domain.entry.MemberCommand;

import com.daycan.exceptions.ApplicationException;
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
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Version;
import java.time.LocalDate;

import lombok.Getter;



@Getter
@Entity
@Table(
    name = "member",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_member_username", columnNames = {"username"})
    },
    indexes = {
        @Index(name = "idx_member_center", columnList = "center_id"),
        @Index(name = "idx_member_active", columnList = "active")
    }
)
public class Member extends Account {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "username", length = 20, nullable = false)
  private String username; // 전역 유니크(정규화 저장)

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "center_id", nullable = false)
  private Center center; // 소속 센터(1:1 전제)

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

  @Version
  private Long version;

  protected Member() {}

  public static Member createNew(String username,
      Center center,
      String name, Gender gender, LocalDate birthDate,
      String hashedPassword) {
    if (isBlank(username) || center == null || isBlank(name) || gender == null || birthDate == null || isBlank(hashedPassword)) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_INVALID_PARAM, "필수 파라미터가 누락되었습니다.");
    }
    Member m = new Member();
    m.username = username;            // 정규화된 값 전달 전제
    m.center = center;
    m.name = name;
    m.gender = gender;
    m.birthDate = birthDate;
    m.changePassword(hashedPassword); // Account 메서드
    m.active = Boolean.TRUE;
    return m;
  }

  public void changeCenter(Center newCenter) {
    if (newCenter == null) throw new ApplicationException(MemberErrorStatus.MEMBER_INVALID_PARAM, "center 누락");
    this.center = newCenter;
  }

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
    if (cmd.hashedPassword() != null) this.changePassword(cmd.hashedPassword());
  }
}