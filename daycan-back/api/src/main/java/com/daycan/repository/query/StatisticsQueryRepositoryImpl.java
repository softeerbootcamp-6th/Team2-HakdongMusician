package com.daycan.repository.query;

import static com.daycan.domain.entity.document.QDocument.document;

import com.daycan.domain.entity.document.QDocument;
import com.daycan.domain.entity.document.QVital;
import com.daycan.domain.model.MemberWeeklyScoreView;
import com.daycan.domain.model.VitalSlice;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;


import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StatisticsQueryRepositoryImpl implements StatisticsQueryRepository{
  private final JPAQueryFactory qf;

  QDocument doc = QDocument.document;
  QVital vital = QVital.vital;

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

  @Override
  public List<VitalSlice<LocalDate>> fetchVitalsByDate(Long memberId, LocalDate start, LocalDate end) {
    return qf
        .select(
            doc.date,
            vital.temperature.doubleValue(),
            vital.bloodPressureDiastolic,
            vital.bloodPressureSystolic,
            vital.numberOfStool,
            vital.numberOfUrine,
            vital.healthScore
        )
        .from(doc)
        .leftJoin(vital).on(vital.id.eq(doc.id))
        .where(
            doc.member.id.eq(memberId),
            doc.date.between(start, end)
        )
        .orderBy(doc.date.asc())
        .fetch()
        .stream()
        .map(t -> new VitalSlice<>(
            t.get(doc.date),
            t.get(vital.temperature.doubleValue()),
            t.get(vital.bloodPressureDiastolic),
            t.get(vital.bloodPressureSystolic),
            t.get(vital.numberOfStool),
            t.get(vital.numberOfUrine),
            t.get(vital.healthScore)
        ))
        .toList();
  }
  @Override
  public List<VitalSlice<YearMonth>> fetchVitalsByMonth(Long memberId, YearMonth start, YearMonth end) {
    List<VitalSlice<YearMonth>> out = new ArrayList<>();

    AggAll prev = aggAtAll(memberId, start.minusMonths(1).atEndOfMonth());

    for (YearMonth ym = start; !ym.isAfter(end); ym = ym.plusMonths(1)) {
      LocalDate monthEnd = ym.atEndOfMonth();
      AggAll cur = aggAtAll(memberId, monthEnd);

      int  dCnt   = (int) (cur.cnt - prev.cnt);
      long dSys   = cur.sumSys    - prev.sumSys;
      long dDia   = cur.sumDia    - prev.sumDia;
      long dTempT = cur.sumTempT  - prev.sumTempT;
      long dStool = cur.sumStool  - prev.sumStool;
      long dUrine = cur.sumUrine  - prev.sumUrine;
      long dHsum  = cur.sumHealth - prev.sumHealth;

      Double avgTemp = avgOrNull(dTempT, dCnt);
      if (avgTemp != null) avgTemp /= 10.0;

      out.add(new VitalSlice<>(
          ym,
          avgTemp,
          avgOrNull(dDia,   dCnt),
          avgOrNull(dSys,   dCnt),
          avgOrNull(dStool, dCnt),
          avgOrNull(dUrine, dCnt),
          avgOrNull(dHsum,  dCnt)
      ));

      prev = cur;
    }
    return out;
  }

  private AggAll aggAtAll(Long memberId, LocalDate bound) {
    LocalDate latest = qf
        .select(doc.date.max())
        .from(doc)
        .where(
            doc.member.id.eq(memberId),
            doc.date.loe(bound)
        )
        .fetchOne();

    if (latest == null) return AggAll.ZERO;

    Tuple t = qf.select(
            vital.aggregate.aggCount,
            vital.aggregate.sumSystolic,
            vital.aggregate.sumDiastolic,
            vital.aggregate.sumTemperatureTenths,
            vital.aggregate.sumStool,
            vital.aggregate.sumUrine,
            vital.aggregate.sumHealthScore
        )
        .from(doc)
        .leftJoin(vital).on(vital.id.eq(doc.id))
        .where(
            doc.member.id.eq(memberId),
            doc.date.eq(latest)
        )
        .fetchOne();

    if (t == null) return AggAll.ZERO;

    return new AggAll(
        nz(t.get(vital.aggregate.aggCount)),
        nl(t.get(vital.aggregate.sumSystolic)),
        nl(t.get(vital.aggregate.sumDiastolic)),
        nl(t.get(vital.aggregate.sumTemperatureTenths)),
        nl(t.get(vital.aggregate.sumStool)),
        nl(t.get(vital.aggregate.sumUrine)),
        nl(t.get(vital.aggregate.sumHealthScore))
    );
  }

  private static final class AggAll {
    final long cnt;
    final long sumSys, sumDia, sumTempT, sumStool, sumUrine, sumHealth;

    static final AggAll ZERO = new AggAll(0,0,0,0,0,0,0);

    AggAll(long cnt, long sumSys, long sumDia, long sumTempT,
        long sumStool, long sumUrine, long sumHealth) {
      this.cnt = cnt;
      this.sumSys = sumSys;
      this.sumDia = sumDia;
      this.sumTempT = sumTempT;
      this.sumStool = sumStool;
      this.sumUrine = sumUrine;
      this.sumHealth = sumHealth;
    }
  }

  private static Double avgOrNull(long sumDelta, int cntDelta) {
    return (cntDelta <= 0) ? null : (sumDelta * 1.0) / cntDelta;
  }



  private Agg aggAt(Long memberId, LocalDate bound) {
    Tuple t = qf
        .select(QVital.vital.aggregate.aggCount, QVital.vital.aggregate.sumHealthScore)
        .from(QVital.vital)
        .join(QVital.vital.document, document)
        .where(document.member.id.eq(memberId),
            document.date.loe(bound))
        .orderBy(document.date.desc())
        .limit(1)
        .fetchOne();

    long cnt = (t == null) ? 0L : nz(t.get(QVital.vital.aggregate.aggCount));
    long sum = (t == null) ? 0L : nz(t.get(QVital.vital.aggregate.sumHealthScore));
    return new Agg(cnt, sum);
  }

  private record Agg(long cnt, long sum) {}
  private static long nz(Long v)    { return v == null ? 0L : v; }
  private static Long nz(Integer v) { return v == null ? 0L : v.longValue(); }
  private static Long nl(Long v)    { return v == null ? 0L : v; }

}
