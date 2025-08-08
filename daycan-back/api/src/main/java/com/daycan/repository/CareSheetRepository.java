package com.daycan.repository;

import com.daycan.domain.entity.CareSheet;
import com.daycan.domain.helper.DocumentKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CareSheetRepository extends JpaRepository<CareSheet, DocumentKey> {

}
