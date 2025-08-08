package com.daycan.service;

import com.daycan.common.response.status.MemberErrorStatus;
import com.daycan.domain.helper.DocumentKey;
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
      careSheetService.createCareSheet(req);
    } catch (DocumentNonCreatedException e) {
      findOrCreateDocument(req.recipientId(), req.date());
      careSheetService.createCareSheet(req);
    }
  }

  /**
   * [Upsert] 주어진 멤버 목록 중, 아직 생성되지 않은 (memberId + date) 조합의 문서만 삽입.
   *
   * <p>
   * 현재는 JPA 기반으로 사전 필터링 후 개별 save 처리하지만, 향후 아래 방식으로 리팩토링 고려:
   * <ul>
   *   <li>1) DB native 쿼리 기반 UPSERT (e.g., PostgreSQL ON CONFLICT DO NOTHING)</li>
   *   <li>2) JDBC batch insert (단, GenerationType.IDENTITY 사용 시 제약 있음)</li>
   *   <li>3) saveAll() → 고도화 (PK 전략 변경 시)</li>
   * </ul>
   * </p>
   */
  @Transactional
  public void upsertAll(List<Member> members, LocalDate date) {
    if (members.isEmpty()) {
      return;
    }

    Set<String> existing = documentRepository.findMemberIdsByDate(date);

    List<Document> toInsert = members.stream()
        .filter(m -> !existing.contains(m.getUsername()))
        .map(m -> Document.builder()
            .id(DocumentKey.of(
                m.getUsername(),
                date
            ))
            .organizationId(m.getOrganizationId())
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
        log.warn("[DocumentService] 중복 발생: memberId={}, date={}", doc.getId().getMemberId(), date);
      }
    }

    log.info("[DocumentService] {}: {} documents inserted (upsert)", date, toInsert.size());
  }

  private Document findOrCreateDocument(String memberId, LocalDate date) {
    return documentRepository.findById(
        DocumentKey.of(memberId, date)
    ).orElseGet(() -> createDocument(memberId, date));
  }

  private Document createDocument(String memberId, LocalDate date) {
    Member member = memberRepository.findByUsernameAndActiveIsTrue(memberId)
        .orElseThrow(() -> new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND, memberId));

    Document document = Document.builder()
        .id(DocumentKey.of(memberId, date))
            .organizationId(member.getOrganizationId())
            .status(DocumentStatus.SHEET_PENDING)
            .build();

    try {
      return documentRepository.save(document);
    } catch (DataIntegrityViolationException e) {
      log.warn("[DocumentService] 중복 삽입 발생 → 재조회 시도: memberId={}, date={}", memberId, date);
      return documentRepository.findById(DocumentKey.of(memberId, date))
          .orElseThrow(() -> new IllegalStateException("중복 문서 재조회 실패"));
    }
  }

  @Transactional(readOnly = true)
  public List<DocumentStatusResponse> getDocumentStatusList(int page) {
    return List.of(new DocumentStatusResponse(
        LocalDate.now(),
        new DocumentStatusResponse.CareSheetStatusResponse(
            1L,
            DocumentStatus.SHEET_PENDING),
        new DocumentStatusResponse.CareReportStatusResponse(
            1L,
            DocumentStatus.REPORT_PENDING)));
  }

  @Transactional(readOnly = true)
  public DocumentCountResponse getDocumentCount(String organizationId) {
    try {
      List<DocumentStatus> incompleteSheetStatuses = List.of(DocumentStatus.SHEET_PENDING);
      List<DocumentStatus> incompleteReportStatuses = Arrays.asList(
          DocumentStatus.REPORT_PENDING,
          DocumentStatus.REPORT_CREATED,
          DocumentStatus.REPORT_REVIEWED);

      LocalDate firstDayOfMonth = LocalDate.now().withDayOfMonth(1);

      long accumulatedCareSheetDelayedCount = documentRepository
          .countByStatusInAndGreaterOrEqualsThanDateAndOrganizationId(
              incompleteSheetStatuses,
              firstDayOfMonth,
              organizationId);

      long todayCareSheetDelayedCount = documentRepository.countByStatusInAndDateAndOrganizationId(
          incompleteSheetStatuses,
          LocalDate.now(),
          organizationId);

      long accumulatedCareReportDelayedCount = documentRepository
          .countByStatusInAndGreaterOrEqualsThanDateAndOrganizationId(
              incompleteReportStatuses,
              firstDayOfMonth,
              organizationId);

      long todayCareReportDelayedCount = documentRepository.countByStatusInAndDateAndOrganizationId(
          incompleteReportStatuses,
          LocalDate.now(),
          organizationId);

      return new DocumentCountResponse(
          new CareReportCountResponse((int) todayCareSheetDelayedCount,
              (int) (accumulatedCareSheetDelayedCount - todayCareSheetDelayedCount)),
          new CareSheetCountResponse(
              (int) (accumulatedCareReportDelayedCount - todayCareReportDelayedCount),
              (int) todayCareReportDelayedCount));

    } catch (Exception e) {
      log.error("문서 카운트 조회 중 오류 발생: {}", e.getMessage());
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }
}
