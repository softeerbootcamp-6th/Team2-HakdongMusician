package com.daycan.api.dto.member.request;


import com.daycan.api.dto.entry.document.report.ReportStatus;
import com.daycan.domain.enums.SortDirection;
import com.daycan.api.dto.entry.document.DayFilter;
import java.util.List;

public record ReportQueryParameters(
    DayFilter dayFilter,
    List<ReportStatus> statuses,
    String memberNameLike,
    SortDirection order
) {}
