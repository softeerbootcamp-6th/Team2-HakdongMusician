package com.daycan.service.document;

import com.daycan.api.dto.center.request.AttendanceAction;
import com.daycan.api.dto.center.request.AttendanceMarkRequest;
import com.daycan.api.dto.center.request.CareSheetRequest;
import com.daycan.api.dto.center.response.AttendanceResultResponse;
import com.daycan.api.dto.center.response.CareSheetMetaResponse;
import com.daycan.api.dto.center.response.CareSheetResponse;
import com.daycan.api.dto.center.response.DocumentStatusResponse;
import com.daycan.common.exceptions.DocumentNonCreatedException;
import com.daycan.common.response.PageResponse;
import com.daycan.domain.entry.document.sheet.SheetStatus;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.CareSheetMetaView;
import com.daycan.domain.model.CareSheetView;
import com.daycan.domain.entity.Center;
import com.daycan.domain.entity.Member;
import com.daycan.service.member.MemberService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Pageable;


@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentFacade {

  private final CareSheetCommandService careSheetCommandService;
  private final CareSheetQueryService careSheetQueryService;
  private final MemberService memberService;
  private final DocumentService documentService;

  @Transactional
  public Long writeCareSheet(Center center, CareSheetRequest req) {
    Long documentId;
    try {
      documentId = careSheetCommandService.writeSheet(req);
    } catch (DocumentNonCreatedException e) {
      Member member = memberService.requireActiveMember(req.memberId());
      documentService.findOrCreateDocument(member, req.date());
      documentId = careSheetCommandService.writeSheet(req);
    }

    return documentId;
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
  public CareSheetResponse getCareSheetByMemberAndDate(
      Center center, Long memberId, LocalDate localDate) {
    Member member = memberService.getByMemberIdAndCenter(memberId, center.getId());
    CareSheetView sheet = careSheetQueryService.findCareSheetViewByMemberAndDate(member.getId(),
        localDate);
    return sheet.toResponse();
  }

  @Transactional(readOnly = true)
  public PageResponse<List<CareSheetMetaResponse>> getCareSheetMetaListByDate(
      Center center,
      LocalDate date,
      Long writerId,
      List<SheetStatus> sheetStatuses,
      Pageable pageable
  ) {
    Set<DocumentStatus> docStatuses = toDocumentStatuses(sheetStatuses); // private 메서드로 변환

    Page<CareSheetMetaView> page = careSheetQueryService.findCareSheetMetaViewByDate(
        center, date, writerId, docStatuses.stream().toList(), pageable
    );
    return PageResponse.of(page, CareSheetMetaView::toResponse);
  }

  @Transactional(readOnly = true)
  public List<DocumentStatusResponse> getDocumentStatusList(int page) {
    return documentService.getDocumentStatusList(page);
  }

  private Set<DocumentStatus> toDocumentStatuses(List<SheetStatus> sheets) {
    // 필터 비지정 시: 시트 관점 3가지만 허용
    if (sheets == null || sheets.isEmpty()) {
      return EnumSet.of(
          DocumentStatus.NOT_APPLICABLE,
          DocumentStatus.SHEET_PENDING,
          DocumentStatus.SHEET_DONE
      );
    }

    EnumSet<DocumentStatus> result = EnumSet.noneOf(DocumentStatus.class);
    for (SheetStatus s : sheets) {
      for (DocumentStatus ds : DocumentStatus.values()) {
        if (ds.toSheetStatus() == s) {
          result.add(ds);
        }
      }
    }
    return result;
  }



}
