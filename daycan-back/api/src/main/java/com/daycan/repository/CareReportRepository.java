package com.daycan.repository;

import com.daycan.domain.entity.CareReport;
import com.daycan.domain.helper.DocumentKey;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CareReportRepository extends JpaRepository<CareReport, DocumentKey> {
  @Query("""
    select c from CareReport c
    where c.id.memberId = :memberId and c.id.date <= :date
    order by c.id.date desc
    """)
  List<CareReport> findTop2ByMemberIdAndDateBeforeEqualOrderByDateDesc(
      @Param("memberId") String memberId,
      @Param("date") LocalDate date,
      Pageable pageable
  );


}
