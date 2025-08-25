package com.daycan.service.event;

import java.time.LocalDate;
import java.util.Map;

public record CreateReportEvent(
    String jobId,
    String idempotencyKey,
    Long centerId,
    Long memberId,
    LocalDate date,
    Map<String, Object> src,
    long requestAt
) implements AsyncEvent {
  public static CreateReportEvent of(
      String jobId,
      String idempotencyKey,
      Long centerId,
      Long memberId,
      LocalDate date,
      Map<String, Object> src,
      long requestAt) {
    return new CreateReportEvent(
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

