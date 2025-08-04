package com.daycan.domain.enums;

public enum ProgramType {
  PHYSICAL("신체"),
  COGNITIVE("인지");

  private final String kor;

  ProgramType(String kor) {
    this.kor = kor;
  }

  public String getKor() {
    return kor;
  }
}

