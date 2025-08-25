package com.daycan.util.resolver;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public final class MessageResolver {
  private static final String CLIENT_URL = "https://www.daycan.kr";
  // 보호자 이름, 날짜, 수급자(환자) 이름
  private static final String DEFAULT_MESSAGE_FORMAT = "안녕하세요 %s님, %s %s님의 리포트입니다.\n열람: %s";
  private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("yyyy년 M월 d일(E)", Locale.KOREAN);

  private MessageResolver() {}

  /**
   * 문자 본문 생성
   * @param guardianName 보호자/수신자 이름
   * @param memberName   수급자(환자) 이름
   * @param reportDate   리포트 날짜
   */
  public static String resolveReportMessage(String guardianName,
      String memberName,
      LocalDate reportDate) {
    String dateStr = reportDate.format(DATE_FMT);
    String link = CLIENT_URL + "/reports?rid=";
    return String.format(DEFAULT_MESSAGE_FORMAT, nz(guardianName), dateStr, nz(memberName), link);
  }

  private static String nz(String s) { return (s == null ? "" : s); }
}

