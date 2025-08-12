package com.daycan.api.dto.center.response;

import com.daycan.domain.entry.document.sheet.MealSupport;
import com.daycan.api.dto.member.response.report.HealthSupportResponse;
import com.daycan.api.dto.member.response.report.ProgramSupportResponse;
import java.util.List;

public record CareReportResponse(
    MealSupport mealSupport,
    HealthSupportResponse healthSupport,
    List<ProgramSupportResponse> programSupports
 ) {

}
