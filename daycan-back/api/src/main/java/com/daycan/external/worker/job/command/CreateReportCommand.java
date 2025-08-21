package com.daycan.external.worker.job.command;


import com.daycan.external.worker.job.enums.TaskType;
import java.time.LocalDate;

import java.util.Map;

public record CreateReportCommand(
    String jobId,
    String idempotencyKey,
    Long centerId,
    Long memberId,
    LocalDate date,
    Map<String, Object> src,
    long requestAt
) implements WorkerCommand {

  @Override
  public TaskType taskType() {
    return TaskType.REPORT_CREATE;
  }

  @Override
  public Object payload() {
    return Map.of(
        "centerId", centerId,
        "memberId", memberId,
        "date", date.toString(),
        "src", src
    );
  }

  public static CreateReportCommand of(
      String jobId,
      String idempotencyKey,
      Long centerId,
      Long memberId,
      LocalDate date,
      Map<String, Object> src,
      long requestAt) {
    return new CreateReportCommand(
        jobId,
        idempotencyKey,
        centerId,
        memberId,
        date,
        src,
        requestAt
    );
  }

}
