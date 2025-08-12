package com.daycan.api.dto.center.request;


import com.daycan.domain.entry.document.report.ReportStatus;

import java.util.List;

public record ReportQueryParameters(
    List<ReportStatus> statuses,
    String memberNameLike) {}
