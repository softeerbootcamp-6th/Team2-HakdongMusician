package com.daycan.repository.query;

import com.daycan.domain.model.MemberWeeklyScoreView;
import com.daycan.domain.model.VitalSlice;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

public interface StatisticsQueryRepository {
  MemberWeeklyScoreView fetchWeeklyHealthScoreAvgs(Long memberId, LocalDate today);

  List<VitalSlice<LocalDate>> fetchVitalsByDate(Long memberId, LocalDate start, LocalDate end);

  List<VitalSlice<YearMonth>> fetchVitalsByMonth(Long memberId, YearMonth start, YearMonth end);
}
