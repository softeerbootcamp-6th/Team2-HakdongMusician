package com.daycan.dto.admin.response;

public record DocumentCountResponse(
    CareReportCountResponse careReport,
    CareSheetCountResponse careSheet
) {

}
