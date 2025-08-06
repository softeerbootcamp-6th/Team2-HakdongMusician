package com.daycan.service;

import com.daycan.domain.entity.CareReport;

import com.daycan.domain.entity.ProgramComment;
import com.daycan.dto.FullReportDto;
import com.daycan.dto.ReportEntry;
import com.daycan.dto.member.report.CardFooter;
import com.daycan.repository.CareReportRepository;
import com.daycan.utils.ReportEntryMapper;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class CareReportService {

  private final CareReportRepository reportRepo;

  // API 메인 메서드
  @Transactional(readOnly = true)
  public FullReportDto getReport(Long reportId) {

    /* current + previous 한 번에 조회 (Vital 페치 포함) */
//    List<CareReport> pair =
//        reportRepo.findTop2ByIdLessThanEqualOrderByIdDesc(reportId);
//
//    if (pair.isEmpty()) {
//      throw new EntityNotFoundException("report " + reportId);
//    }
//    CareReport current  = pair.get(0);
//    CareReport previous = pair.size() > 1 ? pair.get(1) : null;

    CareReport current = reportRepo.findById(reportId)
        .orElseThrow(() -> new EntityNotFoundException("report " + reportId));

    int totalScore   = totalScore(current);
    int changeAmount = totalScore - 1;

    /* ── 섹션별 구성 ── */
    SectionBundle meal      = buildMealSection(current);
    SectionBundle health    = buildHealthSection(current);
    SectionBundle physical  = buildProgramSection(
        current.getPhysicalProgramComments(),
        current.getPhysicalScore(),
        current.getPhysicalFooterComment());
    SectionBundle cognitive = buildProgramSection(
        current.getCognitiveProgramComments(),
        current.getCognitiveScore(),
        current.getCognitiveFooterComment());

    return assembleDto(
        current.getId(),
        totalScore,
        changeAmount,
        meal,
        health,
        physical,
        cognitive
    );
  }

  // private helpers

  /** 총점 */
  private int totalScore(CareReport r) {
    return r.getMealScore() + r.getVitalScore()
        + r.getPhysicalScore() + r.getCognitiveScore();
  }

  /** 식사 섹션 */
  private SectionBundle buildMealSection(CareReport r) {
    return new SectionBundle(
        ReportEntryMapper.mealEntries(r),
        CardFooter.of(r.getMealScore(), r.getMealFooterComment())
    );
  }

  /** 건강 섹션 */
  private SectionBundle buildHealthSection(CareReport r) {
    return new SectionBundle(
        ReportEntryMapper.healthEntries(r),
        CardFooter.of(r.getVitalScore(), r.getHealthFooterComment())
    );
  }

  /** 프로그램(인지·신체) 공통 */
  private SectionBundle buildProgramSection(
      List<ProgramComment> programs, int score, String footerMemo) {

    return new SectionBundle(
        ReportEntryMapper.programEntries(programs),
        CardFooter.of(score, footerMemo)
    );
  }

  /** DTO 조립 */
  private FullReportDto assembleDto(
      Long reportId,
      int total,
      int change,
      SectionBundle meal,
      SectionBundle health,
      SectionBundle physical,
      SectionBundle cognitive) {

    return new FullReportDto(
        reportId,
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

  /* ===============================================================
   *  내부 전용 DTO – 섹션 묶음
   * =============================================================== */
  private record SectionBundle(
      List<ReportEntry> entries,
      CardFooter footer
  ) {}
}
