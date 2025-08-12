package com.daycan.repository.jpa;

import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.document.Document;
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
public interface DocumentRepository extends JpaRepository<Document, Long> {

  // 특정 날짜의 문서를 가진 member id 집합
  @Query("select d.member.id from Document d where d.date = :date")
  Set<Long> findMemberIdsByDate(@Param("date") LocalDate date);

  // member + date 단건/존재 체크 (이전: findById(DocumentKey...))
  Optional<Document> findByMemberIdAndDate(Long memberId, LocalDate date);

  boolean existsByMemberIdAndDate(Long memberId, LocalDate docDate);

  // 단일 필드 조회 (이전: findByIdMemberId / findByIdDate)
  List<Document> findByMemberId(Long memberId);

  List<Document> findByDate(LocalDate docDate);

  List<Document> findByMemberIdAndStatusIn(Long memberId, List<DocumentStatus> statuses);

  List<Document> findAllByMemberIdAndDate(Long memberId, LocalDate date);

  // 상태별
  List<Document> findByStatus(DocumentStatus status);

  // 최신 업데이트 순 페이징
  Page<Document> findAllByOrderByUpdatedAtDesc(Pageable pageable);

  // 센터 기준 집계/카운트 (이전: organizationId → centerId)
  @Query("""
      select count(d)
      from Document d
      where d.status in (:incompleteStatuses)
        and d.date >= :date
        and d.center.id = :centerId
      """)
  long countIncompleteFromDateByCenter(
      @Param("incompleteStatuses") List<DocumentStatus> incompleteStatuses,
      @Param("date") LocalDate date,
      @Param("centerId") Long centerId);

  @Query("""
      select count(d)
      from Document d
      where d.status in (:incompleteStatuses)
        and d.date = :date
        and d.center.id = :centerId
      """)
  long countIncompleteOnDateByCenter(
      @Param("incompleteStatuses") List<DocumentStatus> incompleteStatuses,
      @Param("date") LocalDate date,
      @Param("centerId") Long centerId);

  // 기간 조회
  List<Document> findByDateBetweenOrderByDateDesc(LocalDate startDate, LocalDate endDate);

  // 멤버 + 상태
  List<Document> findByMemberIdAndStatus(Long memberId, DocumentStatus status);

  // 센터 + 기간 + 페이징
  Page<Document> findByCenterIdAndDateBetweenOrderByDateDesc(
      Long centerId, LocalDate startDate, LocalDate endDate, Pageable pageable);


  List<Document> findDocumentByDateAndMemberIn(LocalDate date, List<Member> members);
}
