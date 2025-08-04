package com.daycan.dto.admin.request;

public enum DayFilter {
  TODAY("오늘 마감"),
  DELAYED("작성 지연")
  ;

  private final String kor;

  DayFilter(String kor) {
    this.kor = kor;
  }

  public String kor(){
    return kor;
  }

}
