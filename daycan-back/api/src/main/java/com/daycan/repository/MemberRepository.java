package com.daycan.repository;

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
public interface MemberRepository extends JpaRepository<Member, String> {


  Optional<Member> findByUsernameAndActiveIsTrue(String id);
  /**
   * 센터별 전체 회원 조회
   */
  List<Member> findByOrganizationIdAndDeletedAtIsNull(String organizationId);

  /**
   * 센터별 회원 조회 (페이징)
   */
  Page<Member> findByOrganizationIdAndDeletedAtIsNull(String organizationId, Pageable pageable);

  /**
   * 센터별 회원 조회 (소프트 삭제 제외)
   */
  @Query("select m from Member m where m.active = true")
  List<Member> findAllActive();
  /**
   * 센터별 회원 조회 with 필터링 (성별, 장기요양등급, 이름)
   */
  @Query("SELECT m FROM Member m WHERE m.organizationId = :organizationId " +
      "AND m.deletedAt IS NULL " +
      "AND (:gender IS NULL OR m.gender = :gender) " +
      "AND (:careLevel IS NULL OR m.careLevel = :careLevel) " +
      "AND (:name IS NULL OR m.name LIKE %:name%)")
  List<Member> findByOrganizationIdWithFilters(
      @Param("organizationId") String organizationId,
      @Param("gender") Gender gender,
      @Param("careLevel") Integer careLevel,
      @Param("name") String name);

  /**
   * 센터별 회원 조회 with 필터링 (페이징) 정렬 ① 이름 (가나다, 오름차순, 한글이 영어보다 우선) → ② 장기요양등급(오름차순, ‘인지 지원' 등급은 6으로 인식)
   * → ③ 생년월일(연장자 우선, 오름차순) → ④ 성별(남 > 여) → ⑤ 장기요양인정번호(오름차순) → ⑥ 보호자 연락처 (오름차순)
   */
  @Query("SELECT m FROM Member m WHERE m.organizationId = :organizationId " +
      "AND m.deletedAt IS NULL " +
      "AND (:gender IS NULL OR m.gender = :gender) " +
      "AND (:careLevel IS NULL OR m.careLevel = :careLevel) " +
      "AND (:name IS NULL OR m.name LIKE %:name%)" +
      "ORDER BY m.name, m.careLevel, m.birthDate, m.gender, m.username, m.guardianPhoneNumber"
  )
  Page<Member> findByOrganizationIdWithFilters(
      @Param("organizationId") String organizationId,
      @Param("gender") Gender gender,
      @Param("careLevel") Integer careLevel,
      @Param("name") String name,
      Pageable pageable);

  /**
   * 센터 내에서 특정 회원 조회 (소프트 삭제 제외)
   */
  Optional<Member> findByUsername(String username);

  /**
   * 센터별 회원명으로 검색
   */
  List<Member> findByOrganizationIdAndNameContainingAndDeletedAtIsNull(String organizationId,
      String name);

  /**
   * 센터별 성별로 회원 조회
   */
  List<Member> findByOrganizationIdAndGenderAndDeletedAtIsNull(String organizationId,
      Gender gender);

  /**
   * 센터별 장기요양등급으로 회원 조회
   */
  List<Member> findByOrganizationIdAndCareLevelAndDeletedAtIsNull(String organizationId,
      Integer careLevel);

  /**
   * 센터별 회원 수 조회 (삭제되지 않은 회원만)
   */
  long countByOrganizationIdAndDeletedAtIsNull(String organizationId);

  /**
   * 장기요양인정번호 중복 체크 (같은 센터 내에서)
   */
  boolean existsByUsernameAndOrganizationIdAndDeletedAtIsNull(String username,
      String organizationId);
}