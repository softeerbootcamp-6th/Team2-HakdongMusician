package com.daycan.domain.enums;

public enum ProgramEvaluation {
  HIGH("상"),
  MEDIUM("중"),
  LOW("하");

  private final String kor;

  ProgramEvaluation(String kor) {
    this.kor = kor;
  }

  public String getKor() {
    return kor;
  }
}
