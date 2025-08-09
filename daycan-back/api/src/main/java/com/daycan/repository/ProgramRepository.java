package com.daycan.repository;

import com.daycan.domain.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {

  /**
   * 활동명으로 검색
   */
  List<Program> findByNameContaining(String name);

  // 특정 센터에서 최근
  /**
   * 모든 활동을 이름순으로 조회
   */
  List<Program> findAllByOrderByName();
}