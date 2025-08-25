package com.daycan.api.dto.member.response;

import com.daycan.domain.entity.Member;
import com.daycan.domain.enums.Gender;

public record MemberHomeResponse(
    String name,
    Gender gender,
    String guardianName,
    String avatarUrl,
    Boolean isReportArrived, // 안읽었으면 true
    Integer weeklyScore,
    Integer weeklyChangeAmount
) {

  public static MemberHomeResponse of(
      Member member, String url,
      Boolean isReportArrived , int weeklyScore, int lastWeekScore
  ) {
    return new MemberHomeResponse(
        member.getName(),
        member.getGender(),
        member.getGuardianName(),
        url,
        isReportArrived,
        weeklyScore,
        weeklyScore - lastWeekScore
    );
  }

  public static MemberHomeResponse ofEmpty(
      Member member, String url
  ) {
    return new MemberHomeResponse(
        member.getName(),
        member.getGender(),
        member.getGuardianName(),
        url,
        false,null, null
    );
  }
}
