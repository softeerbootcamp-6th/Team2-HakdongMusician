package com.daycan.service.document;

import com.daycan.api.dto.center.request.AttendanceAction;
import com.daycan.api.dto.center.request.CareSheetRequest;
import com.daycan.api.dto.center.request.ReportReviewRequest;
import com.daycan.api.dto.center.response.centermanage.AttendanceResultResponse;
import com.daycan.api.dto.center.response.report.CareReportMetaResponse;
import com.daycan.api.dto.center.response.sheet.CareSheetMetaResponse;
import com.daycan.api.dto.center.response.sheet.CareSheetResponse;
import com.daycan.api.dto.common.FullReportDto;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.exceptions.DocumentNonCreatedException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.entry.document.report.ReportStatus;
import com.daycan.domain.entry.document.sheet.SheetStatus;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.DocumentMetaView;
import com.daycan.domain.model.CareSheetView;
import com.daycan.domain.entity.Center;
import com.daycan.domain.entity.Member;
import com.daycan.service.member.MemberService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Supplier;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Slf4j
public class CenterDocumentFacade {

  private final CareSheetWriteService careSheetWriteService;
  private final CareSheetQueryService careSheetQueryService;
  private final MemberService memberService;
  private final DocumentService documentService;
  private final CareReportService careReportService;

  @Transactional
  public Long writeCareSheet(Center center, CareSheetRequest req) {
    Long docId;
    try {
      docId = careSheetWriteService.writeSheet(req);
    } catch (DocumentNonCreatedException e) {
      Member member = memberService.requireActiveMember(req.memberId());
      documentService.findOrCreateDocument(member, req.date());
      docId = careSheetWriteService.writeSheet(req);
    }

    return docId;
  }

  @Transactional
  public AttendanceResultResponse markAttendance(
      Center center, List<Long> memberIds, LocalDate date, AttendanceAction action) {
    int totalCount = memberIds.size();
    List<Member> members = new ArrayList<>();
    memberIds.forEach(memberId -> {
      Member member = memberService.getByMemberIdAndCenter(memberId, center.getId());
      members.add(member);
    });

    int success = documentService.markAttendanceList(
        members, date, action);

    return new AttendanceResultResponse(
        success, totalCount - success
    );
  }

  @Transactional(readOnly = true)
  public CareSheetResponse getCareSheetById(Center center, Long sheetId) {
    if (documentService.isInvalidCenterDocument(center, sheetId)) {
      throw new ApplicationException(DocumentErrorStatus.INVALID_DOCUMENT_ACCESS, sheetId);
    }
    CareSheetView sheet = careSheetQueryService.findCareSheetViewById(sheetId);
    return sheet.toResponse();
  }

  @Transactional(readOnly = true)
  public CareSheetResponse getCareSheetByMemberAndDate(
      Center center, Long memberId, LocalDate localDate) {
    Member member = memberService.getByMemberIdAndCenter(memberId, center.getId());
    CareSheetView sheet = careSheetQueryService.findCareSheetViewByMemberAndDate(member.getId(),
        localDate);
    return sheet.toResponse();
  }

  @Transactional(readOnly = true)
  public List<CareSheetMetaResponse> getCareSheetMetaListByDate(
      Center center,
      LocalDate date,
      Long writerId,
      List<SheetStatus> sheetStatuses
  ) {
    return getMetaListByDate(
        center, date, writerId, null,
        sheetStatuses,
        DocumentStatus::allSheetStatuses,
        DocumentStatus::from,
        DocumentMetaView::toSheetResponse
    );
  }

  @Transactional(readOnly = true)
  public List<CareReportMetaResponse> getCareReportMetaListByDate(
      Center center,
      LocalDate date,
      List<ReportStatus> reportStatuses,
      String nameLike
  ) {
    return getMetaListByDate(
        center, date, null, nameLike,
        reportStatuses,
        DocumentStatus::allReportStatuses,
        DocumentStatus::from,
        DocumentMetaView::toReportResponse
    );
  }

  @Transactional(readOnly = true)
  public FullReportDto getCareReportByMemberIdAndDate(Center center, Long memberId, LocalDate date) {
    Member member = memberService.getByMemberIdAndCenter(memberId, center.getId());
    return careReportService.getReport(member.getId(), date).fullReportDto();
  }

  @Transactional(readOnly = true)
  public FullReportDto getCareReportByMemberIdAndReportId(Center center, Long reportId) {
    if (documentService.isInvalidCenterDocument(center, reportId)) {
      throw new ApplicationException(DocumentErrorStatus.INVALID_DOCUMENT_ACCESS, reportId);
    }
    return careReportService.getReport(reportId).fullReportDto();
  }

  @Transactional
  public void reviewReport(Center center,Long id ,ReportReviewRequest request) {
    if(!id.equals(request.reportId())){
      throw new ApplicationException(DocumentErrorStatus.INVALID_DOCUMENT_ID);
    }
    if (documentService.isInvalidCenterDocument(center, request.reportId())) {
      throw new ApplicationException(DocumentErrorStatus.INVALID_DOCUMENT_ACCESS);
    }
    careReportService.reviewReport(request);

  }

  private <S, R> List<R> getMetaListByDate(
      Center center,
      LocalDate date,
      Long writerId,
      String nameLike,
      List<S> statuses,
      Supplier<EnumSet<DocumentStatus>> allSupplier,
      Function<S, DocumentStatus> statusMapper,
      Function<DocumentMetaView, R> responseMapper
  ) {
    Set<DocumentStatus> docStatuses = toDocumentStatuses(statuses, allSupplier, statusMapper);

    return careSheetQueryService.findDocumentMetaViewByDate(
            center, date, writerId, List.copyOf(docStatuses), nameLike
        )
        .stream()
        .map(responseMapper)
        .toList();
  }


  private <T> Set<DocumentStatus> toDocumentStatuses(
      List<T> statuses,
      Supplier<EnumSet<DocumentStatus>> allSupplier,
      Function<T, DocumentStatus> mapper
  ) {
    if (statuses == null || statuses.isEmpty()) {
      return allSupplier.get();
    }

    EnumSet<DocumentStatus> result = EnumSet.noneOf(DocumentStatus.class);
    for (T s : statuses) {
      if (s == null) {
        result.addAll(allSupplier.get());
      } else {
        result.add(mapper.apply(s));
      }
    }
    return result;
  }
}
