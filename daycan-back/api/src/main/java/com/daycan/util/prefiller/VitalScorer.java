package com.daycan.util.prefiller;

import java.math.BigDecimal;

public final class VitalScorer {
  private VitalScorer() {}

  // 정상 범위(안내용)
  public static final int SYS_NORM_MIN = 90;
  public static final int SYS_NORM_MAX = 120;
  public static final int DIA_NORM_MIN = 60;
  public static final int DIA_NORM_MAX = 80;

  public static final double TEMP_NORM_MIN = 36.0;
  public static final double TEMP_NORM_MAX = 37.5;

  public static final int STOOL_NORM_MIN = 1; // 안내용
  public static final int STOOL_NORM_MAX = 3;
  public static final int URINE_NORM_MIN = 4;
  public static final int URINE_NORM_MAX = 6;

  /* 혈압 점수: 0 / 7 / 15 / 20 (null -> 0) */
  public static int scoreBloodPressure(Integer systolic, Integer diastolic) {
    if (systolic == null || diastolic == null) return 0;
    int sys = systolic;
    int dia = diastolic;

    // 0점: 고혈압(>=140/90) 또는 저혈압(<=90/60)
    if (sys >= 140 || dia >= 90 || sys <= 90 || dia <= 60) return 0;

    // 15점: 수축기 121~129 & 이완기 <= 80
    if (between(sys, 121, 129) && dia <= 80) return 15;

    // 20점: 수축기 <= 120 & 이완기 <= 80
    if (sys <= 120 && dia <= 80) return 20;

    // 7점: 수축기 130~139 OR 이완기 81~89
    if (between(sys, 130, 139) || between(dia, 81, 89)) return 7;

    // 애매 케이스는 보수적으로 7점
    return 7;
  }

  /* 체온 점수: 정상 15 / 비정상 0 (null -> 0) */
  public static int scoreTemperature(Double temperature) {
    if (temperature == null) return 0;
    double t = temperature;
    return (t >= TEMP_NORM_MIN && t <= TEMP_NORM_MAX) ? 15 : 0;
  }
  public static int scoreTemperature(BigDecimal temperature) {
    return scoreTemperature(temperature == null ? null : temperature.doubleValue());
  }

  /* 대변 점수: 3회 이하 10 / 4회 이상 0 (null -> 0) */
  public static int scoreStool(Integer stoolCount) {
    if (stoolCount == null) return 0;
    return (stoolCount >= 4) ? 0 : 10;
  }

  /* 소변 점수: 4~6회 10 / 3회 이하 또는 7회 이상 0 (null -> 0) */
  public static int scoreUrine(Integer urineCount) {
    if (urineCount == null) return 0;
    return (urineCount >= URINE_NORM_MIN && urineCount <= URINE_NORM_MAX) ? 10 : 0;
  }

  /* 합산 */
  public static int totalVital35(Integer systolic, Integer diastolic, Double temperature) {
    return scoreBloodPressure(systolic, diastolic) + scoreTemperature(temperature); // 0~35
  }
  public static int totalExcretion20(Integer stoolCount, Integer urineCount) {
    return scoreStool(stoolCount) + scoreUrine(urineCount); // 0~20
  }

  /* 안내 문구(범위 벗어남 표시) */
  public static String describeBpRelative(Integer systolic, Integer diastolic) {
    if (systolic == null || diastolic == null) return "";
    if (systolic > SYS_NORM_MAX || diastolic > DIA_NORM_MAX) return "정상(90~120/60~80)보다 높음";
    if (systolic < SYS_NORM_MIN || diastolic < DIA_NORM_MIN) return "정상(90~120/60~80)보다 낮음";
    return "";
  }
  public static String describeTempRelative(Double temperature) {
    if (temperature == null) return "";
    if (temperature > TEMP_NORM_MAX) return "정상(36~37.5)보다 높음";
    if (temperature < TEMP_NORM_MIN) return "정상(36~37.5)보다 낮음";
    return "";
  }
  public static String describeStoolRelative(Integer stoolCount) {
    if (stoolCount == null) return "";
    if (stoolCount > STOOL_NORM_MAX) return "정상(대변: 1~3회/소변: 4~6회)보다 높음";
    if (stoolCount < STOOL_NORM_MIN) return "정상(대변: 1~3회/소변: 4~6회)보다 낮음";
    return "";
  }
  public static String describeUrineRelative(Integer urineCount) {
    if (urineCount == null) return "";
    if (urineCount > URINE_NORM_MAX) return "정상(대변: 1~3회/소변: 4~6회)보다 높음";
    if (urineCount < URINE_NORM_MIN) return "정상(대변: 1~3회/소변: 4~6회)보다 낮음";
    return "";
  }

  private static boolean between(int v, int min, int max) {
    return v >= min && v <= max;
  }
}