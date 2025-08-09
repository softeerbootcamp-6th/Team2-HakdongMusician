package com.daycan.service;

import com.daycan.common.response.status.StaffErrorStatus;
import com.daycan.domain.entity.Document;
import com.daycan.domain.entity.CareSheet;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.entity.Vital;
import com.daycan.domain.model.CareSheetInitVO;
import com.daycan.dto.admin.request.CareSheetRequest;
import com.daycan.exceptions.ApplicationException;
import com.daycan.exceptions.DocumentNonCreatedException;
import com.daycan.repository.jpa.CareSheetRepository;
import com.daycan.repository.jpa.DocumentRepository;
import com.daycan.repository.jpa.StaffRepository;
import com.daycan.repository.jpa.VitalRepository;
import com.daycan.repository.querydsl.DocumentQueryRepository;
import com.daycan.utils.SheetMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CareSheetService {

  private final CareSheetRepository careSheetRepository;

  private final DocumentQueryRepository documentQueryRepository;
  private final VitalRepository vitalRepository;

  /**
   * 기록지 생성‧수정 흐름: 1) Document 조회(없으면 DocumentService에서 생성) 2) CareSheet 존재 여부에 따라 생성/수정 3) Document
   * 상태 갱신
   */
  protected Long writeSheet(CareSheetRequest req) {

    // memberId & docDate로 조회
    CareSheetInitVO vo = documentQueryRepository
        .fetchCareSheetInit(req.memberId(), req.date(), req.writerId())
        .orElseThrow(DocumentNonCreatedException::new);

    if (vo.staff() == null) {
      throw new ApplicationException(StaffErrorStatus.NOT_FOUND, req.writerId());
    }

    boolean isNew = vo.isNew();
    Document doc = vo.doc();
    Staff staff = vo.staff();

    CareSheet savedSheet;
    Vital savedVital;
    if (isNew) {
      savedVital = SheetMapper.toVital(doc, req);
      CareSheet careSheet = SheetMapper.toCareSheet(doc, req, staff);
      savedSheet = careSheetRepository.save(careSheet);
      savedVital = vitalRepository.save(savedVital); // Vital은 항상 새로 저장
    } else {
      CareSheet sheet = careSheetRepository.findById(doc.getId())
          .orElseThrow(() -> new EntityNotFoundException("CareSheet " + doc.getId()));
      SheetMapper.updateSheet(sheet, req);
      savedSheet = sheet;
      savedVital = SheetMapper.toVital(doc, req); // Vital은 항상 새로 저장
    }

    doc.sheetDone(); // 상태 갱신(영속 상태라 flush 시 반영)

    log.debug("[CareSheet] {}  vital: {} ({}) {},", savedSheet.getId(), savedVital.getId(),
        req.date(), isNew ? "created" : "updated");

    return savedSheet.getId();
  }
}
