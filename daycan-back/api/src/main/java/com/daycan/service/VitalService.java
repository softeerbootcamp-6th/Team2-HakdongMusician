package com.daycan.service;


import com.daycan.domain.entity.document.Vital;
import com.daycan.repository.jpa.VitalRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class VitalService {
  private final VitalRepository vitalRepository;

  @Transactional(readOnly = true)
  public Optional<Vital> getByDocumentId(Long documentId) {
    return vitalRepository.findByDocumentId(documentId);
  }
}
