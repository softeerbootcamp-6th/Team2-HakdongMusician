package com.daycan.repository;

import com.daycan.domain.entity.CareReport;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface CareReportRepository extends JpaRepository<CareReport, Long> {

  /** id 이하에서 최신 2건 */
  List<CareReport> findTop2ByIdLessThanEqualOrderByIdDesc(Long id);

  /* Vital N+1 방지용 */
  @EntityGraph(attributePaths = "vital")
  Optional<CareReport> findById(Long id);
}

