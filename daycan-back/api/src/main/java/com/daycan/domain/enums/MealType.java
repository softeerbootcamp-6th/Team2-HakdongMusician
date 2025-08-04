package com.daycan.domain.enums;

public enum MealType {
  REGULAR("일반식"),
  PORRIDGE("죽"),
  RICE_WATER("미음");

  private final String kor;

  MealType(String kor) {
    this.kor = kor;
  }

  public String getLabel() {
    return kor;
  }

  public static MealType fromLabel(String kor) {
    for (MealType type : values()) {
      if (type.kor.equals(kor)) {
        return type;
      }
    }
    throw new IllegalArgumentException("Unknown label: " + kor);
  }
}
