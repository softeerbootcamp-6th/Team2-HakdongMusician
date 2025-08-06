package com.daycan.repository;

import com.daycan.domain.entity.Staff;
import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.StaffRole;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

  @Query("SELECT s FROM Staff s WHERE s.organizationId = :organizationId " +
      "AND (:role IS NULL OR s.staffRole = :staffRole) " +
      "AND (:gender IS NULL OR s.gender = :gender) " +
      "AND (:name IS NULL OR s.name LIKE %:name%)")
  List<Staff> findByOrganizationIdWithFilters(
      @Param("organizationId") String organizationId,
      @Param("staffRole") StaffRole staffRole,
      @Param("gender") Gender gender,
      @Param("name") String name);

  Optional<Staff> findByIdAndOrganizationId(Long id, String organizationId);
}