package com.daycan.service.document;


import com.daycan.common.exceptions.ApplicationException;

import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.entity.Center;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.DocumentMetaView;
import com.daycan.domain.model.CareSheetView;
import com.daycan.repository.jpa.DocumentRepository;
import com.daycan.repository.query.DocumentQueryRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CareSheetQueryService {

  private final DocumentQueryRepository documentQueryRepository;


  protected CareSheetView findCareSheetViewByMemberAndDate(Long memberId, LocalDate date) {

    return documentQueryRepository.fetchSheetWithVital(memberId, date)
        .orElseThrow(() -> new ApplicationException(DocumentErrorStatus.SHEET_NOT_FOUND));
  }

  protected CareSheetView findCareSheetViewById(Long careSheetId) {
    return documentQueryRepository.fetchSheetWithVital(careSheetId)
        .orElseThrow(() -> new ApplicationException(DocumentErrorStatus.SHEET_NOT_FOUND));
  }

  protected List<DocumentMetaView> findDocumentMetaViewByDate(
      Center center,
      LocalDate date,
      Long writerId,
      List<DocumentStatus> docStatuses,
      String nameLike
  ) {
    return documentQueryRepository.findDocumentMetaViewList(
        center.getId(), date, writerId, docStatuses, nameLike
    );
  }


}
