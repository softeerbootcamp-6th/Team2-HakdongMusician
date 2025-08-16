package com.daycan.service.document;


import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.model.MemberWeeklyScoreView;
import com.daycan.repository.jpa.VitalRepository;
import com.daycan.repository.query.StatisticsQueryRepository;
import java.time.LocalDate;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class VitalService {
  private final VitalRepository vitalRepository;
  private final StatisticsQueryRepository statisticsQueryRepository;

  @Transactional(readOnly = true)
  public Optional<Vital> getByDocumentId(Long documentId) {
    return vitalRepository.findByDocumentId(documentId);
  }

  @Transactional(readOnly = true)
  public MemberWeeklyScoreView getMemberWeeklyScore(Long memberId, LocalDate today) {
    return statisticsQueryRepository.fetchWeeklyHealthScoreAvgs(memberId,today);
  }
}
