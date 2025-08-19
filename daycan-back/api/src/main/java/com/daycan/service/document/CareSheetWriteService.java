package com.daycan.service.document;

import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.common.response.status.error.StaffErrorStatus;
import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.document.CareReport;
import com.daycan.domain.entity.document.Document;
import com.daycan.domain.entity.document.CareSheet;
import com.daycan.domain.entity.document.PersonalProgram;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.entity.document.Vital;
import com.daycan.domain.entity.document.VitalAggregate;
import com.daycan.domain.entry.document.sheet.HealthCareEntry;
import com.daycan.domain.entry.document.sheet.PhysicalEntry;
import com.daycan.domain.model.CareReportInit;
import com.daycan.domain.model.CareSheetInitVO;
import com.daycan.api.dto.center.request.CareSheetRequest;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.exceptions.DocumentNonCreatedException;
import com.daycan.repository.jpa.CareReportRepository;
import com.daycan.repository.jpa.CareSheetRepository;
import com.daycan.repository.jpa.DocumentRepository;
import com.daycan.repository.jpa.VitalRepository;
import com.daycan.repository.query.DocumentQueryRepository;
import com.daycan.util.resolver.SheetMapper;
import com.daycan.util.prefiller.CareReportPrefiller;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CareSheetWriteService {

  private final CareSheetRepository careSheetRepository;
  private final DocumentQueryRepository documentQueryRepository;
  private final CareReportRepository careReportRepository;
  private final VitalRepository vitalRepository;
  private final DocumentRepository documentRepository;

  @Transactional(propagation = Propagation.MANDATORY)
  protected Long writeSheet(CareSheetRequest req) {
    CareSheetInitVO init = fetchInitOrThrow(req);
    validateStaff(init, req);

    boolean isNew = init.isNew();
    Document doc = init.doc();
    Staff staff = init.staff();

    List<PersonalProgram> programs = mapPrograms(req);

    CareSheet sheet = isNew
        ? createSheet(doc, req, staff, programs)
        : updateSheet(doc, req, programs);
    log.info("flag 1");
    Vital vital = upsertVital(doc, req.healthCare(), req.physical(), init.prevAgg());

    doc.markSheetDone();

    CareReport report = createReport(sheet, vital, init.member(), init.prevAgg(),
        init.hasFollowingVital());

    doc.markReportPending();

    logSheet(sheet, req, isNew);

    doc = documentRepository.save(doc);
    return doc.getId();
  }

  private CareSheetInitVO fetchInitOrThrow(CareSheetRequest req) {
    return documentQueryRepository
        .fetchCareSheetInit(req.memberId(), req.date(), req.writerId())
        .orElseThrow(DocumentNonCreatedException::new);
  }

  private void validateStaff(CareSheetInitVO init, CareSheetRequest req) {
    if (init.staff() == null) {
      throw new ApplicationException(StaffErrorStatus.NOT_FOUND, req.writerId());
    }
  }

  private List<PersonalProgram> mapPrograms(CareSheetRequest req) {
    return SheetMapper.toPersonalPrograms(req.recoveryProgram().programEntries());
  }

  private CareSheet createSheet(Document doc,
      CareSheetRequest req,
      Staff staff,
      List<PersonalProgram> programs) {
    CareSheet sheet = SheetMapper.toEntity(doc, req, staff);
    sheet.replacePersonalPrograms(programs);
    return careSheetRepository.save(sheet);
  }

  private CareSheet updateSheet(Document doc,
      CareSheetRequest req,
      List<PersonalProgram> programs) {
    CareSheet sheet = careSheetRepository.findById(doc.getId())
        .orElseThrow(() -> new ApplicationException(DocumentErrorStatus.SHEET_NOT_FOUND));
    SheetMapper.updateSheet(sheet, req);
    sheet.replacePersonalPrograms(programs);
    return sheet; // 영속 상태
  }

  private Vital upsertVital(Document doc,
      HealthCareEntry healthCareEntry,
      PhysicalEntry physicalEntry,
      VitalAggregate baseline) {

    return vitalRepository.findByDocumentId(doc.getId())
        .map(v -> {
          v.update(
              healthCareEntry.bloodPressure().systolic(),
              healthCareEntry.bloodPressure().diastolic(),
              healthCareEntry.temperature().temperature(),
              physicalEntry.numberOfStool(),
              physicalEntry.numberOfUrine()
          );
          v.applyAggregateFrom(baseline);
          return v; // 영속 엔티티 → save 불필요
        })
        .orElseGet(() -> {
          Vital newVital = Vital.builder()
              .document(doc)
              .bloodPressureSystolic(healthCareEntry.bloodPressure().systolic())
              .bloodPressureDiastolic(healthCareEntry.bloodPressure().diastolic())
              .temperature(healthCareEntry.temperature().temperature())
              .numberOfStool(physicalEntry.numberOfStool())
              .numberOfUrine(physicalEntry.numberOfUrine())
              .build();
          newVital.applyAggregateFrom(baseline);
          return vitalRepository.save(newVital);
        });
  }

  private CareReport createReport(CareSheet sheet,
      Vital vital,
      Member member,
      VitalAggregate baseline,
      boolean hasFollowingVital) {
    Document doc = (sheet != null) ? sheet.getDocument() : vital.getDocument();

    CareReportInit init = CareReportPrefiller.computeInit(sheet, vital, member);
    CareReport report = CareReport.prefill(doc, init);

    Integer newScore = report.getTotalScore();
    if (!Objects.equals(vital.getHealthScore(), newScore)) {
      vital.setHealthScore(newScore);

      if (hasFollowingVital) {
        recomputeChainFromInclusive(doc.getMember().getId(), doc.getDate());
      } else {
        vital.applyAggregateFrom(baseline);
      }
    }

    return careReportRepository.save(report);
  }

  private void recomputeChainFromInclusive(Long memberId, LocalDate fromDate) {
    Vital prev = vitalRepository
        .findTopByDocument_Member_IdAndDocument_DateBeforeOrderByDocument_DateDesc(memberId,
            fromDate)
        .orElse(null);

    VitalAggregate agg = (prev == null) ? null : prev.getAggregate();

    List<Vital> chain = vitalRepository
        .findByDocument_Member_IdAndDocument_DateGreaterThanEqualOrderByDocument_DateAsc(memberId,
            fromDate);

    if (chain.isEmpty()) {
      return;
    }

    for (Vital v : chain) {
      v.applyAggregateFrom(agg);
      agg = v.getAggregate();
    }
  }

  private void logSheet(CareSheet savedSheet, CareSheetRequest req, boolean isNew) {
    log.debug("[CareSheet] id={} date={} {}", savedSheet.getId(), req.date(),
        isNew ? "created" : "updated");
  }
}
