package com.daycan.api.dto.common;

import com.daycan.domain.entry.document.report.ReportEntry;
import com.daycan.domain.entry.document.report.CardFooter;
import java.time.LocalDate;
import java.util.List;

public record FullReportDto(
    LocalDate date,
    Integer totalScore,
    Integer changeAmount,
    Integer mealScore,
    Integer healthScore,
    Integer physicalScore,
    Integer cognitiveScore,
    List<ReportEntry> mealEntries,
    CardFooter mealCardFooter, // 카드 푸터 정보, nullable
    List<ReportEntry> healthEntries,
    CardFooter healthCardFooter, // 카드 푸터 정보, nullable
    List<ReportEntry> physicalEntries,
    CardFooter physicalCardFooter, // 카드 푸터 정보, nullable
    List<ReportEntry> cognitiveEntries,
    CardFooter cognitiveCardFooter // 카드 푸터 정보, nullable
) {

}
