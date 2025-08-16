package com.daycan.domain.model;

public record MemberWeeklyScoreView(
    int weeklyAvg,     // 이번 주 평균
    int lastWeekAvg    // 지난 주 평균
) {

}
