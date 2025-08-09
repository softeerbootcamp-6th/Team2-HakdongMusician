package com.daycan.repository.jpa;

import com.daycan.domain.entity.Member;
import com.daycan.domain.enums.Gender;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

  // --- 로그인/중복 체크 (username 전역 유니크 전제) ---
  Optional<Member> findByUsername(String username);
  boolean existsByUsername(String username);

  // --- 활성 회원 (소프트 삭제 제외) ---
  @Query("select m from Member m where m.active = true and m.deletedAt is null")
  List<Member> findAllActive();

  // --- 센터별 조회 (1 Member - 1 Center) ---
  List<Member> findByCenterIdAndDeletedAtIsNull(Long centerId);
  Page<Member> findByCenterIdAndDeletedAtIsNull(Long centerId, Pageable pageable);

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

  // --- 센터별 필터링 (페이징) ---
  @Query("""
      select m from Member m
      where m.center.id = :centerId
        and m.deletedAt is null
        and (:gender is null or m.gender = :gender)
        and (:careLevel is null or m.careLevel = :careLevel)
        and (:name is null or m.name like concat('%', :name, '%'))
      """)
  Page<Member> findPageByCenterWithFilters(
      @Param("centerId") Long centerId,
      @Param("gender") Gender gender,
      @Param("careLevel") Integer careLevel,
      @Param("name") String name,
      Pageable pageable
  );

  // --- 센터별 이름 검색 ---
  List<Member> findByCenterIdAndNameContainingAndDeletedAtIsNull(Long centerId, String name);

  // --- 센터별 성별/등급 조회 ---
  List<Member> findByCenterIdAndGenderAndDeletedAtIsNull(Long centerId, Gender gender);
  List<Member> findByCenterIdAndCareLevelAndDeletedAtIsNull(Long centerId, Integer careLevel);

  // --- 센터별 회원 수 (삭제 제외) ---
  long countByCenterIdAndDeletedAtIsNull(Long centerId);

  // (과거: 같은 센터 내 username 중복 체크) → 이제 전역 유니크이므로 아래로 단순화
  // boolean existsByUsernameAndOrganizationIdAndDeletedAtIsNull(...)  <-- 삭제
}
