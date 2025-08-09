package com.daycan.repository;

import com.daycan.domain.entity.Center;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterRepository extends JpaRepository<Center, Long> {

  // 센터 로그인 계정이 있을 경우
  Optional<Center> findByUsername(String username);

  // 비즈니스 식별자(UNIQUE)
  Optional<Center> findByCenterCode(String centerCode);
  boolean existsByCenterCode(String centerCode);
}
