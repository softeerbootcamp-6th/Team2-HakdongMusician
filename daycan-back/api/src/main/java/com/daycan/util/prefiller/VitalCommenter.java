package com.daycan.util.prefiller;

public final class VitalCommenter {

  private VitalCommenter() {
  }

  public static String warningCommentBp(Integer systolic, Integer diastolic) {
    if (systolic == null || diastolic == null) return "측정 없음";
    if (systolic <= 0 || diastolic <= 0) return "측정 오류";

    int sys = systolic;
    int dia = diastolic;

    if (sys >= 180 || dia >= 120) return "고혈압 위기, 병원 방문 필요";
    if (sys >= 140 || dia >= 90)   return "고혈압 2단계 의심";
    if (sys >= 130 || dia >= 80)   return "고혈압 1단계 의심";
    if (sys >= 120 && dia < 80)    return "상승 경향";
    if (sys < 90 || dia < 60)      return "저혈압 의심";
    return "";
  }

  public static String warningCommentTemp(Double temperature) {
    if (temperature == null) return "측정 없음";
    if (temperature <= 0.0) return "측정 오류";

    double temp = temperature;

    if (temp >= 38.5) return "고열, 병원 방문 필요";
    if (temp >= 37.5) return "발열, 주의 필요";
    if (temp < 36.0)  return "저체온 의심";
    return "";
  }

  public static String commentBpTemp(Integer systolic, Integer diastolic, Double temperature,
      String name) {
    int bp = VitalScorer.scoreBloodPressure(systolic, diastolic); // 0/7/15/20
    int tp = VitalScorer.scoreTemperature(temperature); // 0/15
    return commentBpTempFromScores(bp, tp, name);
  }

  public static String commentBpTempFromScores(int bpScore, int tempScore, String name) {
    name = (name == null || name.isBlank()) ? "000님" : name + "님";
    int bp = clamp(bpScore, 0, 20);
    int tp = clamp(tempScore, 0, 15);

    if (bp == 20 && tp == 15) {
      return "오늘은 혈압과 체온 모두 정상으로 " + name + "의 건강 상태가 매우 양호해요.";
    }
    if (bp == 20 && tp == 0) {
      return "혈압은 정상이나, 체온이 비정상 범위여서 건강에 신경 써주세요.";
    }
    if (bp == 15 && tp == 15) {
      return "혈압이 정상보다 다소 높게 측정되어 주의가 필요하지만, 체온은 정상이에요.";
    }
    if (bp == 7 && tp == 15) {
      return "혈압이 정상 범위를 벗어나 관리가 필요하지만, 체온은 정상이에요.";
    }
    if (bp == 0 && tp == 15) {
      return "체온은 정상이지만, 혈압 수치가 비정상적으로 측정되어 " + name + "의 건강에 주의가 필요해요.";
    }
    if (bp == 15 && tp == 0) {
      return "혈압과 체온 모두 정상 범위에서 벗어나 있어 " + name + "의 건강 상태에 주의가 필요해요.";
    }
    if (bp == 7 && tp == 0) {
      return "혈압과 체온 모두 정상 범위가 아니어서 " + name + "의 건강을 꼼꼼히 살펴봐주세요.";
    }
    return "혈압과 체온 모두 비정상적으로 측정되어 추가적인 건강 관리가 필요해요.";
  }

  public static String commentExcretion(Integer stoolCount, Integer urineCount) {
    int stool = VitalScorer.scoreStool(stoolCount); // 10/0
    int urine = VitalScorer.scoreUrine(urineCount); // 10/0

    if (stool == 10 && urine == 10) {
      return "배변과 배뇨 모두 정상 범위예요.";
    } else if (stool == 0 && urine == 10) {
      String detail = VitalScorer.describeStoolRelative(stoolCount);
      return "배변 횟수가 정상 범위를 벗어났어요." + suffix(detail);
    } else if (stool == 10 && urine == 0) {
      String detail = VitalScorer.describeUrineRelative(urineCount);
      return "배뇨 횟수가 정상 범위를 벗어났어요." + suffix(detail);
    } else {
      String d1 = VitalScorer.describeStoolRelative(stoolCount);
      String d2 = VitalScorer.describeUrineRelative(urineCount);
      String tail = joinNonEmpty(d1, d2, " / ");
      return "배변과 배뇨 모두 정상 범위를 벗어났어요." + (tail.isEmpty() ? "" : " " + tail);
    }
  }

  private static String suffix(String s) {
    return (s == null || s.isBlank()) ? "" : " " + s;
  }

  private static String joinNonEmpty(String a, String b, String sep) {
    boolean ae = (a == null || a.isBlank());
    boolean be = (b == null || b.isBlank());
    if (ae && be) {
      return "";
    }
    if (ae) {
      return b;
    }
    if (be) {
      return a;
    }
    return a + sep + b;
  }

  private static int clamp(int v, int min, int max) {
    return Math.max(min, Math.min(max, v));
  }
}
