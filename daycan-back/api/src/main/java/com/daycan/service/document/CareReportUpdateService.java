package com.daycan.service.document;

import com.daycan.api.dto.lambda.report.ReportCallbackDto;
import com.daycan.api.dto.lambda.report.ReportCallbackDto.ReportContent;
import com.daycan.api.dto.lambda.report.ReportCallbackDto.ReportPayload;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.entity.document.CareReport;
import com.daycan.domain.entity.document.Document;
import com.daycan.domain.model.ProgramNote;
import com.daycan.repository.jpa.CareReportRepository;
import com.daycan.util.resolver.ReportJobResolver;
import java.util.LinkedHashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CareReportUpdateService {

  private final CareReportRepository careReportRepository;

  @Transactional
  public void applyCallback(ReportCallbackDto dto) {
    Long reportId = getReportId(dto.idempotencyKey());
    CareReport report = careReportRepository.findById(reportId)
        .orElseThrow(() -> new ApplicationException(DocumentErrorStatus.REPORT_NOT_FOUND, reportId));
    Document document = report.getDocument();

    ReportContent content = contentOf(dto.payload());

    updateMealSection(report, content);
    updateProgramNotes(report, content);
    document.markReportCreated();

  }
  private ReportContent contentOf(ReportPayload payload){
    if(payload == null) return null;
    return payload.content();
  }

  private void updateMealSection(CareReport report, ReportContent content) {
    if (content == null) return;
    String breakfast = emptyToNull(trim(content.breakfast()));
    String lunch     = emptyToNull(trim(content.lunch()));
    String dinner    = emptyToNull(trim(content.dinner()));

    report.updateMealSection(breakfast, lunch, dinner, null, null);
  }

  private void updateProgramNotes(CareReport report, ReportContent content) {
    if (content == null) return;
    Map<String, ProgramNote> physical = toNotes(content.physicalProgramComments());
    Map<String, ProgramNote> cognitive = toNotes(content.cognitiveProgramComments());

    if (physical != null) {
      report.syncPhysicalProgramNotes(physical, true);
    }
    if (cognitive != null) {
      report.syncCognitiveProgramNotes(cognitive, true);
    }
  }

  private Map<String, ProgramNote> toNotes(Map<String, ReportCallbackDto.ProgramCommentDto> m) {
    if (m == null || m.isEmpty()) return null;

    Map<String, ProgramNote> out = new LinkedHashMap<>();
    m.forEach((name, dto) -> {
      if (name == null || name.isBlank()) return;

      String benefit  = nullIfBlank(dto != null ? dto.benefit() : null);
      String personal = nullIfBlank(dto != null ? dto.personalNote() : null);

      if (benefit == null && personal == null) return;

      out.put(name.trim(), new ProgramNote(benefit, personal));
    });
    return out;
  }

  private static String trim(String s) {
    return (s == null) ? "" : s.trim();
  }
  private static String emptyToNull(String s) {
    return (s == null || s.isBlank()) ? null : s;
  }
  private static String nullIfBlank(String s) {
    return (s == null || s.isBlank()) ? null : s.trim();
  }

  private Long getReportId(String idempotencyKey) {
    return ReportJobResolver.resolveIdempotencyKey(idempotencyKey);
  }
}

