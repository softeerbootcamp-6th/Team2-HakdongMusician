package com.daycan.repository.querydsl;

import com.daycan.domain.model.CareSheetInitVO;
import java.time.LocalDate;
import java.util.Optional;

public interface DocumentQueryRepository {
  Optional<CareSheetInitVO> fetchCareSheetInit(Long memberId, LocalDate date, Long writerId);
}


