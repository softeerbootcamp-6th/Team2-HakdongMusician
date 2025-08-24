package com.daycan.service.document;

import com.daycan.api.dto.center.request.ReportReviewRequest;
import com.daycan.common.response.status.error.MemberErrorStatus;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.entity.Member;
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
import com.daycan.repository.query.DocumentQueryRepository;
import com.daycan.util.resolver.ReportEntryResolver;
import com.daycan.util.resolver.ReportReviewAssembler;
import jakarta.annotation.Nullable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.EnumSet;
import java.util.List;
import java.util.Optional;
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
  private final DocumentQueryRepository documentQueryRepository;

  @Transactional(readOnly = true)
  public ReportWithDto getReport(Long memberId, LocalDate date, EnumSet<DocumentStatus> statuses) {
    if (!memberRepository.existsById(memberId)) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND);
    }
    return buildFromPair(() ->
        careReportRepository.findTopByMemberAndDateBeforeEq(
            memberId, date, statuses, PageRequest.of(0, 2)));
  }

  @Transactional(propagation = Propagation.MANDATORY)
  public void saveReport(CareReport report) {
    careReportRepository.save(report);
  }


  @Transactional(propagation = Propagation.MANDATORY)
  public Optional<Boolean> isReportOpened(Long memberId, LocalDate date) {
    Optional<CareReport> report = careReportRepository.findByDocumentMemberIdAndDocumentDate(
        memberId, date);
    log.info("isReportOpened: report={}", report);

    return report.map(CareReport::isOpened);
  }

  @Transactional(readOnly = true, propagation = Propagation.MANDATORY)
  public List<LocalDate> getReportedDateInMonth(Long memberId, YearMonth month) {
    if (!memberRepository.existsById(memberId)) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND);
    }
    LocalDate start = month.atDay(1);
    LocalDate end = month.atEndOfMonth();

    return careReportRepository.findReportedDatesInRange(
        memberId, start, end, DocumentStatus.finished()
    );
  }

  @Transactional(propagation = Propagation.MANDATORY)
  public void sendReports(List<Member> members,
      LocalDate reportDate,
      @Nullable LocalDateTime scheduled) {
    if (members == null || members.isEmpty()) {
      return;
    }

    ZoneId KST = ZoneId.of("Asia/Seoul");
    LocalDateTime now = LocalDateTime.now(KST);

    boolean immediate = (scheduled == null) || !scheduled.isAfter(now);
    LocalDateTime reserved = immediate ? null : scheduled;

    documentQueryRepository.registerSendingMessages(members, reportDate, immediate, reserved);
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
      // throw new ApplicationException(DocumentErrorStatus.REPORT_NOT_FOUND);
      return emptyReport();
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
        current,
        assembleDto(
            current.getDocument().getDate(),
            total,
            change,
            meal,
            health,
            physical,
            cognitive
        )
    );
  }


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

  private FullReportDto assembleDto(
      LocalDate date, Integer total, Integer change,
      SectionBundle meal,
      SectionBundle health,
      SectionBundle physical, SectionBundle cognitive) {
    return new FullReportDto(
        date, total, change,
        meal.footer().score(),
        health.footer().score(),
        physical.footer().score(),
        cognitive.footer().score(),
        meal.entries(), meal.footer(),
        health.entries(), health.footer(),
        physical.entries(), physical.footer(),
        cognitive.entries(), cognitive.footer()
    );
  }

  private ReportWithDto emptyReport() {
    return new ReportWithDto(
        null,
        new FullReportDto(
            null, 0, null,
            0, 0, 0, 0,
            List.of(), null,
            List.of(), null,
            List.of(), null,
            List.of(), null
        )
    );
  }

  private record SectionBundle(List<ReportEntry> entries, CardFooter footer) {

  }
}

