package com.daycan.repository.query;

import com.daycan.domain.entity.QMember;
import com.daycan.domain.entity.document.CareSheet;
import com.daycan.domain.entity.document.PersonalProgram;
import com.daycan.domain.entity.document.QCareReport;
import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.entity.document.QCareSheet;
import com.daycan.domain.entity.document.QDocument;
import com.daycan.domain.entity.QStaff;
import com.daycan.domain.entity.document.QPersonalProgram;
import com.daycan.domain.entity.document.QVital;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.CareSheetInitVO;
import com.daycan.domain.model.DocumentMetaView;
import com.daycan.domain.model.CareSheetView;
import com.daycan.domain.model.DocumentMonthlyStatusRow;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DocumentQueryRepositoryImpl implements DocumentQueryRepository {

  private final JPAQueryFactory qf;
  QDocument doc = QDocument.document;
  QCareSheet careSheet = QCareSheet.careSheet;
  QMember member = QMember.member;
  QStaff staff = QStaff.staff;
  QVital vital = QVital.vital;
  QPersonalProgram personalProgram = QPersonalProgram.personalProgram;
  QCareReport careReport = QCareReport.careReport;

  @Override
  public Optional<CareSheetInitVO> fetchCareSheetInit(
      Long memberId, LocalDate date, Long writerId
  ) {
    CareSheetInitVO row = qf
        .select(Projections.constructor(
            CareSheetInitVO.class,
            doc,                       // Document 엔티티 통째로
            careSheet.id.isNull(),          // CareSheet 없으면 isNew=true
            staff,
            doc.member
        ))
        .from(doc)
        .leftJoin(careSheet).on(careSheet.id.eq(doc.id)) // 공유 PK(= doc.id) 기반
        .leftJoin(staff).on(staff.id.eq(writerId)) // writerId로 단일 행만 붙임
        .on(writerId != null ? staff.id.eq(writerId) : Expressions.TRUE.isTrue())
        .where(doc.member.id.eq(memberId),
            doc.date.eq(date))
        .fetchOne();

    return Optional.ofNullable(row);
  }

  @Override
  public Optional<CareSheetView> fetchSheetWithVital(Long memberId, LocalDate date) {
    List<Tuple> rows = qf
        .select(
            doc.id,                 // 0
            doc.member.id,          // 1
            doc.member.username,    // 2
            doc.date,               // 3
            careSheet,              // 4 (엔티티)
            vital,                  // 5 (엔티티)
            staff.id,               // 6
            personalProgram         // 7 (엔티티)
        )
        .from(doc)
        .leftJoin(careSheet).on(careSheet.id.eq(doc.id))
        .leftJoin(vital).on(vital.id.eq(doc.id))
        .leftJoin(staff).on(staff.eq(careSheet.writer))
        .leftJoin(personalProgram).on(personalProgram.careSheet.eq(careSheet))
        .where(
            doc.member.id.eq(memberId),
            doc.date.eq(date)
        )
        .fetch();

    if (rows.isEmpty()) return Optional.empty();

    Tuple first = rows.get(0);

    Long docId       = first.get(doc.id);
    Long baseMemberId= first.get(doc.member.id);
    String memberCode= first.get(doc.member.username);
    LocalDate theDate= first.get(doc.date);

    CareSheet cs     = first.get(careSheet);       // 모든 row에서 동일(조인 중복만 존재)
    Vital vt         = first.get(vital);
    Long writerId    = first.get(staff.id);

    // 중복 제거하며 프로그램 모으기
    Map<Long, PersonalProgram> programMap = new LinkedHashMap<>();
    for (Tuple r : rows) {
      PersonalProgram pp = r.get(personalProgram);
      if (pp != null) {
        Long ppId = pp.getId();
        if (!programMap.containsKey(ppId)) programMap.put(ppId, pp);
      }
    }
    List<PersonalProgram> programs = new ArrayList<>(programMap.values());

    CareSheetView view = new CareSheetView(
        docId, writerId, baseMemberId, memberCode, theDate,
        cs, vt, programs
    );
    return Optional.of(view);
  }



  public Optional<CareSheetView> fetchSheetWithVital(Long sheetId){
    List<Tuple> rows = qf
        .select(
            doc.id,                 // 0
            doc.member.id,          // 1
            doc.member.username,    // 2
            doc.date,               // 3
            careSheet,              // 4 (엔티티)
            vital,                  // 5 (엔티티)
            staff.id,               // 6
            personalProgram         // 7 (엔티티)
        )
        .from(doc)
        .leftJoin(careSheet).on(careSheet.id.eq(doc.id))
        .leftJoin(vital).on(vital.id.eq(doc.id))
        .leftJoin(staff).on(staff.eq(careSheet.writer))
        .leftJoin(personalProgram).on(personalProgram.careSheet.eq(careSheet))
        .where(careSheet.id.eq(sheetId)) // CareSheet PK(= Document PK)
        .fetch();

    if (rows.isEmpty()) return Optional.empty();

    Tuple first       = rows.get(0);
    Long docId        = first.get(doc.id);
    Long baseMemberId = first.get(doc.member.id);
    String memberCode = first.get(doc.member.username);
    LocalDate theDate = first.get(doc.date);

    CareSheet cs   = first.get(careSheet);
    Vital vt       = first.get(vital);
    Long writerId  = first.get(staff.id);

    // 중복 제거하며 프로그램 모으기
    Map<Long, PersonalProgram> programMap = new LinkedHashMap<>();
    for (Tuple r : rows) {
      PersonalProgram pp = r.get(personalProgram);
      if (pp != null) {
        programMap.putIfAbsent(pp.getId(), pp);
      }
    }
    List<PersonalProgram> programs = new ArrayList<>(programMap.values());

    return Optional.of(new CareSheetView(
        docId, writerId, baseMemberId, memberCode, theDate,
        cs, vt, programs
    ));

  }

  @Override
  public List<DocumentMetaView> findDocumentMetaViewList(
      Long centerId,
      LocalDate date,
      Long writerId,
      List<DocumentStatus> statuses,
      String nameLike
  ) {
    BooleanExpression writerFilter =
        (writerId == null) ? null : staff.id.eq(writerId);

    BooleanExpression statusFilter = docStatusIn(statuses);

    BooleanExpression nameFilter = hasText(nameLike)
        ? member.name.containsIgnoreCase(nameLike.trim())
        : null;
    // content
    return qf
        .select(Projections.constructor(DocumentMetaView.class, doc, member, staff))
        .from(doc)
        .join(doc.member, member)
        .leftJoin(doc.careSheet, careSheet)
        .leftJoin(careSheet.writer, staff)
        .where(
            doc.center.id.eq(centerId),
            doc.date.eq(date),
            writerFilter,
            statusFilter,
            nameFilter
        )
        .orderBy(doc.updatedAt.desc())
        .fetch();
  }



  @Override
  public List<DocumentMonthlyStatusRow> findMemberStatusInRange(Long memberId, LocalDate start, LocalDate end) {
    return qf
        .select(Projections.constructor(
            DocumentMonthlyStatusRow.class,
            doc.date,      // LocalDate
            careSheet.id,       // Long (null 가능)
            careReport.id,       // Long (null 가능)
            doc.status     // DocumentStatus
        ))
        .from(doc)
        .leftJoin(careSheet).on(careSheet.id.eq(doc.id))   // 공유 PK 조인
        .leftJoin(careReport).on(careReport.id.eq(doc.id))   // 공유 PK 조인
        .where(
            doc.member.id.eq(memberId),
            doc.date.between(start, end)
        )
        .orderBy(doc.date.asc())
        .fetch();
  }

  private BooleanExpression docStatusIn(List<DocumentStatus> statuses) {
    if (statuses == null || statuses.isEmpty()) {
      return null;
    }
    EnumSet<DocumentStatus> set = EnumSet.noneOf(DocumentStatus.class);
    for (DocumentStatus s : statuses) {
      if (s != null) set.add(s);
    }
    return set.isEmpty() ? null : doc.status.in(set);
  }

  private static boolean hasText(String s) {
    return s != null && !s.isBlank();
  }

}

