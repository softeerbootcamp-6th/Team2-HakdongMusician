package com.daycan.domain.enums;

public enum MealAmount {
  FULL(1.0),        // 충분
  MORE_HALF(1.0),   // 충분(절반 이상)
  LESS_HALF(1.0 / 3.0); // 부족(절반 미만 취급)

  private final double weight;

  MealAmount(double weight) { this.weight = weight; }

  public double weight() { return weight; }
}
