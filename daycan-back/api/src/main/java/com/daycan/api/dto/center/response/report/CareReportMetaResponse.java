package com.daycan.api.dto.center.response.report;

import com.daycan.domain.entry.document.report.ReportStatus;
import com.daycan.domain.entry.member.GuardianMetaEntry;
import com.daycan.domain.entry.member.MemberMetaEntry;

public record CareReportMetaResponse(
    Long id,
    MemberMetaEntry memberMetaEntry,
    GuardianMetaEntry guardianMetaEntry,
    ReportStatus status
) {

}
