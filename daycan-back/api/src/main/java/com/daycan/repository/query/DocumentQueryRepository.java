package com.daycan.repository.query;

import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.CareSheetInitVO;
import com.daycan.domain.model.CareSheetMetaView;
import com.daycan.domain.model.CareSheetView;
import com.daycan.domain.model.DocumentMonthlyStatusRow;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DocumentQueryRepository {

  Optional<CareSheetInitVO> fetchCareSheetInit(
      Long memberId, LocalDate date, Long writerId
  );

  Optional<CareSheetView> fetchSheetWithVital(
      Long memberId, LocalDate date
  );

  Page<CareSheetMetaView> findMetaViewsByCenterAndDate(
      Long centerId, LocalDate date, Long writerId,
      List<DocumentStatus> statuses, Pageable pageable
  );

  List<DocumentMonthlyStatusRow> findMemberStatusInRange(
      Long memberId, LocalDate start, LocalDate end
  );
}


