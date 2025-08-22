package com.daycan.util.prefiller;


import com.daycan.domain.entity.document.Meal;
import com.daycan.domain.enums.MealAmount;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public final class MealScorer {
  private static final int MAX_SCORE = 15;
  private static final double BASE_MEALS = 2.0;

  private MealScorer() {}

  /** 0~15점. provided=true & amount!=null 만 집계. 제공된 끼가 0이면 0점 */
  public static int score0to15(Collection<Meal> meals) {
    if (meals == null || meals.isEmpty()) return 0;

    double sumW = 0.0;
    int provided = 0;

    for (Meal m : meals) {
      if (m == null || !m.isProvided()) continue;
      MealAmount amt = m.getAmount();
      if (amt == null) continue;

      sumW += amt.weight(); // FULL/MORE_HALF=1.0, LESS_HALF=1/3.0
      provided++;
    }
    if (provided == 0) return 0;

    double raw = (sumW / BASE_MEALS) * MAX_SCORE; // 2끼 기준 정규화
    return clamp((int) Math.round(raw), 0, MAX_SCORE);
  }

  public static int score0to15(Meal... meals) {
    if (meals == null) return 0;
    List<Meal> list = new ArrayList<>(meals.length);
    for (Meal m : meals) if (m != null) list.add(m);
    return score0to15(list);
  }

  /** 코멘트용 버킷(0/5/10/15) */
  public static int bucketForComment(Collection<Meal> meals) {
    return bucket(score0to15(meals));
  }
  public static int bucketForComment(Meal... meals) {
    return bucket(score0to15(meals));
  }

  /** 0~15 정수 점수를 0/5/10/15 버킷으로 매핑 */
  public static int bucket(int score) {
    int s = clamp(score, 0, MAX_SCORE);
    if (s >= 13) return 15;
    if (s >= 8)  return 10;
    if (s >= 3)  return 5;
    return 0;
  }

  static boolean isCountable(Meal m) {
    return m != null && m.isProvided() && m.getAmount() != null;
  }

  static boolean isSufficient(Meal m) {
    return m.getAmount().weight() >= 1.0; // FULL/MORE_HALF
  }

  private static int clamp(int v, int min, int max) {
    return Math.max(min, Math.min(max, v));
  }
}