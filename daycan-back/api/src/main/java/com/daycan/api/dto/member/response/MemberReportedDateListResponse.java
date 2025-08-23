package com.daycan.api.dto.member.response;

import java.time.LocalDate;
import java.util.List;

public record MemberReportedDateListResponse(
    List<LocalDate> reportedDates
) {

}
