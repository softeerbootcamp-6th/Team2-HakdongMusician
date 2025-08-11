package com.daycan.repository.query;

import com.daycan.domain.entity.document.QCareSheet;
import com.daycan.domain.entity.document.QDocument;
import com.daycan.domain.entity.QStaff;
import com.daycan.domain.model.CareSheetInitVO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DocumentQueryRepositoryImpl implements DocumentQueryRepository {

  private final JPAQueryFactory qf;
  QDocument d = QDocument.document;
  QCareSheet cs = QCareSheet.careSheet;
  QStaff s = QStaff.staff;

  @Override
  public Optional<CareSheetInitVO> fetchCareSheetInit(
      Long memberId, LocalDate date, Long writerId
  ) {
    CareSheetInitVO row = qf
        .select(Projections.constructor(
            CareSheetInitVO.class,
            d,                       // Document 엔티티 통째로
            cs.id.isNull(),          // CareSheet 없으면 isNew=true
            s                        // Staff (없으면 null)
        ))
        .from(d)
        .leftJoin(cs).on(cs.id.eq(d.id)) // 공유 PK(= doc.id) 기반
        .leftJoin(s).on(s.id.eq(writerId)) // writerId로 단일 행만 붙임
        .where(d.member.id.eq(memberId),
            d.docDate.eq(date))
        .fetchOne();

    return Optional.ofNullable(row);
  }
}

