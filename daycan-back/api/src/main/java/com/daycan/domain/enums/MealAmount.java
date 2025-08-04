package com.daycan.domain.enums;

public enum MealAmount {
  FULL("1인분"),
  MORE_HALF("1/2 이상"),
  LESS_HALF("1/2 이하");

  private final String kor;

  MealAmount(String kor) {
    this.kor = kor;
  }

  public String kor() {
    return kor;
  }

  public static MealAmount fromLabel(String kor) {
    for (MealAmount amount : values()) {
      if (amount.kor.equals(kor)) {
        return amount;
      }
    }
    throw new IllegalArgumentException("Unknown label: " + kor);
  }
}
