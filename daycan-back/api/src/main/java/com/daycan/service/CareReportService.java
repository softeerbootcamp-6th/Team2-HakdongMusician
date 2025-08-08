package com.daycan.service;

import com.daycan.exceptions.ApplicationException;
import com.daycan.common.response.status.DocumentErrorStatus;
import com.daycan.domain.entity.CareReport;

import com.daycan.domain.helper.ProgramComment;
import com.daycan.dto.FullReportDto;
import com.daycan.dto.entry.ReportEntry;
import com.daycan.dto.member.report.CardFooter;
import com.daycan.repository.CareReportRepository;
import com.daycan.utils.ReportEntryMapper;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class CareReportService {

  private final CareReportRepository reportRepo;

  // API 메인 메서드
  @Transactional(readOnly = true)
  public FullReportDto getReport(String username, LocalDate date) {

    List<CareReport> pair = reportRepo
        .findTop2ByMemberIdAndDateBeforeEqualOrderByDateDesc(username, date, PageRequest.of(0, 2));

    if (pair.isEmpty()) {
      throw new ApplicationException(DocumentErrorStatus.REPORT_NOT_FOUND);
    }
    CareReport current = pair.get(0);
    int totalScore = totalScore(current);

    Integer changeAmount = pair.size() > 1 ? scoreChangeAmount(current, pair.get(1)) : null;

    /* ── 섹션별 구성 ── */
    SectionBundle meal = buildMealSection(current);

    SectionBundle health = buildHealthSection(current);

    SectionBundle physical = buildProgramSection(
        current.getPhysicalProgramComments(),
        current.getPhysicalScore(),
        current.getPhysicalFooterComment());

    SectionBundle cognitive = buildProgramSection(
        current.getCognitiveProgramComments(),
        current.getCognitiveScore(),
        current.getCognitiveFooterComment());

    return assembleDto(
        totalScore,
        changeAmount,
        meal,
        health,
        physical,
        cognitive
    );
  }

  // private helpers

  /**
   * 총점
   */
  private int totalScore(CareReport r) {
    return r.getMealScore() + r.getVitalScore()
        + r.getPhysicalScore() + r.getCognitiveScore();
  }

  /**
   * 식사 섹션
   */
  private SectionBundle buildMealSection(CareReport r) {
    return new SectionBundle(
        ReportEntryMapper.mealEntries(r),
        CardFooter.of(r.getMealScore(), r.getMealFooterComment())
    );
  }

  /**
   * 건강 섹션
   */
  private SectionBundle buildHealthSection(CareReport r) {
    return new SectionBundle(
        ReportEntryMapper.healthEntries(r),
        CardFooter.of(r.getVitalScore(), r.getHealthFooterComment())
    );
  }

  /**
   * 프로그램(인지·신체) 공통
   */
  private SectionBundle buildProgramSection(
      List<ProgramComment> programs, int score, String footerMemo) {

    return new SectionBundle(
        ReportEntryMapper.programEntries(programs),
        CardFooter.of(score, footerMemo)
    );
  }

  /**
   * DTO 조립
   */
  private FullReportDto assembleDto(
      Integer total,
      Integer change,
      SectionBundle meal,
      SectionBundle health,
      SectionBundle physical,
      SectionBundle cognitive) {

    return new FullReportDto(
        total,
        change,
        meal.footer().score(),
        health.footer().score(),
        physical.footer().score(),
        cognitive.footer().score(),

        meal.entries(),
        meal.footer(),
        health.entries(),
        health.footer(),
        physical.entries(),
        physical.footer(),
        cognitive.entries(),
        cognitive.footer()
    );
  }

  private Integer scoreChangeAmount(CareReport current, CareReport previous) {
    if (previous == null) {
      return null; // 이전 리포트가 없으면 변화량은 null
    }
    return totalScore(current) - totalScore(previous);
  }


  // 내부 DTO – 섹션 묶음
  private record SectionBundle(
      List<ReportEntry> entries,
      CardFooter footer
  ) {

  }
}
