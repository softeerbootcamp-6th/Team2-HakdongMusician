package com.daycan.repository;


import com.daycan.domain.entity.Vital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VitalRepository extends JpaRepository<Vital, Long> {


}
