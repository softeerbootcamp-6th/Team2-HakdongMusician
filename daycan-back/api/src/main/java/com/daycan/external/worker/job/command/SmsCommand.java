package com.daycan.external.worker.job.command;

import com.daycan.external.worker.job.enums.TaskType;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
public record SmsCommand(
    String jobId,
    String idempotencyKey,
    Map<String, String> toText, // key: 수신번호, value: 메시지
    long requestAt
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
    return Map.of("messages", msgs);
  }

  public static SmsCommand of(
      String jobId, String idempotencyKey, Map<String, String> toText, long requestAt) {
    return new SmsCommand(jobId, idempotencyKey, toText, requestAt);
  }

  public static SmsCommand now(
      String jobId, String idempotencyKey, Map<String, String> toText) {
    return of(jobId, idempotencyKey, toText, Instant.now().toEpochMilli());
  }
}


