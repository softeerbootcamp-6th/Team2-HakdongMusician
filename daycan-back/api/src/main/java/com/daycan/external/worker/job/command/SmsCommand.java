package com.daycan.external.worker.job.command;

import com.daycan.external.worker.job.enums.TaskType;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
public record SmsCommand(
    String jobId,
    String idempotencyKey,
    Map<String, String> toText, // key: 수신번호, value: 메시지
    long requestAt,
    LocalDate date,
    List<Long> documentIds
) implements WorkerCommand {

  @Override
  public TaskType taskType() {
    return TaskType.SEND_SMS;
  }

  @Override
  public Object payload() {
    List<Map<String, String>> msgs = new ArrayList<>(toText.size());
    for (var e : toText.entrySet()) {
      msgs.add(Map.of("to", e.getKey(), "text", e.getValue()));
    }
    //date와 함께 docIds도 같이 보냄 (람다가 몰라도 무시됨)
    return Map.of(
        "messages", msgs,
        "date",    date != null ? date.toString() : null,
        "docIds",  documentIds
    );
  }

  public static SmsCommand of(
      String jobId, String idempotencyKey, Map<String, String> toText,
      long requestAt, LocalDate date, List<Long> documentIds) {
    return new SmsCommand(jobId, idempotencyKey, toText, requestAt, date, documentIds);
  }

  public static SmsCommand now(
      String jobId, String idempotencyKey, Map<String, String> toText,
      LocalDate date, List<Long> documentIds) {
    return of(jobId, idempotencyKey, toText, Instant.now().toEpochMilli(), date, documentIds);
  }
}



