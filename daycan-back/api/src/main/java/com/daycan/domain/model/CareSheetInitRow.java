package com.daycan.domain.model;

import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.entity.document.Document;
import com.querydsl.core.annotations.QueryProjection;

public record CareSheetInitRow(
    Document doc,
    Boolean isNew,
    Staff staff,
    Member member,
    Integer prevAggCount,
    Long prevSumSystolic,
    Long prevSumDiastolic,
    Long prevSumTemperatureTenths,
    Long prevSumStool,
    Long prevSumUrine,
    Long prevSumHealthScore,
    Boolean hasFollowingVital
) {
  @QueryProjection
  public CareSheetInitRow{}
}
