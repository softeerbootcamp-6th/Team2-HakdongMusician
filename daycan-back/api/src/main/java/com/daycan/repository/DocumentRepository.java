package com.daycan.repository;

import com.daycan.domain.entity.Document;
import com.daycan.domain.enums.DocumentStatus;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

  /**
   * 회원 ID로 문서 조회
   */
  List<Document> findByMemberId(String memberId);

  /**
   * 날짜로 문서 조회
   */
  List<Document> findByDate(LocalDate date);

  /**
   * 상태로 문서 조회
   */
  List<Document> findByStatus(DocumentStatus status);

  /**
   * 회원 ID와 날짜로 문서 조회
   */
  List<Document> findByMemberIdAndDate(String memberId, LocalDate date);

  /**
   * 페이지별 문서 상태 조회 (최신순)
   */
  Page<Document> findAllByOrderByUpdatedAtDesc(Pageable pageable);

  @Query("SELECT COUNT(d) FROM Document d WHERE d.status IN (:incompleteStatuses) AND d.date >= :date")
  long countByStatusInAndGreaterOrEqualsThanDateAndOrganizationId(
      @Param("incompleteStatuses") List<DocumentStatus> incompleteStatuses,
      @Param("date") LocalDate date,
      @Param("organizationId") String organizationId);

  @Query("SELECT COUNT(d) FROM Document d WHERE d.status IN (:incompleteStatuses) AND d.date = :date")
  long countByStatusInAndDateAndOrganizationId(
      @Param("incompleteStatuses") List<DocumentStatus> incompleteStatuses,
      @Param("date") LocalDate date,
      @Param("organizationId") String organizationId);

  /**
   * 날짜 범위별 문서 조회
   */
  List<Document> findByDateBetweenOrderByDateDesc(LocalDate startDate, LocalDate endDate);

  /**
   * 회원 ID와 상태로 문서 조회
   */
  List<Document> findByMemberIdAndStatus(String memberId, DocumentStatus status);
}