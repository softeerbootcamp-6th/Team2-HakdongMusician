package com.daycan.repository.jpa;

import com.daycan.domain.entity.Member;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.enums.Gender;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

  // --- 로그인/중복 체크 (username 전역 유니크 전제) ---
  Optional<Member> findByUsername(String username);
  // --- 활성 회원 (소프트 삭제 제외) ---
  @Query("select m from Member m where m.active = true and m.deletedAt is null")
  List<Member> findAllActive();

  List<Member> findAllByCenterIdAndActiveTrueAndAcceptReportTrue(Long centerId);
  // --- 센터별 필터링 (리스트) ---
  @Query("""
      select m from Member m
      where m.center.id = :centerId
        and m.deletedAt is null
        and (:gender is null or m.gender = :gender)
        and (:careLevel is null or m.careLevel = :careLevel)
        and (:name is null or m.name like concat('%', :name, '%'))
      """)
  List<Member> findByCenterWithFilters(
      @Param("centerId") Long centerId,
      @Param("gender") Gender gender,
      @Param("careLevel") Integer careLevel,
      @Param("name") String name
  );

  @EntityGraph(attributePaths = {
      "center"
  })
  @Query("""
    select distinct m
    from Document d
      join d.member m
    where d.date = :date
      and d.status in :statuses
      and d.center.id = :centerId
  """)
  List<Member> findMembersByDateAndStatusesAndCenter(
      @Param("date") LocalDate date,
      @Param("statuses") Collection<DocumentStatus> statuses,
      @Param("centerId") Long centerId
  );
}
