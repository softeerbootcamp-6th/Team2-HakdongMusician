package com.daycan.repository;

import com.daycan.domain.entity.Document;
import com.daycan.domain.helper.DocumentKey;
import com.daycan.domain.enums.DocumentStatus;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document, DocumentKey> {

  @Query("SELECT d.id.memberId FROM Document d WHERE d.id.date = :date")
  Set<String> findMemberIdsByDate(@Param("date") LocalDate date);

  default Optional<Document> findByMemberIdAndDate(String memberId, LocalDate date) {
    return findById(DocumentKey.of(memberId, date));
  }

  default boolean existsByMemberIdAndDate(String memberId, LocalDate date) {
    return existsById(DocumentKey.of(memberId, date));
  }

  List<Document> findByIdMemberId(String memberId);

  List<Document> findByIdDate(LocalDate date);

  List<Document> findByStatus(DocumentStatus status);

  Page<Document> findAllByOrderByUpdatedAtDesc(Pageable pageable);

  @Query("""
      SELECT COUNT(d)
      FROM Document d
      WHERE d.status IN (:incompleteStatuses)
        AND d.id.date >= :date
        AND d.organizationId = :organizationId
      """)
  long countByStatusInAndGreaterOrEqualsThanDateAndOrganizationId(
      @Param("incompleteStatuses") List<DocumentStatus> incompleteStatuses,
      @Param("date") LocalDate date,
      @Param("organizationId") String organizationId);

  @Query("""
      SELECT COUNT(d)
      FROM Document d
      WHERE d.status IN (:incompleteStatuses)
        AND d.id.date = :date
        AND d.organizationId = :organizationId
      """)
  long countByStatusInAndDateAndOrganizationId(
      @Param("incompleteStatuses") List<DocumentStatus> incompleteStatuses,
      @Param("date") LocalDate date,
      @Param("organizationId") String organizationId);

  List<Document> findByIdDateBetweenOrderByIdDateDesc(LocalDate startDate, LocalDate endDate);

  List<Document> findByIdMemberIdAndStatus(String memberId, DocumentStatus status);
}
