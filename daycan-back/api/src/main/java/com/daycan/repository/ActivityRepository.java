package com.daycan.repository;

import com.daycan.domain.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

  /**
   * 활동명으로 검색
   */
  List<Activity> findByNameContaining(String name);

  /**
   * 속성별 활동 조회
   */
  @Query("SELECT a FROM Activity a WHERE a.attribute LIKE %:attribute%")
  List<Activity> findByAttributeContaining(@Param("attribute") String attribute);

  /**
   * 모든 활동을 이름순으로 조회
   */
  List<Activity> findAllByOrderByName();
}