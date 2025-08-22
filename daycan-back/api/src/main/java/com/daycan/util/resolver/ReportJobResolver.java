package com.daycan.util.resolver;

import com.daycan.domain.entity.document.CareSheet;
import com.daycan.domain.entity.document.PersonalProgram;
import com.daycan.domain.enums.ProgramType;
import com.daycan.external.worker.job.enums.TaskType;
import java.util.Map;
import java.util.stream.Collectors;

public class ReportJobResolver {

  private ReportJobResolver() {
  }

  private static final String REPORT_JOB_IDEMPOTENCY_KEY_PREFIX = "report-job-idempotency-key-";

  public static String createJobId(TaskType type, Long reportId) {
    return type.name() + ":" + reportId + "-" + System.currentTimeMillis();
  }

  public static String createIdempotencyKey(Long reportJobId) {
    if (reportJobId == null || reportJobId <= 0) {
      throw new IllegalArgumentException("Report job ID must be a positive number");
    }
    return REPORT_JOB_IDEMPOTENCY_KEY_PREFIX + reportJobId;
  }

  public static Long resolveIdempotencyKey(String idempotencyKey) {
    if (idempotencyKey == null || !idempotencyKey.startsWith(REPORT_JOB_IDEMPOTENCY_KEY_PREFIX)) {
      return 0L;
    }

    String keySuffix = idempotencyKey.substring(REPORT_JOB_IDEMPOTENCY_KEY_PREFIX.length());
    try {
      return Long.parseLong(keySuffix);
    } catch (NumberFormatException e) {
      return 0L;
    }
  }

  public static Map<String, Object> buildSrc(CareSheet sheet) {
    return Map.of(
        "breakfast", sheet.getBreakfast().toString(),
        "lunch", sheet.getLunch().toString(),
        "dinner", sheet.getDinner().toString(),
        "physical_comment", sheet.getPhysicalComment(),
        "cognitive_comment", sheet.getCognitiveComment(),
        "functional_comment", sheet.getFunctionalComment(),
        "health_comment", sheet.getHealthComment(),
        "physical_program_names", sheet.getPersonalPrograms().stream()
            .filter(p -> p.getType() == ProgramType.PHYSICAL)
            .map(PersonalProgram::getProgramName)
            .collect(Collectors.joining(", ")),
        "cognitive_program_names", sheet.getPersonalPrograms().stream()
            .filter(p -> p.getType() == ProgramType.COGNITIVE)
            .map(PersonalProgram::getProgramName)
    );
  }
}
