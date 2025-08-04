package com.daycan.dto.admin.request;


import com.daycan.domain.enums.CareReportStatus;
import com.daycan.domain.enums.SortDirection;
import java.util.List;

public record ReportQueryParameters(
    DayFilter dayFilter,            // TODAY / DELAYED
    List<CareReportStatus> statuses,        // 다중 선택 가능

    String memberNameLike,
    SortDirection order                 // ASC / DESC (default DESC)
) {

}
