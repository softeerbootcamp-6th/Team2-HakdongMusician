package com.daycan.dto;

import com.daycan.dto.member.report.CardFooter;
import java.util.List;

public record FullReportDto(
    Long reportId,
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
    CardFooter CognitiveCardFooter // 카드 푸터 정보, nullable
) {

}
