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
import com.daycan.domain.model.CareSheetInit;
import com.daycan.api.dto.center.request.CareSheetRequest;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.exceptions.DocumentNonCreatedException;
import com.daycan.external.worker.job.command.CreateReportCommand;
import com.daycan.external.worker.job.enums.TaskType;
import com.daycan.repository.jpa.CareReportRepository;
import com.daycan.repository.jpa.CareSheetRepository;
import com.daycan.repository.jpa.DocumentRepository;
import com.daycan.repository.jpa.VitalRepository;
import com.daycan.repository.query.DocumentQueryRepository;
import com.daycan.service.event.CreateReportEvent;
import com.daycan.util.resolver.ReportJobResolver;
import com.daycan.util.resolver.SheetMapper;
import com.daycan.util.prefiller.CareReportPrefiller;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
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
  private final ApplicationEventPublisher publisher;

  @Transactional(propagation = Propagation.MANDATORY)
  protected Long writeSheet(CareSheetRequest req) {
    CareSheetInit init = fetchInitOrThrow(req);
    validateStaff(init, req);
    Document doc = init.doc();

    CareSheet sheet = upsertSheet(init, req);

    Vital vital = upsertVital(init, req);

    markSheetDone(doc);

    CareReport report = createReport(sheet, vital, init.member());

    doc.markReportPending();

    logSheet(sheet, req, init.isNew());
    doc = documentRepository.save(doc);

    publisher.publishEvent(buildCreateReportEvent(report, sheet));
    return doc.getId();
  }

  private CreateReportEvent buildCreateReportEvent(CareReport report, CareSheet sheet) {
    Document document = report.getDocument();
    return CreateReportEvent.of(
        ReportJobResolver.createJobId(TaskType.REPORT_CREATE, report.getId()),
        ReportJobResolver.createIdempotencyKey(report.getId()),
        document.getCenter().getId(),
        document.getMember().getId(),
        document.getDate(),
        ReportJobResolver.buildSrc(sheet),
        System.currentTimeMillis()
    );
  }


  private CareSheet upsertSheet(CareSheetInit initVo, CareSheetRequest request) {
    boolean isNew = initVo.isNew();
    Document doc = initVo.doc();
    Staff staff = initVo.staff();

    List<PersonalProgram> programs = mapPrograms(request);

    if (isNew) {
      return createSheet(doc, request, staff, programs);
    }
    return updateSheet(doc, request, programs);
  }

  private CareSheetInit fetchInitOrThrow(CareSheetRequest req) {
    return documentQueryRepository
        .fetchCareSheetInit(req.memberId(), req.date(), req.writerId())
        .orElseThrow(DocumentNonCreatedException::new);
  }

  private void validateStaff(CareSheetInit init, CareSheetRequest req) {
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
    sheet.syncPersonalPrograms(programs);
    return careSheetRepository.save(sheet);
  }

  private CareSheet updateSheet(Document doc,
      CareSheetRequest req,
      List<PersonalProgram> programs) {
    CareSheet sheet = careSheetRepository.findById(doc.getId())
        .orElseThrow(() -> new ApplicationException(DocumentErrorStatus.SHEET_NOT_FOUND));
    SheetMapper.updateSheet(sheet, req);
    sheet.syncPersonalPrograms(programs);
    return sheet;
  }

  private Vital upsertVital(CareSheetInit initVo, CareSheetRequest request) {
    Document doc = initVo.doc();

    HealthCareEntry healthCareEntry = request.healthCare();
    PhysicalEntry physicalEntry = request.physical();

    return vitalRepository.findByDocumentId(doc.getId())
        .map(originVital -> {
          originVital.update(
              healthCareEntry.bloodPressure().systolic(),
              healthCareEntry.bloodPressure().diastolic(),
              healthCareEntry.temperature().temperature(),
              physicalEntry.numberOfStool(),
              physicalEntry.numberOfUrine()
          );
          return originVital;
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
          return vitalRepository.save(newVital);
        });
  }


  private CareReport createReport(CareSheet sheet, Vital vital, Member member) {
    final Document doc = (sheet != null) ? sheet.getDocument() : vital.getDocument();
    final CareReportInit init = CareReportPrefiller.computeInit(sheet, vital, member);

    CareReport report = careReportRepository.findById(doc.getId())
        .map(existing -> existing.updatePrefill(init))
        .orElseGet(() -> CareReport.prefill(doc, init));

    final int newScore = report.getMealScore()
        + report.getVitalScore()
        + report.getPhysicalScore()
        + report.getCognitiveScore();

    if (!Objects.equals(vital.getHealthScore(), newScore)) {
      vital.updateScore(newScore);
    }

    return careReportRepository.save(report);
  }

  private void logSheet(CareSheet savedSheet, CareSheetRequest req, boolean isNew) {
    log.debug("[CareSheet] id={} date={} {}", savedSheet.getId(), req.date(),
        isNew ? "created" : "updated");
  }

  private void markSheetDone(Document doc) {
    try{
      doc.markSheetDone();
    }catch (ApplicationException e){
      throw new ApplicationException(DocumentErrorStatus.INVALID_STATUS_WRITE_SHEET, doc.getId());
    }
  }
}
