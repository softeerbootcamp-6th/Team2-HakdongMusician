package com.daycan.repository.jpa;

import com.daycan.domain.entity.document.CareSheet;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CareSheetRepository extends JpaRepository<CareSheet, Long> {

  Optional<CareSheet> findByDocumentMemberIdAndDocumentDate(Long memberId, LocalDate date);

  boolean existsByDocumentMemberIdAndDocumentDate(Long memberId, LocalDate date);
}
