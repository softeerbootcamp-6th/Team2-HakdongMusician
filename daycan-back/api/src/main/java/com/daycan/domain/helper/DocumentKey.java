package com.daycan.domain.helper;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import lombok.Getter;

@Getter
@Embeddable
public class DocumentKey implements Serializable {

  @Column(name = "member_id", nullable = false, updatable = false, length = 20)
  private String memberId;

  @Column(name = "date", nullable = false, updatable = false)
  private LocalDate date;

  protected DocumentKey() {} // JPA 기본 생성자

  public static DocumentKey of(String memberId, LocalDate date) {
    return new DocumentKey(memberId, date);
  }

  private DocumentKey(String memberId, LocalDate date) {
    this.memberId = memberId;
    this.date = date;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof DocumentKey that)) return false;
    return Objects.equals(memberId, that.memberId) &&
        Objects.equals(date, that.date);
  }

  @Override
  public int hashCode() {
    return Objects.hash(memberId, date);
  }

  @Override
  public String toString() {
    return date + ":" + memberId;
  }
}
