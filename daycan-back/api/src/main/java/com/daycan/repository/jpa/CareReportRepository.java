package com.daycan.repository.jpa;

import com.daycan.domain.entity.document.CareReport;
import com.daycan.domain.enums.DocumentStatus;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CareReportRepository extends JpaRepository<CareReport, Long> {

  @Query("""
      select c
      from CareReport c
      where c.document.member.id = :memberId
        and c.document.date <= :date
        and c.document.status in :statuses
      order by c.document.date desc
      """)
  List<CareReport> findTopByMemberAndDateBeforeEq(
      @Param("memberId") Long memberId,
      @Param("date") LocalDate date,
      @Param("statuses") Collection<DocumentStatus> statuses,
      Pageable pageable
  );

  @Query("""
      select c
      from CareReport c
      where c.id = :id
      order by c.document.date desc
      """)
  List<CareReport> findTopByIdBeforeEq(
      @Param("id") Long id,
      Pageable pageable
  );

  Optional<CareReport> findByDocumentMemberIdAndDocumentDateAndDocumentStatusIn(
      Long memberId,
      LocalDate date,
      @Param("statuses") Collection<DocumentStatus> statuses
  );  // 단건 접근 편의
  Optional<CareReport> findByDocumentId(Long documentId);

  @Query("""
    select c.document.date
    from CareReport c
    where c.document.member.id = :memberId
      and c.document.date between :start and :end
      and c.document.status in :statuses
    order by c.document.date asc
    """)
  List<LocalDate> findReportedDatesInRange(
      @Param("memberId") Long memberId,
      @Param("start") LocalDate start,
      @Param("end") LocalDate end,
      @Param("statuses") Collection<DocumentStatus> statuses
  );

}
