package com.daycan.service.document;



import com.daycan.common.exceptions.ApplicationException;

import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.entity.Center;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.CareSheetMetaView;
import com.daycan.domain.model.CareSheetView;
import com.daycan.repository.query.DocumentQueryRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CareSheetQueryService {
  private final DocumentQueryRepository documentQueryRepository;


  /**
   * 특정 날짜에 작성된 특정 수급자에 대한 기록지를 조회합니다.
   *
   * @param memberId 수급자 ID
   * @param date     조회할 날짜
   * @return 해당 날짜에 작성된 기록지의 개수
   */
  protected CareSheetView findCareSheetViewByMemberAndDate(Long memberId, LocalDate date) {
    return documentQueryRepository.fetchSheetWithVital(memberId, date)
        .orElseThrow(() -> new ApplicationException(DocumentErrorStatus.SHEET_NOT_FOUND));
  }

  protected Page<CareSheetMetaView> findCareSheetMetaViewByDate(
      Center center,
      LocalDate date,
      Long writerId,
      List<DocumentStatus> docStatuses,
      Pageable pageable
  ) {
    return documentQueryRepository.findMetaViewsByCenterAndDate(
        center.getId(), date, writerId, docStatuses, pageable
    );
  }



}
