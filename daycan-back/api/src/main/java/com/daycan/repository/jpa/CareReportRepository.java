package com.daycan.repository.jpa;

import com.daycan.domain.entity.document.CareReport;
import java.time.LocalDate;
import java.util.List;

import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CareReportRepository extends JpaRepository<CareReport, Long> {

  // member 기준, 특정 일자 이전(포함)에서 최신순 상위 N (Pageable로 2개 등 제한)
  @Query("""
      select c
      from CareReport c
      where c.document.member.id = :memberId
        and c.document.date <= :date
      order by c.document.date desc
      """)
  List<CareReport> findTopByMemberAndDateBeforeEq(
      @Param("memberId") Long memberId,
      @Param("date") LocalDate date,
      Pageable pageable
  );

  // 단건 접근 편의
  Optional<CareReport> findByDocumentId(Long documentId);
}
