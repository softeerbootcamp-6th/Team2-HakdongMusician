package com.daycan.domain;

import com.daycan.common.response.status.error.MemberErrorStatus;
import com.daycan.common.exceptions.ApplicationException;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
@MappedSuperclass
public abstract class Account extends BaseTimeEntity {
  @Column(name = "username", length = 20, nullable = false, unique = true, updatable = false)
  protected String username;

  @Column(name = "password", length = 100, nullable = false)
  protected String password;

  @Column(name = "deleted_at")
  protected LocalDateTime deletedAt;

  @Column(name = "active", nullable = false)
  protected Boolean active = Boolean.TRUE;

  protected Account() {}

  public void changePassword(String hashedPassword) {
    if (isBlank(hashedPassword)) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_INVALID_PARAM, "비밀번호는 비어있을 수 없습니다.");
    }
    this.password = hashedPassword;
  }

  public void deactivate() {
    this.active = Boolean.FALSE;
    this.deletedAt = LocalDateTime.now();
  }

  public boolean isActive() {
    return Boolean.TRUE.equals(this.active) && deletedAt == null;
  }

  protected static boolean isBlank(String v) {
    return v == null || v.isBlank();
  }

  public void reactivate() {
    this.active = Boolean.TRUE;
    this.deletedAt = null;
  }

  public abstract boolean equals(Object o);
  public abstract int hashCode();
}

