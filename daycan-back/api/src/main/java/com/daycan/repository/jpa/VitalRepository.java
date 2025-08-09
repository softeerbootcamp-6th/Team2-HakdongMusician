package com.daycan.repository.jpa;


import com.daycan.domain.entity.Vital;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VitalRepository extends JpaRepository<Vital, Long> {

  Optional<Vital> findByDocumentId(Long documentId);

  // 멤버 + 일자 조합으로 바로 찾고 싶을 때 (Document 조인)
  @Query("""
      select v from Vital v
      where v.document.member.id = :memberId
        and v.document.docDate = :docDate
      """)
  Optional<Vital> findByMemberAndDate(@Param("memberId") Long memberId,
      @Param("docDate") LocalDate docDate);
}
