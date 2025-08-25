package com.daycan.external.worker;

import com.daycan.external.worker.job.command.CreateReportCommand;
import com.daycan.external.worker.job.command.SmsCommand;
import com.daycan.service.event.CreateReportEvent;
import com.daycan.service.event.SendSmsRequestedEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
@Slf4j
public class Enqueuer {

  private static final int SMS_BATCH = 10;
  private final Worker worker;

  @Async("eventTaskExecutor")
  @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
  public void enqueueReportCreateOn(CreateReportEvent event) {
    CreateReportCommand cmd = CreateReportCommand.of(
        event.jobId(),
        event.idempotencyKey(),
        event.centerId(),
        event.memberId(),
        event.date(),
        event.src(),
        event.requestAt()
    );
    worker.enqueue(cmd);
  }

  @Async("eventTaskExecutor")
  @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
  public void enqueueSendSms(SendSmsRequestedEvent event) {
    Map<String, String> toText = event.toText();
    if (toText == null || toText.isEmpty()) return;

    for (Map<String, String> chunk : partition(toText)) {
      String jobId  = event.jobIdPrefix() + ":" + System.currentTimeMillis();
      String idemKey = event.batchKeyPrefix()
          + ":" + Integer.toHexString(Objects.hash(chunk.keySet(), event.reportDate()));

      SmsCommand cmd = SmsCommand.now(
          jobId,
          idemKey,
          chunk,
          event.reportDate(),
          event.documentIds()
      );
      worker.enqueue(cmd);
    }
  }


  private List<Map<String, String>> partition(Map<String, String> src) {
    if (src == null || src.isEmpty()) return Collections.emptyList();
    List<Map<String, String>> out = new ArrayList<>();
    Map<String, String> cur = new LinkedHashMap<>(SMS_BATCH);
    for (Map.Entry<String, String> e : src.entrySet()) {
      cur.put(e.getKey(), e.getValue());
      if (cur.size() >= SMS_BATCH) {
        out.add(cur);
        cur = new LinkedHashMap<>(SMS_BATCH);
      }
    }
    if (!cur.isEmpty()) out.add(cur);
    return out;
  }
}



