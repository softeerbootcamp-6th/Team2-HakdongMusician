package com.daycan.repository.query;

import com.daycan.domain.model.MemberWeeklyScoreView;
import java.time.LocalDate;

public interface StatisticsQueryRepository {
  MemberWeeklyScoreView fetchWeeklyHealthScoreAvgs(Long memberId, LocalDate today);

}
