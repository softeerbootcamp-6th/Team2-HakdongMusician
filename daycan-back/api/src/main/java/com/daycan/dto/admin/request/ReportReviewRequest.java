package com.daycan.dto.admin.request;

import com.daycan.dto.ReportEntry;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record ReportReviewRequest(
    @NotNull Long reportId,


    List<ReportEntry> mealEntries,       // 아침·점심·저녁
    List<ReportEntry> physicalEntries,   // 신체 활동
    List<ReportEntry> cognitiveEntries,  // 인지 활동

    String mealMemo,
    String healthMemo,
    String physicalMemo,
    String cognitiveMemo
) {
}
