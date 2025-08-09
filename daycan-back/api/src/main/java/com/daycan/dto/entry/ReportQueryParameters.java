package com.daycan.dto.entry;


import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.enums.SortDirection;
import com.daycan.dto.admin.request.DayFilter;
import com.daycan.dto.validation.annotations.ReportStatusesOnly;
import java.util.List;

public record ReportQueryParameters(
    DayFilter dayFilter,
    @ReportStatusesOnly
    List<DocumentStatus> statuses,
    String memberNameLike,
    SortDirection order
) {}
