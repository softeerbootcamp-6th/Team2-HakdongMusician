package com.daycan.api.dto.member.response;

import com.daycan.domain.entity.Member;
import com.daycan.domain.enums.Gender;

public record MemberHomeResponse(
    String name,
    Gender gender,
    String guardianName,
    String avatarUrl,
    boolean isReportArrived, // 안읽었으면 true
    int weeklyScore,
    int weeklyChangeAmount
) {

  public static MemberHomeResponse of(
      Member member, String url,
      boolean opened, int weeklyScore, int lastWeekScore
  ) {
    return new MemberHomeResponse(
        member.getName(),
        member.getGender(),
        member.getGuardianName(),
        url,
        !opened,
        weeklyScore,
        weeklyScore - lastWeekScore
    );
  }
}
