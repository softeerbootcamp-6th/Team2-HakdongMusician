package com.daycan.util.prefiller;

import com.daycan.domain.entity.document.PersonalProgram;
import com.daycan.domain.enums.ProgramScore;
import com.daycan.domain.enums.ProgramType;
import java.util.List;
import java.util.Objects;

public final class ProgramScorer {
  private ProgramScorer() {}

  public static int scorePhysical(List<PersonalProgram> programs) {
    return scoreForType(programs, ProgramType.PHYSICAL);
  }

  public static int scoreCognitive(List<PersonalProgram> programs) {
    return scoreForType(programs, ProgramType.COGNITIVE);
  }

  public static int scoreForType(List<PersonalProgram> programs, ProgramType targetType) {
    if (programs == null || programs.isEmpty() || targetType == null) return 0;

    int sum = 0;
    int cnt = 0;

    for (PersonalProgram p : programs) {
      if (p == null) continue;
      if (p.getType() != targetType) continue;
      ProgramScore s = p.getScore();
      if (s == null) continue;

      sum += mapScore(s); // HIGH=15, MEDIUM=10, LOW=5
      cnt++;
    }
    if (cnt == 0) return 0;

    int rounded = (int)Math.round(sum / (double)cnt);
    return clamp(rounded, 0, 15);
  }

  public static int bucket(int score) {
    int s = clamp(score, 0, 15);
    if (s >= 13) return 15;
    if (s >= 8)  return 10;
    if (s >= 3)  return 5;
    return 0;
  }

  private static int mapScore(ProgramScore s) {
    return switch (Objects.requireNonNull(s)) {
      case HIGH   -> 15;
      case MEDIUM -> 10;
      case LOW    -> 5;
    };
  }

  private static int clamp(int v, int min, int max) {
    return Math.max(min, Math.min(max, v));
  }
}
