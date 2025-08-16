package com.daycan.domain.model;

import java.time.temporal.Temporal;

public record VitalSlice<T extends Temporal>(
    T axis,
    Number temperature,
    Number diastolic,
    Number systolic,
    Number defecationCount,
    Number urinationCount,
    Number healthScore
) {}

