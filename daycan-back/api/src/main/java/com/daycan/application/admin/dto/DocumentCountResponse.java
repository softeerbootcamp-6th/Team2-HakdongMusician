package com.daycan.application.admin.dto;

public record DocumentCountResponse(
    CareReportCountResponse careReport,
    CareSheetCountResponse careSheet
) {

}
