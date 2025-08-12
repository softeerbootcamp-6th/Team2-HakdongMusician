package com.daycan.repository.query;

import com.daycan.domain.entity.QMember;
import com.daycan.domain.entity.document.QCareReport;
import com.daycan.domain.entry.document.vital.BloodPressureEntry;
import com.daycan.domain.entry.document.vital.TemperatureEntry;
import com.daycan.domain.entry.document.sheet.CognitiveEntry;
import com.daycan.domain.entry.document.sheet.HealthCareEntry;
import com.daycan.domain.entry.document.sheet.MealSupport;
import com.daycan.domain.entry.document.sheet.PhysicalEntry;
import com.daycan.domain.entry.document.sheet.ProgramEntry;
import com.daycan.domain.entity.document.QCareSheet;
import com.daycan.domain.entity.document.QDocument;
import com.daycan.domain.entity.QStaff;
import com.daycan.domain.entity.document.QPersonalProgram;
import com.daycan.domain.entity.document.QVital;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.CareSheetInitVO;
import com.daycan.domain.model.CareSheetMetaView;
import com.daycan.domain.model.CareSheetView;
import com.daycan.domain.model.DocumentMonthlyStatusRow;
import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
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
            staff                        // Staff (없으면 null)
        ))
        .from(doc)
        .leftJoin(careSheet).on(careSheet.id.eq(doc.id)) // 공유 PK(= doc.id) 기반
        .leftJoin(staff).on(staff.id.eq(writerId)) // writerId로 단일 행만 붙임
        .where(doc.member.id.eq(memberId),
            doc.date.eq(date))
        .fetchOne();

    return Optional.ofNullable(row);
  }

  @Override
  public Optional<CareSheetView> fetchSheetWithVital(Long memberId, LocalDate date) {
    Map<Long, CareSheetView> result = qf
        .from(doc)
        .leftJoin(careSheet).on(careSheet.id.eq(doc.id))
        .leftJoin(vital).on(vital.id.eq(doc.id))
        .leftJoin(staff).on(staff.eq(careSheet.writer))
        .leftJoin(personalProgram).on(personalProgram.careSheet.eq(careSheet))
        .where(doc.member.id.eq(memberId), doc.date.eq(date))
        .transform(GroupBy.groupBy(doc.id).as(
            Projections.constructor(CareSheetView.class,
                doc.id,
                staff.id,
                doc.member.id,
                doc.member.username,
                doc.date,
                careSheet.arrivalTime,
                careSheet.endTime,
                careSheet.vehicleNumber,
                Projections.constructor(PhysicalEntry.class,
                    careSheet.washCare,
                    careSheet.mobilityCare,
                    careSheet.bathingCare,
                    careSheet.bathingDurationMinutes,
                    careSheet.bathingType,
                    Projections.constructor(MealSupport.class,
                        careSheet.breakfast.provided,
                        careSheet.breakfast.type,
                        careSheet.breakfast.amount),
                    Projections.constructor(MealSupport.class,
                        careSheet.lunch.provided,
                        careSheet.lunch.type,
                        careSheet.lunch.amount),
                    Projections.constructor(MealSupport.class,
                        careSheet.dinner.provided,
                        careSheet.dinner.type,
                        careSheet.dinner.amount),
                    vital.numberOfStool,
                    vital.numberOfUrine,
                    careSheet.physicalComment
                ),
                Projections.constructor(CognitiveEntry.class,
                    careSheet.cognitiveSupport,
                    careSheet.communicationSupport,
                    careSheet.cognitiveComment
                ),
                Projections.constructor(HealthCareEntry.class,
                    careSheet.healthCare,
                    careSheet.nursingCare,
                    careSheet.emergencyService,
                    Projections.constructor(
                        BloodPressureEntry.class, vital.bloodPressureSystolic, vital.bloodPressureDiastolic),
                    Projections.constructor(TemperatureEntry.class, vital.temperature),
                    careSheet.healthComment
                ),
                GroupBy.list(
                    Projections.constructor(ProgramEntry.class, personalProgram.type, personalProgram.programName, personalProgram.score)
                ),
                careSheet.functionalComment
            )
        ));

    return result.values().stream().findFirst();
  }


  @Override
  public Page<CareSheetMetaView> findMetaViewsByCenterAndDate(
      Long centerId,
      LocalDate date,
      Long writerId,
      List<DocumentStatus> statuses,
      Pageable pageable
  ) {
    BooleanExpression writerFilter =
        (writerId == null) ? null : staff.id.eq(writerId);

    BooleanExpression statusFilter = docStatusIn(statuses);

    // content
    List<CareSheetMetaView> content = qf
        .select(Projections.constructor(CareSheetMetaView.class, doc, member, staff))
        .from(doc)
        .join(doc.member, member)
        .leftJoin(doc.careSheet, careSheet)
        .leftJoin(careSheet.writer, staff)
        .where(
            doc.center.id.eq(centerId),
            doc.date.eq(date),
            writerFilter,
            statusFilter
        )
        .orderBy(doc.updatedAt.desc())
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .fetch();

    // count (writerId는 exists 서브쿼리로)
    QCareSheet cs2 = new QCareSheet("cs2");
    JPAQuery<Long> countQuery = qf
        .select(doc.count())
        .from(doc)
        .where(
            doc.center.id.eq(centerId),
            doc.date.eq(date),
            (writerId == null) ? null :
                JPAExpressions.selectOne()
                    .from(cs2)
                    .where(cs2.id.eq(doc.id), cs2.writer.id.eq(writerId))
                    .exists(),
            statusFilter
        );

    return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
  }

  private BooleanExpression docStatusIn(List<DocumentStatus> statuses) {
    if (statuses == null || statuses.isEmpty()) return null;
    return doc.status.in(statuses);
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


}

