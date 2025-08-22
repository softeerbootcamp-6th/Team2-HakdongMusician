package com.daycan.service.document;

import com.daycan.api.dto.center.request.ReportReviewRequest;
import com.daycan.common.response.status.error.MemberErrorStatus;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.entity.document.CareReport;

import com.daycan.domain.entry.ProgramComment;
import com.daycan.api.dto.common.FullReportDto;
import com.daycan.domain.entry.document.report.ReportEntry;
import com.daycan.domain.entry.document.report.CardFooter;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.ReportReview;
import com.daycan.domain.model.ReportWithDto;
import com.daycan.repository.jpa.CareReportRepository;
import com.daycan.repository.jpa.MemberRepository;
import com.daycan.util.resolver.ReportEntryResolver;
import com.daycan.util.resolver.ReportReviewAssembler;
import java.time.LocalDate;
import java.util.List;
import java.util.function.Supplier;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Slf4j
public class CareReportService {

  private final CareReportRepository careReportRepository;
  private final MemberRepository memberRepository;

  @Transactional(readOnly = true)
  public ReportWithDto getReport(Long memberId, LocalDate date) {
    if (!memberRepository.existsById(memberId)) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND);
    }
    return buildFromPair(() ->
        careReportRepository.findTopByMemberAndDateBeforeEq(
            memberId, date, PageRequest.of(0, 2)));
  }

  @Transactional(readOnly = true)
  public ReportWithDto getReport(Long documentId) {
    return buildFromPair(() ->
        careReportRepository.findTopByIdBeforeEq(
            documentId, PageRequest.of(0, 2)));
  }

  @Transactional(propagation = Propagation.MANDATORY)
  public void saveReport(CareReport report) {
    careReportRepository.save(report);
  }


  public boolean isReportOpened(Long memberId, LocalDate date) {
   return careReportRepository.findByDocumentMemberIdAndDocumentDate(memberId, date)
        .map(CareReport::isOpened)
        .orElse(false);
  }

  protected void reviewReport(ReportReviewRequest request) {
    CareReport report = careReportRepository.findById(request.reportId())
        .orElseThrow(() -> new ApplicationException(DocumentErrorStatus.REPORT_NOT_FOUND));

    DocumentStatus st = report.getDocument().getStatus();
    if (st != DocumentStatus.REPORT_CREATED && st != DocumentStatus.REPORT_PENDING
        && st != DocumentStatus.REPORT_REVIEWED) {
      throw new ApplicationException(DocumentErrorStatus.INVALID_STATUS_FOR_REPORT);
    }

    ReportReview review = ReportReviewAssembler.from(request);
    report.applyReview(review, true);
    report.getDocument().markReviewed();
  }

  private ReportWithDto buildFromPair(Supplier<List<CareReport>> loader) {
    List<CareReport> pair = loader.get();
    if (pair.isEmpty()) {
      throw new ApplicationException(DocumentErrorStatus.REPORT_NOT_FOUND);
    }
    CareReport current = pair.get(0);
    CareReport previous = (pair.size() > 1) ? pair.get(1) : null;

    int total = totalScore(current);
    Integer change = (previous == null) ? null : total - totalScore(previous);

    SectionBundle meal = buildMealSection(current);
    SectionBundle health = buildHealthSection(current);
    SectionBundle physical = buildProgramSection(
        current.getPhysicalProgramComments(), current.getPhysicalScore(),
        current.getPhysicalFooterComment());
    SectionBundle cognitive = buildProgramSection(
        current.getCognitiveProgramComments(), current.getCognitiveScore(),
        current.getCognitiveFooterComment());

    return new ReportWithDto(
        current
        ,assembleDto(total, change, meal, health, physical, cognitive)
    );
  }


  // private helpers
  private int totalScore(CareReport r) {
    return r.getMealScore() + r.getVitalScore() + r.getPhysicalScore() + r.getCognitiveScore();
  }
  private SectionBundle buildMealSection(CareReport r) {
    return new SectionBundle(ReportEntryResolver.mealEntries(r),
        CardFooter.of(r.getMealScore(), r.getMealFooterComment()));
  }

  private SectionBundle buildHealthSection(CareReport r) {
    return new SectionBundle(ReportEntryResolver.healthEntries(r),
        CardFooter.of(r.getVitalScore(), r.getHealthFooterComment()));
  }

  private SectionBundle buildProgramSection(List<ProgramComment> programs, int score,
      String footerMemo) {
    return new SectionBundle(ReportEntryResolver.programEntries(programs),
        CardFooter.of(score, footerMemo));
  }

  private FullReportDto assembleDto(Integer total, Integer change, SectionBundle meal,
      SectionBundle health,
      SectionBundle physical, SectionBundle cognitive) {
    return new FullReportDto(
        total, change,
        meal.footer().score(), health.footer().score(), physical.footer().score(),
        cognitive.footer().score(),
        meal.entries(), meal.footer(),
        health.entries(), health.footer(),
        physical.entries(), physical.footer(),
        cognitive.entries(), cognitive.footer()
    );
  }

  private record SectionBundle(List<ReportEntry> entries, CardFooter footer) {

  }
}
