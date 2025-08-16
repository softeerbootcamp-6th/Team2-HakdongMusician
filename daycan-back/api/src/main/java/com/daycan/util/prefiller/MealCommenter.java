package com.daycan.util.prefiller;

import com.daycan.domain.entity.document.Meal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Random;

public final class MealCommenter {
  private MealCommenter() {}

  private static final String[] C15 = {
      "오늘은 두 끼 모두 식사량이 충분했습니다. 매 끼 절반 이상 드셔서 영양 섭취가 잘 이루어졌어요.",
      "오늘은 아침과 점심 모두 골고루 드셨어요."
  };
  private static final String[] C10 = {
      "오늘은 {충분}만 충분히 드시고 {미흡}은(는) 절반 이하로 드셨어요.",
      "오늘은 {충분}는(은) 잘 드셨는데, {미흡}는(은) 식사량이 부족해요."
  };
  private static final String[] C5 = {
      "오늘은 두 끼 모두 식사를 반도 안하셨어요. 식사 섭취가 평소보다 조금 부족한 상태예요.",
      "아쉽게도 오늘은 두 끼 다 드신 양이 많지 않아요."
  };
  private static final String[] C0 = {
      "식사를 거부하시거나 드신 양이 극히 적어 영양 섭취가 많이 부족해요.",
      "오늘은 두 끼 모두 식사를 거의 하지 않으셨어요.😭"
  };

  public static String comment(Meal breakfast, Meal lunch, Meal dinner,
      String breakfastName, String lunchName, String dinnerName,
      long memberId, LocalDate date) {
    if (date == null) throw new IllegalArgumentException("date is required");

    String bName = orDefault(breakfastName, "아침");
    String lName = orDefault(lunchName, "점심");
    String dName = orDefault(dinnerName, "저녁");

    int bucket = MealScorer.bucketForComment(breakfast, lunch, dinner);
    long seed = Objects.hash("meal-comment", memberId, date, bucket);

    String sufficientNames   = joinNamesBySufficiency(breakfast, bName, lunch, lName, dinner, dName, true);
    String insufficientNames = joinNamesBySufficiency(breakfast, bName, lunch, lName, dinner, dName, false);

    Random r = new Random(seed);
    return switch (bucket) {
      case 15 -> C15[r.nextInt(C15.length)];
      case 10 -> C10[r.nextInt(C10.length)]
          .replace("{충분}", safe(sufficientNames, "한 끼"))
          .replace("{미흡}",  safe(insufficientNames, "나머지 한 끼"));
      case 5  -> C5[r.nextInt(C5.length)];
      case 0  -> C0[r.nextInt(C0.length)];
      default -> "";
    };
  }

  private static String joinNamesBySufficiency(
      Meal b, String bName,
      Meal l, String lName,
      Meal d, String dName,
      boolean wantSufficient) {
    List<String> names = new ArrayList<>(3);
    if (MealScorer.isCountable(b) && (MealScorer.isSufficient(b) == wantSufficient)) names.add(bName);
    if (MealScorer.isCountable(l) && (MealScorer.isSufficient(l) == wantSufficient)) names.add(lName);
    if (MealScorer.isCountable(d) && (MealScorer.isSufficient(d) == wantSufficient)) names.add(dName);
    return String.join("/", names);
  }

  private static String orDefault(String s, String d) {
    return (s == null || s.isBlank()) ? d : s;
  }

  private static String safe(String s, String fallback) {
    return (s == null || s.isBlank()) ? fallback : s;
  }
}

