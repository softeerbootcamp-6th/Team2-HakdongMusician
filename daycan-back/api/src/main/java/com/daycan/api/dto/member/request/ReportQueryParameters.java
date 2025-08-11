package com.daycan.api.dto.member.request;


import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.enums.SortDirection;
import com.daycan.api.dto.entry.document.DayFilter;
import com.daycan.api.dto.validation.annotations.ReportStatusesOnly;
import java.util.List;

public record ReportQueryParameters(
    DayFilter dayFilter,
    @ReportStatusesOnly
    List<DocumentStatus> statuses,
    String memberNameLike,
    SortDirection order
) {}
