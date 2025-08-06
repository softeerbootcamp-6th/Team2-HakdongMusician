package com.daycan.repository;

import com.daycan.domain.entity.Center;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterRepository extends JpaRepository<Center, String> {
  Optional<Center> findByUsername(String username);

}
