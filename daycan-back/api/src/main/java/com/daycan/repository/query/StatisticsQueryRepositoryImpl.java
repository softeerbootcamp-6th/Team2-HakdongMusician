package com.daycan.repository.query;

import static com.daycan.domain.entity.document.QDocument.document;
import static com.daycan.domain.entity.document.QVital.vital;
import com.daycan.domain.model.MemberWeeklyScoreView;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;


import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StatisticsQueryRepositoryImpl implements StatisticsQueryRepository{
  private final JPAQueryFactory qf;

  @Override
  public MemberWeeklyScoreView fetchWeeklyHealthScoreAvgs(Long memberId, LocalDate today) {
    LocalDate d0  = today;
    LocalDate d7  = today.minusDays(7);
    LocalDate d14 = today.minusDays(14);

    Agg a0  = aggAt(memberId, d0);
    Agg a7  = aggAt(memberId, d7);
    Agg a14 = aggAt(memberId, d14);

    long wSum = a0.sum - a7.sum;   long wCnt = a0.cnt - a7.cnt;   // 이번 주: D-6..D
    long pSum = a7.sum - a14.sum;  long pCnt = a7.cnt - a14.cnt;  // 지난 주: D-13..D-7

    int weeklyAvg   = wCnt == 0 ? 0 : (int)Math.round((double) wSum / wCnt);
    int lastWeekAvg = pCnt == 0 ? 0 : (int)Math.round((double) pSum / pCnt);

    return new MemberWeeklyScoreView(weeklyAvg, lastWeekAvg);
  }

  // 경계일 <= 의 최신 Vital 한 건에서 임베디드 누적값(aggCount, sumHealthScore)만 집계
  private Agg aggAt(Long memberId, LocalDate bound) {
    Tuple t = qf
        .select(vital.aggregate.aggCount, vital.aggregate.sumHealthScore)
        .from(vital)
        .join(vital.document, document)
        .where(document.member.id.eq(memberId),
            document.date.loe(bound))
        .orderBy(document.date.desc())
        .limit(1)
        .fetchOne();

    long cnt = (t == null) ? 0L : nz(t.get(vital.aggregate.aggCount));
    long sum = (t == null) ? 0L : nz(t.get(vital.aggregate.sumHealthScore));
    return new Agg(cnt, sum);
  }

  private record Agg(long cnt, long sum) {}
  private static long nz(Integer v) { return v == null ? 0L : v.longValue(); }
  private static long nz(Long v)    { return v == null ? 0L : v; }


}
