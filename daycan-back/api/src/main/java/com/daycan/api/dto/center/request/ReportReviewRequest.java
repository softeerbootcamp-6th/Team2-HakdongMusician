package com.daycan.api.dto.center.request;

import com.daycan.domain.entry.document.report.ReportEntry;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record ReportReviewRequest(
    @NotNull Long reportId,

    @Size(max = 3)
    List<ReportEntry> mealEntries,       // 아침·점심·저녁
    List<ReportEntry> physicalEntries,// 신체 활동
    List<ReportEntry> cognitiveEntries,  // 인지 활동

    String mealMemo,
    String healthMemo,
    String physicalMemo,
    String cognitiveMemo
) {
}
