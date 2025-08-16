package com.daycan.domain.model;

import java.util.List;

public record CareReportInit(
    int mealScore,
    String mealFooterComment,

    int vitalScore,
    String healthFooterComment,

    List<String> cognitiveProgramNames,
    int cognitiveScore,
    String cognitiveFooterComment,

    List<String> physicalProgramNames,
    int physicalScore,
    String physicalFooterComment
) {}

