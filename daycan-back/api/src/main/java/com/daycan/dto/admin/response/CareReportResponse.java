package com.daycan.dto.admin.response;

import com.daycan.dto.admin.entry.MealSupport;
import com.daycan.dto.member.report.HealthSupportResponse;
import com.daycan.dto.member.report.ProgramSupportResponse;
import java.util.List;

public record CareReportResponse(
    MealSupport mealSupport,
    HealthSupportResponse healthSupport,
    List<ProgramSupportResponse> programSupports
 ) {

}
