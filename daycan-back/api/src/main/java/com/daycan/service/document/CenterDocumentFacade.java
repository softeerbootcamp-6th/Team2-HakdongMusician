package com.daycan.service.document;

import com.daycan.api.dto.center.SendMessageRequest;
import com.daycan.api.dto.center.request.AttendanceAction;
import com.daycan.api.dto.center.request.CareSheetRequest;
import com.daycan.api.dto.center.request.ReportReviewRequest;
import com.daycan.api.dto.center.response.centermanage.AttendanceResultResponse;
import com.daycan.api.dto.center.response.report.CareReportMetaResponse;
import com.daycan.api.dto.center.response.sheet.CareSheetMetaResponse;
import com.daycan.api.dto.center.response.sheet.CareSheetResponse;
import com.daycan.api.dto.common.FullReportDto;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.entry.document.report.ReportStatus;
import com.daycan.domain.entry.document.sheet.SheetStatus;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.DocumentMetaView;
import com.daycan.domain.model.CareSheetView;
import com.daycan.domain.entity.Center;
import com.daycan.domain.entity.Member;
import com.daycan.external.storage.StorageService;
import com.daycan.service.member.MemberService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Optional;
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
  private final StorageService storageService;

  @Transactional
  public Long writeCareSheet(Center center, CareSheetRequest req) {
    Member member = memberService.requireActiveMember(req.memberId());
    documentService.findOrCreateDocument(member, req.date());
    return careSheetWriteService.writeSheet(req);
  }

  @Transactional
  public AttendanceResultResponse markAttendance(
      Center center, List<Long> memberIds, LocalDate date, AttendanceAction action) {
    int totalCount = memberIds.size();
    List<Member> members = mapPresent(
        memberIds,
        id -> {
          try {
            return memberService.getByMemberIdAndCenter(id, center.getId());
          } catch (ApplicationException e) {
            log.debug("skip memberId={} ({})", id, e.getStatus());
            return Optional.empty();
          }
        }
    );

    int success = documentService.markAttendanceList(members, date, action);
    return new AttendanceResultResponse(success, memberIds.size() - success);

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
    Member member = memberService.requireActiveMember(memberId, center.getId());
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
    return getMetaListByDateMulti(
        center, date, writerId, null,
        sheetStatuses,
        DocumentStatus::allSheetStatuses,
        DocumentStatus::fromSheet,
        mv -> memberService.getByMemberIdAndCenter(mv.member().getId(), center.getId())
            .map(m -> mv.toSheetResponse(getPresignedUrl(m.getAvatarUrl())))
    );
  }

  @Transactional(readOnly = true)
  public List<CareReportMetaResponse> getCareReportMetaListByDate(
      Center center,
      LocalDate date,
      List<ReportStatus> reportStatuses,
      String nameLike
  ) {
    return getMetaListByDateMulti(
        center, date, null, nameLike,
        reportStatuses,
        DocumentStatus::allReportStatuses,
        DocumentStatus::fromReport,
        mv -> memberService.getByMemberIdAndCenter(mv.member().getId(), center.getId())
            .map(m -> mv.toReportResponse(getPresignedUrl(m.getAvatarUrl())))
    );
  }


  @Transactional(readOnly = true)
  public FullReportDto getCareReportByMemberIdAndDate(Center center, Long memberId, LocalDate date) {
    Member member = memberService.requireActiveMember(memberId, center.getId());
    return careReportService.getReport(member.getId(), date,
        DocumentStatus.allReportStatuses()).fullReportDto();
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

  @Transactional
  public void sendReportToMembers(Center center, SendMessageRequest request) {
    List<Member> members = mapPresent(
        request.memberIds(),
        id -> memberService.getByMemberIdAndCenter(id, center.getId())
    );
    if (members.isEmpty()) {
      return;
    }
    LocalDate reportDate = request.sendDate();
    LocalDateTime scheduled = (request.sendTime() == null)
        ? null
        : LocalDateTime.of(request.sendDate(), request.sendTime());

    careReportService.sendReports(members, reportDate, scheduled);
  }


  private <S, R> List<R> getMetaListByDate(
      Center center,
      LocalDate date,
      Long writerId,
      String nameLike,
      List<S> statuses,
      Supplier<EnumSet<DocumentStatus>> allSupplier,
      Function<S, DocumentStatus> statusMapper,
      Function<DocumentMetaView, Optional<R>> responseMapper
  ) {
    Set<DocumentStatus> docStatuses = toDocumentStatuses(statuses, allSupplier, statusMapper);

    List<DocumentMetaView> rows = careSheetQueryService.findDocumentMetaViewByDate(
        center, date, writerId, List.copyOf(docStatuses), nameLike
    );
    return mapPresent(rows, responseMapper);
  }

  private <S, R> List<R> getMetaListByDateMulti(
      Center center,
      LocalDate date,
      Long writerId,
      String nameLike,
      List<S> statuses,
      Supplier<EnumSet<DocumentStatus>> allSupplier,
      Function<S, EnumSet<DocumentStatus>> statusMapper,
      Function<DocumentMetaView, Optional<R>> responseMapper
  ) {
    Set<DocumentStatus> docStatuses = toDocumentStatusesMulti(statuses, allSupplier, statusMapper);

    List<DocumentMetaView> rows = careSheetQueryService.findDocumentMetaViewByDate(
        center, date, writerId, List.copyOf(docStatuses), nameLike
    );
    return mapPresent(rows, responseMapper);
  }

  private <T> Set<DocumentStatus> toDocumentStatusesMulti(
      List<T> statuses,
      Supplier<EnumSet<DocumentStatus>> allSupplier,
      Function<T, EnumSet<DocumentStatus>> mapper
  ) {
    if (statuses == null || statuses.isEmpty()) {
      return allSupplier.get();
    }
    EnumSet<DocumentStatus> result = EnumSet.noneOf(DocumentStatus.class);
    for (T s : statuses) {
      if (s == null) {
        result.addAll(allSupplier.get());
      } else {
        result.addAll(mapper.apply(s));
      }
    }
    return result;
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
  private String getPresignedUrl(String key) {
    return storageService.presignGet(key);
  }

  private <T, R> List<R> mapPresent(List<T> src, Function<T, Optional<R>> f) {
    return src.stream().map(f).flatMap(Optional::stream).toList();
  }
}
