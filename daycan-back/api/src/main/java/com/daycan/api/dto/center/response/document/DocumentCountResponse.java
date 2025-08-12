package com.daycan.api.dto.center.response.document;

import com.daycan.api.dto.center.response.report.CareReportCountResponse;
import com.daycan.api.dto.center.response.sheet.CareSheetCountResponse;

public record DocumentCountResponse(
    CareReportCountResponse careReport,
    CareSheetCountResponse careSheet
) {

}
