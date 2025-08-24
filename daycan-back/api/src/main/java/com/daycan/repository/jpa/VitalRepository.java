package com.daycan.repository.jpa;


import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.enums.DocumentStatus;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VitalRepository extends JpaRepository<Vital, Long> {

  Optional<Vital> findByDocumentId(Long documentId);

  Optional<Vital> findTopByDocument_Member_IdAndDocument_DateBeforeOrderByDocument_DateDesc(
      Long memberId, LocalDate date);

  boolean existsByDocument_Member_IdAndDocument_DateAfter(Long memberId, LocalDate date);

  List<Vital> findByDocument_Member_IdAndDocument_DateGreaterThanEqualOrderByDocument_DateAsc(
      Long memberId, LocalDate date);

  Optional<Vital> findTopByDocument_Member_IdAndDocument_DateBeforeAndDocument_StatusInOrderByDocument_DateDesc(
      Long memberId, LocalDate date, Collection<DocumentStatus> statuses);

  List<Vital> findByDocument_Member_IdAndDocument_DateGreaterThanEqualAndDocument_StatusInOrderByDocument_DateAsc(
      Long memberId, LocalDate fromDate, Collection<DocumentStatus> statuses);


  Optional<Vital> findByDocument_Member_idAndDocument_Date(
      Long memberId, LocalDate date);
}
