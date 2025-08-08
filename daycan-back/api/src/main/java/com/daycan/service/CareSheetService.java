package com.daycan.service;

import com.daycan.domain.entity.Document;
import com.daycan.domain.helper.DocumentKey;
import com.daycan.domain.entity.CareSheet;
import com.daycan.dto.admin.request.CareSheetRequest;
import com.daycan.exceptions.DocumentNonCreatedException;
import com.daycan.repository.CareSheetRepository;
import com.daycan.repository.DocumentRepository;
import com.daycan.utils.CareSheetMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CareSheetService {

  private final CareSheetRepository careSheetRepository;
  private final DocumentRepository documentRepository;

  /**
   * 기록지 생성‧수정
   * <p>
   * [ 흐름 ] 1. 요청된 recipientId와 date로 Document 조회 (문서가 미리 생성되어 있어야 함) 2. CareSheet 존재 여부 확인 - 존재하지
   * 않으면 신규 생성 - 존재하면 수정 3. Document 상태 COMPLETED로 갱신
   */
  protected void createCareSheet(CareSheetRequest req) {

    // 해당 수급자/날짜의 문서(PK 공유)를 조회
    Document doc = documentRepository.findById(
        DocumentKey.of(req.recipientId(), req.date())
    ).orElseThrow(DocumentNonCreatedException::new);

    CareSheet saved;
    boolean isNew = !careSheetRepository.existsById(doc.getId());
    // CareSheet 존재 여부에 따라 분기
    if (isNew) {
      // 신규 작성
      CareSheet entity = CareSheetMapper.toEntity(doc, req);
      saved = careSheetRepository.save(entity);

    } else {
      // 수정
      CareSheet sheet = careSheetRepository.findById(doc.getId())
          .orElseThrow(() -> new EntityNotFoundException("CareSheet " + doc.getId()));

      CareSheetMapper.update(sheet, req);
      saved = sheet;
    }

    // 문서 상태 COMPLETED 로 변경 (작성 완료 처리)
    doc.sheetDone();

    log.info("[CareSheet] {} ({}) {}", saved.getId(),
        req.date(), isNew ? "created" : "updated");

  }
}
