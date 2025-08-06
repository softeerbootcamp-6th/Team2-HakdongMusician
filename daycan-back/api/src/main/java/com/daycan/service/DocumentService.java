package com.daycan.service;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.enums.CareReportStatus;
import com.daycan.domain.enums.CareSheetStatus;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.dto.admin.response.CareReportCountResponse;
import com.daycan.dto.admin.response.CareSheetCountResponse;
import com.daycan.dto.admin.response.DocumentCountResponse;
import com.daycan.dto.admin.response.DocumentStatusResponse;
import com.daycan.repository.DocumentRepository;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DocumentService {

  private final DocumentRepository documentRepository;

  /**
   * 페이지별 문서 상태 조회
   */
  public List<DocumentStatusResponse> getDocumentStatusList(int page) {
    return List.of(new DocumentStatusResponse(
        LocalDate.now(),
        new DocumentStatusResponse.CareSheetStatusResponse(
            1L,
            CareSheetStatus.PENDING),
        new DocumentStatusResponse.CareReportStatusResponse(
            1L,
            CareReportStatus.PENDING)));
  }

  /**
   * 문서 카운트 조회 (미완료/지연된 문서 수)
   */
  public DocumentCountResponse getDocumentCount(String organizationId) {
    try {
      // 미완료 상태 정의
      List<DocumentStatus> incompleteSheetStatuses = List.of(
          DocumentStatus.SHEET_PENDING);

      List<DocumentStatus> incompleteReportStatuses = Arrays.asList(
          DocumentStatus.REPORT_PENDING,
          DocumentStatus.REPORT_CREATED,
          DocumentStatus.REPORT_REVIEWED);

      // 지연 기준일 이번 달 1일
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