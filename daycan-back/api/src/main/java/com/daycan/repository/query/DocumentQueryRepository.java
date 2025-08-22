package com.daycan.repository.query;

import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.CareSheetInit;
import com.daycan.domain.model.DocumentMetaView;
import com.daycan.domain.model.CareSheetView;
import com.daycan.domain.model.DocumentMonthlyStatusRow;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DocumentQueryRepository {

  Optional<CareSheetInit> fetchCareSheetInit(
      Long memberId, LocalDate date, Long writerId
  );

  Optional<CareSheetView> fetchSheetWithVital(
      Long memberId, LocalDate date
  );

  Optional<CareSheetView> fetchSheetWithVital(
      Long sheetId
  );

  List<DocumentMetaView> findDocumentMetaViewList(
      Long centerId, LocalDate date, Long writerId,
      List<DocumentStatus> statuses, String nameLike
  );

  List<DocumentMonthlyStatusRow> findMemberStatusInRange(
      Long memberId, LocalDate start, LocalDate end
  );
}


