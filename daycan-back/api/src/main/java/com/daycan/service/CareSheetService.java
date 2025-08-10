package com.daycan.service;

import com.daycan.common.response.status.StaffErrorStatus;
import com.daycan.domain.entity.document.Document;
import com.daycan.domain.entity.document.CareSheet;
import com.daycan.domain.entity.document.PersonalProgram;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.model.CareSheetInitVO;
import com.daycan.dto.admin.request.CareSheetRequest;
import com.daycan.exceptions.ApplicationException;
import com.daycan.exceptions.DocumentNonCreatedException;
import com.daycan.repository.jpa.CareSheetRepository;
import com.daycan.repository.jpa.VitalRepository;
import com.daycan.repository.querydsl.DocumentQueryRepository;
import com.daycan.utils.SheetMapper;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
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
   * 기록지 생성,수정 흐름:
   * <p>
   * Document 조회(없으면 DocumentService에서 생성)
   * <p>
   * CareSheet 존재 여부에 따라 생성/수정
   * <p>
   * Document 상태 갱신
   */
  protected Long writeSheet(CareSheetRequest req) {

    // memberId & docDate로 조회(문서 + 작성자 + 신규여부)
    CareSheetInitVO vo = documentQueryRepository
        .fetchCareSheetInit(req.memberId(), req.date(), req.writerId())
        .orElseThrow(DocumentNonCreatedException::new);

    if (vo.staff() == null) {
      throw new ApplicationException(StaffErrorStatus.NOT_FOUND, req.writerId());
    }

    boolean isNew = vo.isNew();
    Document doc = vo.doc();
    Staff staff = vo.staff();

    // ── PersonalProgram 매핑 (careSheet 없이 생성)
    List<PersonalProgram> programs = SheetMapper.toPersonalPrograms(
        req.recoveryProgram().programEntries());

    CareSheet savedSheet;
    if (isNew) {
      // CareSheet 생성 -> 프로그램들 연결
      CareSheet sheet = SheetMapper.toCareSheet(doc, req, staff);
      sheet.replacePersonalPrograms(programs);
      savedSheet = careSheetRepository.save(sheet); // cascade=ALL로 PersonalProgram들도 저장
    } else {
      // 기존 시트 로딩 후 값/프로그램 교체
      CareSheet sheet = careSheetRepository.findById(doc.getId())
          .orElseThrow(() -> new EntityNotFoundException("CareSheet " + doc.getId()));

      SheetMapper.updateSheet(sheet, req);
      sheet.replacePersonalPrograms(programs); // add가 아니라 replace!
      savedSheet = sheet; // 영속상태라 save 불필요하지만, 명시 save 원하면 호출해도 OK
    }

    Vital vital = vitalRepository.findByDocumentId(doc.getId())
        .map(v -> updateVital(v, req))
        .orElseGet(() -> SheetMapper.toVital(doc, req));
    doc.sheetDone();
    vitalRepository.save(vital);

    log.debug("[CareSheet] id={} vital={} date={} {}",
        savedSheet.getId(),
        vital.getId(),
        req.date(),
        isNew ? "created" : "updated");

    return savedSheet.getId();
  }


  private Vital updateVital(Vital vital, CareSheetRequest req) {
    vital.update(
        req.healthCare().bloodPressure().systolic(),
        req.healthCare().bloodPressure().diastolic(),
        req.healthCare().temperature().temperature(),
        req.physical().numberOfStool(),
        req.physical().numberOfUrine()
    );
    return vital;
  }


}
