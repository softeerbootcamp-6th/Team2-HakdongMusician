package com.daycan.api.dto.member.response;

import com.daycan.api.dto.common.FullReportDto;
import com.daycan.domain.enums.Gender;

public record MemberReportResponse(
    String memberName,
    Gender gender,
    FullReportDto fullReportDto
) {

}
