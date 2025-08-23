package com.daycan.domain.model;

import com.querydsl.core.types.SubQueryExpression;

public record PrevAggSubs(
    SubQueryExpression<Integer> prevAggCount,
                           SubQueryExpression<Long> prevSumSystolic,
                           SubQueryExpression<Long> prevSumDiastolic,
                           SubQueryExpression<Long> prevSumTempT,
                           SubQueryExpression<Long> prevSumStool,
                           SubQueryExpression<Long> prevSumUrine,
                           SubQueryExpression<Long> prevSumHealthScore) {

}