package com.daycan.repository.jpa;

import com.daycan.domain.entity.Center;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.StaffRole;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

  Optional<Staff> findTop1ByCenterAndNameOrderByIdAsc(Center center, String name);
  Optional<Staff> findTop1ByCenterOrderByIdAsc(Center center); // 필요시 fallback

  // 센터별 + 필터(리스트)
  @Query("""
      select s
      from Staff s
      where s.center.id = :centerId
        and (:staffRole is null or s.staffRole = :staffRole)
        and (:gender    is null or s.gender    = :gender)
        and (:name      is null or s.name like concat('%', :name, '%'))
      """)
  List<Staff> findByCenterWithFilters(
      @Param("centerId") Long centerId,
      @Param("staffRole") StaffRole staffRole,
      @Param("gender") Gender gender,
      @Param("name") String name
  );

  // 센터별 + 필터(페이징)
  @Query("""
      select s
      from Staff s
      where s.center.id = :centerId
        and (:staffRole is null or s.staffRole = :staffRole)
        and (:gender    is null or s.gender    = :gender)
        and (:name      is null or s.name like concat('%', :name, '%'))
      """)
  Page<Staff> findPageByCenterWithFilters(
      @Param("centerId") Long centerId,
      @Param("staffRole") StaffRole staffRole,
      @Param("gender") Gender gender,
      @Param("name") String name,
      Pageable pageable
  );

  // 단건 조회(센터 소속 검증 포함)
  Optional<Staff> findByIdAndCenterId(Long id, Long centerId);

  // 단순 센터별 전체
  List<Staff> findByCenterId(Long centerId);
}
