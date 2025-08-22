package com.daycan.service.document;

import com.daycan.api.dto.center.request.AttendanceAction;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.entity.Center;
import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.document.Document;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.CommonErrorStatus;
import com.daycan.api.dto.center.response.document.DocumentCountResponse;
import com.daycan.api.dto.center.response.document.DocumentStatusResponse;
import com.daycan.domain.model.DocumentMonthlyStatusRow;
import com.daycan.repository.jpa.DocumentRepository;

import com.daycan.repository.query.DocumentQueryRepository;
import com.daycan.service.member.MemberService;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DocumentService {

  private final DocumentRepository documentRepository;
  private final DocumentQueryRepository documentQueryRepository;
  private final MemberService memberService;

  @Transactional
  public void upsertAll(List<Member> members, LocalDate date) {
    if (members.isEmpty()) {
      return;
    }

    Set<Long> existing = documentRepository.findMemberIdsByDate(date);

    List<Document> toInsert = members.stream()
        .filter(m -> !existing.contains(m.getId()))
        .map(m -> createDocument(m, date))
        .toList();

    if (toInsert.isEmpty()) {
      log.info("[DocumentService] {}: 새로 생성할 문서 없음", date);
      return;
    }

    for (Document doc : toInsert) {
      try {
        documentRepository.save(doc);
      } catch (DataIntegrityViolationException e) {
        log.warn("[DocumentService] 중복 발생: memberId={}, date={}",
            doc.getMember().getId(), date);
      }
    }
    log.info("[DocumentService] {}: {} documents inserted (upsert)", date, toInsert.size());
  }

  @Transactional(readOnly = true)
  public DocumentCountResponse getDocumentCount(Long centerId, LocalDate date) {
    try {
      List<DocumentStatus> incompleteSheetStatuses = List.of(DocumentStatus.SHEET_PENDING);
      List<DocumentStatus> incompleteReportStatuses = Arrays.asList(
          DocumentStatus.REPORT_PENDING,
          DocumentStatus.REPORT_CREATED,
          DocumentStatus.REPORT_REVIEWED
      );

      long todaySheet = documentRepository.countIncompleteOnDateByCenter(
          incompleteSheetStatuses, date, centerId);

      long todayReport = documentRepository.countIncompleteOnDateByCenter(
          incompleteReportStatuses, date, centerId);

      return new DocumentCountResponse(
          (int) todaySheet, (int) todayReport
      );
    } catch (Exception e) {
      log.error("문서 카운트 조회 중 오류 발생", e);
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  @Transactional(readOnly = true)
  public List<DocumentStatusResponse> getDocumentStatusListByMemberAndMonth(
      Center center, Long memberId, YearMonth month) {

    Member member = memberService.requireActiveMember(memberId, center.getId());

    LocalDate start = month.atDay(1);
    LocalDate end = month.atEndOfMonth();

    List<DocumentMonthlyStatusRow> rows =
        documentQueryRepository.findMemberStatusInRange(member.getId(), start, end);

    return rows.stream()
        .map(DocumentMonthlyStatusRow::toResponse)
        .toList();
  }

  protected int markAttendanceList(List<Member> members, LocalDate date, AttendanceAction action) {
    if (members == null || members.isEmpty()) {
      return 0;
    }

    List<Document> documents = findDocumentsByMemberAndDate(members, date);
    int updated = 0;
    for (Document doc : documents) {
      if (markAttendance(doc, action)) { // 변경 발생 시 true 리턴하도록 설계
        updated++;
      }
    }
    return updated;
  }

  protected boolean isInvalidCenterDocument(Center center, Long documentId) {
    Document document = documentRepository.findById(documentId)
        .orElseThrow(() -> new ApplicationException(DocumentErrorStatus.DOCUMENT_NOT_FOUND));
    return !document.getCenter().equals(center);
  }

  protected Document findOrCreateDocument(Member member, LocalDate date) {
    return documentRepository.findByMemberIdAndDate(member.getId(), date)
        .orElseGet(() -> createDocument(member, date));
  }

  private List<Document> findDocumentsByMemberAndDate(
      List<Member> members, LocalDate date) {
    return documentRepository.findDocumentByDateAndMemberIn(date, members);
  }

  private boolean markAttendance(Document doc, AttendanceAction action) {
    DocumentStatus cur = doc.getStatus();

    switch (action) {
      case ABSENT -> {
        if (cur == DocumentStatus.NOT_APPLICABLE) {
          return false; // 이미 결석
        }
        doc.markSheetNotApplicable();
        return true;
      }
      case PRESENT -> {
        if (cur == DocumentStatus.NOT_APPLICABLE) {
          doc.markSheetPending();
          return true;
        }
        if (cur == DocumentStatus.SHEET_PENDING) {
          return false; // 그대로
        }
        return false;
      }
    }
    return false;
  }


  private Document createDocument(Member member, LocalDate date) {
    Document document = Document.create(
        member,
        member.getCenter(),
        date
    );
    try {
      return documentRepository.save(document);
    } catch (DataIntegrityViolationException e) {
      log.warn("[DocumentService] 중복 삽입 발생 → 재조회 시도: memberId={}, date={}",
          member.getId(), date);
      return documentRepository.findByMemberIdAndDate(member.getId(), date)
          .orElseThrow(() -> new ApplicationException(DocumentErrorStatus.DOCUMENT_NOT_FOUND));
    }
  }


}
