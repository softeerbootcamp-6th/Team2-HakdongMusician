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
import com.daycan.domain.entity.document.VitalAggregate;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.CareSheetInitRow;
import com.daycan.domain.model.CareSheetInitVO;
import com.daycan.domain.model.DocumentMetaView;
import com.daycan.domain.model.CareSheetView;
import com.daycan.domain.model.DocumentMonthlyStatusRow;
import com.daycan.domain.model.QCareSheetInitRow;
import com.daycan.domain.model.QDocumentMetaView;
import com.daycan.domain.model.QDocumentMonthlyStatusRow;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.criteria.JoinType;
import java.time.LocalDate;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class DocumentQueryRepositoryImpl implements DocumentQueryRepository {

  private final JPAQueryFactory qf;

  private final QDocument doc = QDocument.document;
  private final QCareSheet sheet = QCareSheet.careSheet;
  private final QMember member = QMember.member;
  private final QStaff staff = QStaff.staff;
  private final QVital vital = QVital.vital;
  private final QPersonalProgram personalProgram = QPersonalProgram.personalProgram;
  private final QCareReport report = QCareReport.careReport;

  @Override
  public Optional<CareSheetInitVO> fetchCareSheetInit(Long memberId, LocalDate date,
      Long writerId) {
    CareSheetInitRow row = fetchCareSheetInitRow(memberId, date, writerId);
    if (row == null) {
      return Optional.empty();
    }

    VitalAggregate prevAgg = (row.prevAggCount() == null)
        ? null
        : VitalAggregate.of(
            row.prevAggCount(),
            row.prevSumSystolic(),
            row.prevSumDiastolic(),
            row.prevSumTemperatureTenths(),
            row.prevSumStool(),
            row.prevSumUrine(),
            row.prevSumHealthScore()
        );

    CareSheetInitVO vo = new CareSheetInitVO(
        row.doc(),
        Boolean.TRUE.equals(row.isNew()),
        row.staff(),
        row.member(),
        prevAgg,
        Boolean.TRUE.equals(row.hasFollowingVital())
    );
    return Optional.of(vo);
  }

  @Override
  public Optional<CareSheetView> fetchSheetWithVital(Long memberId, LocalDate date) {
    List<Tuple> rows = baseSheetWithVitalQuery()
        .where(
            doc.member.id.eq(memberId),
            doc.date.eq(date)
        )
        .fetch();

    return toCareSheetView(rows);
  }

  public Optional<CareSheetView> fetchSheetWithVital(Long sheetId) {
    List<Tuple> rows = baseSheetWithVitalQuery()
        .where(sheet.id.eq(sheetId))
        .fetch();

    return toCareSheetView(rows);
  }

  @Override
  public List<DocumentMonthlyStatusRow> findMemberStatusInRange(Long memberId, LocalDate start,
      LocalDate end) {
    return qf
        .select(new QDocumentMonthlyStatusRow(
            doc.date,sheet.id,report.id,doc.status
        ))
        .from(doc)
        .leftJoin(sheet).on(sheet.id.eq(doc.id))
        .leftJoin(report).on(report.id.eq(doc.id))
        .where(
            doc.member.id.eq(memberId),
            doc.date.between(start, end)
        )
        .orderBy(doc.date.asc())
        .fetch();
  }

  @Override
  public List<DocumentMetaView> findDocumentMetaViewList(
      Long centerId,
      LocalDate date,
      Long writerId,
      List<DocumentStatus> statuses,
      String nameLike
  ) {
    BooleanExpression statusFilter = docStatusIn(statuses);

    BooleanExpression nameFilter = hasText(nameLike)
        ? member.name.containsIgnoreCase(nameLike.trim())
        : null;

    var base = qf
        .select(new QDocumentMetaView(doc, member, staff))
        .from(doc)
        .join(doc.member, member)
        .where(
            doc.center.id.eq(centerId),
            doc.date.eq(date),
            statusFilter,
            nameFilter
        );

    // 분기: writerId 유무에 따라 join/where 설정
    if (writerId != null) {
      base.innerJoin(doc.careSheet, sheet)
          .innerJoin(sheet.writer, staff)
          .where(staff.id.eq(writerId));
    } else {
      base.leftJoin(doc.careSheet, sheet)
          .leftJoin(sheet.writer, staff);
    }

    if (log.isDebugEnabled()) {
      log.debug("[findDocumentMetaViewList] centerId={}, date={}, writerId={}, nameLike={}",
          centerId, date, writerId, nameLike);
      log.debug("[findDocumentMetaViewList] JPQL = {}", base);
    }

    return base
        .orderBy(doc.updatedAt.desc())
        .fetch();
  }


  private CareSheetInitRow fetchCareSheetInitRow(Long memberId, LocalDate date, Long writerId) {
    var subs = buildPrevAggSubqueries(memberId, date);
    BooleanExpression hasFollowingVital = buildHasFollowingVital(memberId, date);
    BooleanExpression writerOn = buildWriterOn(writerId);

    return qf.select(new QCareSheetInitRow(
            doc,
            sheet.id.isNull(),
            staff,
            doc.member,
            subs.prevAggCount,
            subs.prevSumSystolic,
            subs.prevSumDiastolic,
            subs.prevSumTempT,
            subs.prevSumStool,
            subs.prevSumUrine,
            subs.prevSumHealthScore,
            hasFollowingVital
        ))
        .from(doc)
        .leftJoin(sheet).on(sheet.id.eq(doc.id))
        .leftJoin(staff).on(writerOn)
        .where(
            doc.member.id.eq(memberId),
            doc.date.eq(date)
        )
        .fetchOne();
  }

  private PrevAggSubs buildPrevAggSubqueries(Long memberId, LocalDate date) {
    QDocument dPrev = new QDocument("dPrev");
    QVital vPrev = new QVital("vPrev");

    SubQueryExpression<LocalDate> prevDateSub = JPAExpressions
        .select(dPrev.date.max())
        .from(dPrev)
        .where(
            dPrev.member.id.eq(memberId),
            dPrev.date.lt(date)
        );

    SubQueryExpression<Integer> prevAggCount = JPAExpressions
        .select(vPrev.aggregate.aggCount)
        .from(vPrev)
        .join(vPrev.document, dPrev)
        .where(
            dPrev.member.id.eq(memberId),
            dPrev.date.eq(prevDateSub)
        );

    SubQueryExpression<Long> prevSumSystolic = JPAExpressions
        .select(vPrev.aggregate.sumSystolic)
        .from(vPrev)
        .join(vPrev.document, dPrev)
        .where(
            dPrev.member.id.eq(memberId),
            dPrev.date.eq(prevDateSub)
        );

    SubQueryExpression<Long> prevSumDiastolic = JPAExpressions
        .select(vPrev.aggregate.sumDiastolic)
        .from(vPrev)
        .join(vPrev.document, dPrev)
        .where(
            dPrev.member.id.eq(memberId),
            dPrev.date.eq(prevDateSub)
        );

    SubQueryExpression<Long> prevSumTempT = JPAExpressions
        .select(vPrev.aggregate.sumTemperatureTenths)
        .from(vPrev)
        .join(vPrev.document, dPrev)
        .where(
            dPrev.member.id.eq(memberId),
            dPrev.date.eq(prevDateSub)
        );

    SubQueryExpression<Long> prevSumStool = JPAExpressions
        .select(vPrev.aggregate.sumStool)
        .from(vPrev)
        .join(vPrev.document, dPrev)
        .where(
            dPrev.member.id.eq(memberId),
            dPrev.date.eq(prevDateSub)
        );

    SubQueryExpression<Long> prevSumUrine = JPAExpressions
        .select(vPrev.aggregate.sumUrine)
        .from(vPrev)
        .join(vPrev.document, dPrev)
        .where(
            dPrev.member.id.eq(memberId),
            dPrev.date.eq(prevDateSub)
        );

    SubQueryExpression<Long> prevSumHealthScore = JPAExpressions
        .select(vPrev.aggregate.sumHealthScore)
        .from(vPrev)
        .join(vPrev.document, dPrev)
        .where(
            dPrev.member.id.eq(memberId),
            dPrev.date.eq(prevDateSub)
        );

    return new PrevAggSubs(
        prevAggCount, prevSumSystolic, prevSumDiastolic, prevSumTempT,
        prevSumStool, prevSumUrine, prevSumHealthScore
    );
  }

  private BooleanExpression buildHasFollowingVital(Long memberId, LocalDate date) {
    QDocument dNext = new QDocument("dNext");
    QVital vNext = new QVital("vNext");
    return JPAExpressions
        .selectOne()
        .from(vNext)
        .join(vNext.document, dNext)
        .where(
            dNext.member.id.eq(memberId),
            dNext.date.gt(date)
        )
        .exists();
  }

  private BooleanExpression buildWriterOn(Long writerId) {
    return (writerId != null) ? staff.id.eq(writerId) : Expressions.TRUE.isTrue();
  }

  private JPAQuery<Tuple> baseSheetWithVitalQuery() {
    return qf
        .select(
            doc.id,
            doc.member.id,
            doc.member.username,
            doc.date,
            sheet,
            vital,
            staff.id,
            personalProgram
        )
        .from(doc)
        .leftJoin(sheet).on(sheet.id.eq(doc.id))
        .leftJoin(vital).on(vital.id.eq(doc.id))
        .leftJoin(staff).on(staff.eq(sheet.writer))
        .leftJoin(personalProgram).on(personalProgram.careSheet.eq(sheet));
  }

  private Optional<CareSheetView> toCareSheetView(List<Tuple> rows) {
    if (rows == null || rows.isEmpty()) {
      return Optional.empty();
    }

    Tuple first = rows.get(0);
    Long docId = first.get(doc.id);
    Long baseMemberId = first.get(doc.member.id);
    String memberCode = first.get(doc.member.username);
    LocalDate theDate = first.get(doc.date);
    CareSheet cs = first.get(sheet);
    Vital vt = first.get(vital);
    Long writerId = first.get(staff.id);

    List<PersonalProgram> programs = aggregateProgramsFromRows(rows);

    CareSheetView view = new CareSheetView(
        docId, writerId, baseMemberId, memberCode, theDate,
        cs, vt, programs
    );
    return Optional.of(view);
  }

  private List<PersonalProgram> aggregateProgramsFromRows(List<Tuple> rows) {
    Map<Long, PersonalProgram> programMap = new LinkedHashMap<>();
    for (Tuple r : rows) {
      PersonalProgram pp = r.get(personalProgram);
      if (pp != null) {
        programMap.putIfAbsent(pp.getId(), pp);
      }
    }
    return new ArrayList<>(programMap.values());
  }

  private BooleanExpression docStatusIn(List<DocumentStatus> statuses) {
    if (statuses == null || statuses.isEmpty()) {
      return null;
    }
    EnumSet<DocumentStatus> set = EnumSet.noneOf(DocumentStatus.class);
    for (DocumentStatus s : statuses) {
      if (s != null) {
        set.add(s);
      }
    }
    return set.isEmpty() ? null : doc.status.in(set);
  }

  private static boolean hasText(String s) {
    return s != null && !s.isBlank();
  }

  private record PrevAggSubs(
      SubQueryExpression<Integer> prevAggCount,
      SubQueryExpression<Long> prevSumSystolic,
      SubQueryExpression<Long> prevSumDiastolic,
      SubQueryExpression<Long> prevSumTempT,
      SubQueryExpression<Long> prevSumStool,
      SubQueryExpression<Long> prevSumUrine,
      SubQueryExpression<Long> prevSumHealthScore
  ) {

  }

}

