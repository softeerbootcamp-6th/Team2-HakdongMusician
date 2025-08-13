package com.daycan.service.document;

import com.daycan.common.response.status.error.MemberErrorStatus;
import com.daycan.domain.entity.Member;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.entity.document.CareReport;

import com.daycan.domain.entry.ProgramComment;
import com.daycan.api.dto.common.FullReportDto;
import com.daycan.domain.entry.document.report.ReportEntry;
import com.daycan.domain.entry.document.report.CardFooter;
import com.daycan.repository.jpa.CareReportRepository;
import com.daycan.repository.jpa.MemberRepository;
import com.daycan.util.mapper.ReportEntryMapper;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Slf4j
public class CareReportService {

  private final CareReportRepository reportRepo;
  private final MemberRepository memberRepository;

  @Transactional(readOnly = true)
  public FullReportDto getReport(String username, LocalDate date) {

    Long memberId = memberRepository.findByUsername(username)
        .map(Member::getId)
        .orElseThrow(() -> new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND, username));

    // 최신 2건
    List<CareReport> pair = reportRepo.findTopByMemberAndDateBeforeEq(
        memberId, date, PageRequest.of(0, 2));

    if (pair.isEmpty()) {
      throw new ApplicationException(DocumentErrorStatus.REPORT_NOT_FOUND);
    }

    CareReport current = pair.get(0);
    int totalScore = totalScore(current);
    Integer changeAmount = pair.size() > 1 ? scoreChangeAmount(current, pair.get(1)) : null;

    SectionBundle meal = buildMealSection(current);
    SectionBundle health = buildHealthSection(current);
    SectionBundle physical = buildProgramSection(
        current.getPhysicalProgramComments(), current.getPhysicalScore(), current.getPhysicalFooterComment());
    SectionBundle cognitive = buildProgramSection(
        current.getCognitiveProgramComments(), current.getCognitiveScore(), current.getCognitiveFooterComment());

    return assembleDto(totalScore, changeAmount, meal, health, physical, cognitive);
  }

  // 이하 기존 private helpers 동일 …
  private int totalScore(CareReport r) {
    return r.getMealScore() + r.getVitalScore() + r.getPhysicalScore() + r.getCognitiveScore();
  }
  private Integer scoreChangeAmount(CareReport current, CareReport previous) {
    return previous == null ? null : totalScore(current) - totalScore(previous);
  }
  private SectionBundle buildMealSection(CareReport r) {
    return new SectionBundle(ReportEntryMapper.mealEntries(r), CardFooter.of(r.getMealScore(), r.getMealFooterComment()));
  }
  private SectionBundle buildHealthSection(CareReport r) {
    return new SectionBundle(ReportEntryMapper.healthEntries(r), CardFooter.of(r.getVitalScore(), r.getHealthFooterComment()));
  }
  private SectionBundle buildProgramSection(List<ProgramComment> programs, int score, String footerMemo) {
    return new SectionBundle(ReportEntryMapper.programEntries(programs), CardFooter.of(score, footerMemo));
  }
  private FullReportDto assembleDto(Integer total, Integer change, SectionBundle meal, SectionBundle health,
      SectionBundle physical, SectionBundle cognitive) {
    return new FullReportDto(
        total, change,
        meal.footer().score(), health.footer().score(), physical.footer().score(), cognitive.footer().score(),
        meal.entries(), meal.footer(),
        health.entries(), health.footer(),
        physical.entries(), physical.footer(),
        cognitive.entries(), cognitive.footer()
    );
  }
  private record SectionBundle(List<ReportEntry> entries, CardFooter footer) {}
}
