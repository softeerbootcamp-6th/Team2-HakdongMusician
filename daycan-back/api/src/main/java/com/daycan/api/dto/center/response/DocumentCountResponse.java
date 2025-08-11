package com.daycan.api.dto.center.response;

public record DocumentCountResponse(
    CareReportCountResponse careReport,
    CareSheetCountResponse careSheet
) {

}
