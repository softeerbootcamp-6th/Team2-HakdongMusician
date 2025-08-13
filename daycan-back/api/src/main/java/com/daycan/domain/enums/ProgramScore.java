package com.daycan.domain.enums;

import lombok.Getter;

@Getter
public enum ProgramScore {
  HIGH("상"),
  MEDIUM("중"),
  LOW("하");

  private final String kor;

  ProgramScore(String kor) {
    this.kor = kor;
  }

}
