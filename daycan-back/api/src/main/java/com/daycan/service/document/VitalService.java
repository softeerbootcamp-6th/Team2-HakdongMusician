package com.daycan.service.document;


import com.daycan.api.dto.member.response.MemberStatisticsResponse;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.common.response.status.error.StatisticsErrorStatus;
import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.entry.statistics.DailyHealthStatisticsEntry;
import com.daycan.domain.entry.statistics.MonthlyHealthStatisticsEntry;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.MemberWeeklyScoreView;
import com.daycan.domain.model.VitalSeries;
import com.daycan.domain.model.VitalSlice;
import com.daycan.repository.jpa.VitalRepository;
import com.daycan.repository.query.StatisticsQueryRepository;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
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

  public MemberWeeklyScoreView getMemberWeeklyScore(Long memberId, LocalDate today) {
    return statisticsQueryRepository.fetchWeeklyHealthScoreAvgs(
        memberId, today, DocumentStatus.finished());
  }

  @Transactional(readOnly = true, propagation = Propagation.MANDATORY)
  public Integer getOverallScore(Member member, LocalDate date) {
    Vital vital = vitalRepository.findByDocument_Member_idAndDocument_Date(member.getId(), date)
        .orElseThrow(() -> new ApplicationException(DocumentErrorStatus.DOCUMENT_NOT_FOUND));

    if (!vital.getDocument().getMember().equals(member)) {
      throw new ApplicationException(DocumentErrorStatus.INVALID_DOCUMENT_ACCESS);
    }
    return vital.getHealthScore();
  }

  public MemberStatisticsResponse getVitals(Long memberId, LocalDate start, LocalDate end) {
    validateRange(start, end);

    List<VitalSlice<LocalDate>> rows =
        statisticsQueryRepository.fetchVitalsByDate(memberId, start, end, DocumentStatus.finished());

    VitalSeries series = aggregate(rows);
    return toResponse(series);
  }


  public MemberStatisticsResponse getVitals(Long memberId, YearMonth start, YearMonth end) {
    validateRange(start, end);

    List<VitalSlice<YearMonth>> rows =
        statisticsQueryRepository.fetchVitalsByMonth(memberId, start, end);

    VitalSeries<YearMonth> series = aggregateMonth(rows);

    return new MemberStatisticsResponse(
        toMonthlyEntry(series.score()),
        toMonthlyEntry(series.temp()),
        toMonthlyEntry(series.dia()),
        toMonthlyEntry(series.sys()),
        toMonthlyEntry(series.fec()),
        toMonthlyEntry(series.uri())
    );
  }

  private void validateRange(LocalDate start, LocalDate end) {
    if (start == null || end == null || start.isAfter(end) || start.plusYears(1).isBefore(end)) {
      throw new ApplicationException(StatisticsErrorStatus.INVALID_DATE_RANGE);
    }
  }

  private VitalSeries<LocalDate> aggregate(List<VitalSlice<LocalDate>> rows) {
    Map<LocalDate, Number> temp = new LinkedHashMap<>();
    Map<LocalDate, Number> dia = new LinkedHashMap<>();
    Map<LocalDate, Number> sys = new LinkedHashMap<>();
    Map<LocalDate, Number> fec = new LinkedHashMap<>();
    Map<LocalDate, Number> uri = new LinkedHashMap<>();
    Map<LocalDate, Number> sc = new LinkedHashMap<>();

    for (VitalSlice<LocalDate> r : rows) {
      LocalDate d = r.axis();
      putIfNotNull(temp, d, r.temperature());
      putIfNotNull(dia, d, r.diastolic());
      putIfNotNull(sys, d, r.systolic());
      putIfNotNull(fec, d, r.defecationCount());
      putIfNotNull(uri, d, r.urinationCount());
      putIfNotNull(sc, d, r.healthScore());
    }
    return new VitalSeries<>(sc, temp, dia, sys, fec, uri);
  }

  private MemberStatisticsResponse toResponse(VitalSeries<LocalDate> s) {
    return new MemberStatisticsResponse(
        toEntry(s.score()),
        toEntry(s.temp()),
        toEntry(s.dia()),
        toEntry(s.sys()),
        toEntry(s.fec()),
        toEntry(s.uri())
    );
  }

  private DailyHealthStatisticsEntry toEntry(Map<LocalDate, Number> m) {
    double avg = m.values().stream()
        .filter(Objects::nonNull)
        .mapToDouble(Number::doubleValue)
        .average()
        .orElse(Double.NaN);
    return new DailyHealthStatisticsEntry(m, avg);
  }

  private <K, V> void putIfNotNull(Map<K, V> map, K key, V value) {
    if (value != null) {
      map.put(key, value);
    }
  }

  private <K> void putIfNotNull(Map<K, Number> map, K key, Double value) {
    if (value != null && !value.isNaN() && Double.isFinite(value)) {
      map.put(key, value);
    }
  }

  private void validateRange(YearMonth start, YearMonth end) {
    if (start == null || end == null || start.isAfter(end) || start.plusYears(1).isBefore(end)) {
      throw new ApplicationException(StatisticsErrorStatus.INVALID_DATE_RANGE);
    }
  }

  private VitalSeries<YearMonth> aggregateMonth(List<VitalSlice<YearMonth>> rows) {
    Map<YearMonth, Number> temp = new LinkedHashMap<>();
    Map<YearMonth, Number> dia = new LinkedHashMap<>();
    Map<YearMonth, Number> sys = new LinkedHashMap<>();
    Map<YearMonth, Number> fec = new LinkedHashMap<>();
    Map<YearMonth, Number> uri = new LinkedHashMap<>();
    Map<YearMonth, Number> sc = new LinkedHashMap<>();

    for (VitalSlice<YearMonth> r : rows) {
      YearMonth m = r.axis();
      putIfNotNull(temp, m, r.temperature());
      putIfNotNull(dia, m, r.diastolic());
      putIfNotNull(sys, m, r.systolic());
      putIfNotNull(fec, m, r.defecationCount());
      putIfNotNull(uri, m, r.urinationCount());
      putIfNotNull(sc, m, r.healthScore());
    }
    return new VitalSeries<>(sc, temp, dia, sys, fec, uri);
  }

  private MonthlyHealthStatisticsEntry toMonthlyEntry(Map<YearMonth, Number> m) {
    double avg = m.values().stream()
        .filter(Objects::nonNull)
        .mapToDouble(Number::doubleValue)
        .average()
        .orElse(Double.NaN);
    return new MonthlyHealthStatisticsEntry(m, avg);
  }
}
