package com.daycan.service;

import com.daycan.common.response.status.MemberErrorStatus;
import com.daycan.domain.entry.DocumentKey;
import com.daycan.domain.entity.Member;
import com.daycan.dto.admin.request.CareSheetRequest;
import com.daycan.exceptions.ApplicationException;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.Document;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.dto.admin.response.CareReportCountResponse;
import com.daycan.dto.admin.response.CareSheetCountResponse;
import com.daycan.dto.admin.response.DocumentCountResponse;
import com.daycan.dto.admin.response.DocumentStatusResponse;
import com.daycan.exceptions.DocumentNonCreatedException;
import com.daycan.repository.DocumentRepository;
import com.daycan.repository.MemberRepository;
import java.time.LocalDate;
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
  private final MemberRepository memberRepository;
  private final CareSheetService careSheetService;

  @Transactional
  public void createCareSheet(CareSheetRequest req) {
    try {
      careSheetService.writeSheet(req);
    } catch (DocumentNonCreatedException e) {
      Member member = requireActiveMember(req.memberId());
      findOrCreateDocument(member, req.date());
      careSheetService.writeSheet(req);
    }
  }

  /**
   * [Upsert] members 중 (memberId + date) 없는 것만 INSERT
   */
  @Transactional
  public void upsertAll(List<Member> members, LocalDate date) {
    if (members.isEmpty()) return;

    // 이제 Long memberId 집합
    Set<Long> existing = documentRepository.findMemberIdsByDate(date);

    List<Document> toInsert = members.stream()
        .filter(m -> !existing.contains(m.getId()))
        .map(m -> Document.builder()
            .member(m)
            .center(m.getCenter())          // 작성 시점 센터 박제
            .docDate(date)
            .status(DocumentStatus.SHEET_PENDING)
            .build())
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

  // ───────────────────────── private helpers ─────────────────────────

  private Document findOrCreateDocument(Member member, LocalDate date) {
    return documentRepository.findByMemberIdAndDocDate(member.getId(), date)
        .orElseGet(() -> createDocument(member, date));
  }

  private Document createDocument(Member member, LocalDate date) {
    Document document = Document.builder()
        .member(member)
        .center(member.getCenter())       // 박제
        .docDate(date)
        .status(DocumentStatus.SHEET_PENDING)
        .build();

    try {
      return documentRepository.save(document);
    } catch (DataIntegrityViolationException e) {
      log.warn("[DocumentService] 중복 삽입 발생 → 재조회 시도: memberId={}, date={}",
          member.getId(), date);
      return documentRepository.findByMemberIdAndDocDate(member.getId(), date)
          .orElseThrow(() -> new IllegalStateException("중복 문서 재조회 실패"));
    }
  }

  private Member requireActiveMember(Long memberId) {
    Member m = memberRepository.findById(memberId)
        .orElseThrow(() -> new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND, memberId));
    if (!m.isActive()) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND, "비활성 회원");
    }
    return m;
  }

  @Transactional(readOnly = true)
  public List<DocumentStatusResponse> getDocumentStatusList(int page) {
    // TODO: 실제 구현 전까지 임시 반환 그대로 유지
    return List.of(new DocumentStatusResponse(
        LocalDate.now(),
        new DocumentStatusResponse.CareSheetStatusResponse(1L, DocumentStatus.SHEET_PENDING),
        new DocumentStatusResponse.CareReportStatusResponse(1L, DocumentStatus.REPORT_PENDING)
    ));
  }

  @Transactional(readOnly = true)
  public DocumentCountResponse getDocumentCount(Long centerId) {
    try {
      List<DocumentStatus> incompleteSheetStatuses = List.of(DocumentStatus.SHEET_PENDING);
      List<DocumentStatus> incompleteReportStatuses = Arrays.asList(
          DocumentStatus.REPORT_PENDING,
          DocumentStatus.REPORT_CREATED,
          DocumentStatus.REPORT_REVIEWED
      );

      LocalDate firstDayOfMonth = LocalDate.now().withDayOfMonth(1);

      long accSheet = documentRepository.countIncompleteFromDateByCenter(
          incompleteSheetStatuses, firstDayOfMonth, centerId);
      long todaySheet = documentRepository.countIncompleteOnDateByCenter(
          incompleteSheetStatuses, LocalDate.now(), centerId);

      long accReport = documentRepository.countIncompleteFromDateByCenter(
          incompleteReportStatuses, firstDayOfMonth, centerId);
      long todayReport = documentRepository.countIncompleteOnDateByCenter(
          incompleteReportStatuses, LocalDate.now(), centerId);

      return new DocumentCountResponse(
          new CareReportCountResponse((int) todaySheet, (int) (accSheet - todaySheet)),
          new CareSheetCountResponse((int) (accReport - todayReport), (int) todayReport)
      );
    } catch (Exception e) {
      log.error("문서 카운트 조회 중 오류 발생", e);
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }
}
