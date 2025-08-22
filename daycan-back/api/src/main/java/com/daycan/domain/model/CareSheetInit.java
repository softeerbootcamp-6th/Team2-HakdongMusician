package com.daycan.domain.model;

import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.document.Document;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.entity.document.VitalAggregate;

public record CareSheetInit(
    Document doc,
    boolean isNew,
    Staff staff,
    Member member,
    VitalAggregate prevAgg,
    boolean hasFollowingVital
) { }


