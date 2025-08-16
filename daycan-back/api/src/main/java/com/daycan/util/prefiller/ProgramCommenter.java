package com.daycan.util.prefiller;

import com.daycan.domain.entity.document.PersonalProgram;
import com.daycan.domain.enums.ProgramType;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Random;

public final class ProgramCommenter {
  private ProgramCommenter() {}

  private static final String[] C15_PHYSICAL = {
      "오늘 활동을 활기차고 즐겁게 참여하셨어요! 신체가 건강해졌어요.",
      "오늘 신체 활동 프로그램에 잘 참여해 주셨어요. {이름}을 칭찬해주세요."
  };
  private static final String[] C15_COGNITIVE = {
      "오늘 활동을 적극적으로 참여하셨어요! 인지 기능이 활발해졌어요.",
      "오늘 인지 활동 프로그램에 잘 참여해 주셨어요. {이름}을 칭찬해주세요."
  };

  private static final String[] C10 = {
      "특별한 어려움 없이 프로그램을 함께하셨어요.",
      "오늘도 안정적으로 프로그램에 참여하셨어요."
  };
  private static final String[] C5 = {
      "오늘은 조금 힘드셨지만 끝까지 함께하셨어요.",
      "어려움이 있었지만 꾸준히 노력하셨어요."
  };
  private static final String[] C0 = {
      "오늘은 프로그램에 참여하지 않고 편안하게 쉬셔서 기록이 없어요."
  };

  /** 섹션(타입) 전체용 고정랜덤 코멘트 */
  public static String comment(List<PersonalProgram> programs,
      ProgramType type,
      long memberId,
      LocalDate date,
      String name) {
    if (date == null) throw new IllegalArgumentException("date is required");
    if (type == null) throw new IllegalArgumentException("type is required");

    int score = ProgramScorer.scoreForType(programs, type);
    return commentFromScore(type, score, memberId, date, name);
  }

  public static String commentFromScore(ProgramType type,
      int score,
      long memberId,
      LocalDate date,
      String name) {
    if (date == null) throw new IllegalArgumentException("date is required");
    if (type == null) throw new IllegalArgumentException("type is required");

    int bucket = ProgramScorer.bucket(score);
    String n = (name == null || name.isBlank()) ? "000님" : name + "님";
    long seed = Objects.hash("program-comment", memberId, date, type.name(), bucket);
    Random r = new Random(seed);

    return switch (bucket) {
      case 15 -> pick15ByType(type, r).replace("{이름}", n);
      case 10 -> C10[r.nextInt(C10.length)];
      case 5  -> C5[r.nextInt(C5.length)];
      case 0  -> C0[r.nextInt(C0.length)];
      default -> "";
    };
  }


  private static String decorateWithActivity(String base, String activity) {
    if (base == null || base.isBlank()) return "(" + activity + ")";
    return base + " (활동: " + activity + ")";
  }

  private static String pick15ByType(ProgramType type, Random r) {
    return switch (type) {
      case PHYSICAL  -> C15_PHYSICAL[r.nextInt(C15_PHYSICAL.length)];
      case COGNITIVE -> C15_COGNITIVE[r.nextInt(C15_COGNITIVE.length)];
    };
  }
}