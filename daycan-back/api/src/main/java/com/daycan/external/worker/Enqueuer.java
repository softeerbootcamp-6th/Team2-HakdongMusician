package com.daycan.external.worker;

import com.daycan.external.worker.job.command.CreateReportCommand;
import com.daycan.external.worker.job.command.SmsCommand;
import com.daycan.service.event.CreateReportEvent;
import com.daycan.service.event.SendSmsRequestedEvent;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
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

    for (Map<String, String> chunk : partition(toText, SMS_BATCH)) {
      String jobId  = event.jobIdPrefix()   + ":" + System.currentTimeMillis();
      String idemKey = event.batchKeyPrefix() + ":" + chunk.keySet().hashCode();

      SmsCommand cmd = SmsCommand.now(jobId, idemKey, chunk);
      worker.enqueue(cmd);
    }
  }

  private static List<Map<String, String>> partition(Map<String, String> src, int size) {
    List<Map<String, String>> out = new ArrayList<>();
    if (src == null || src.isEmpty()) return out;

    Map<String, String> cur = new LinkedHashMap<>(size);
    for (var e : src.entrySet()) {
      cur.put(e.getKey(), e.getValue());
      if (cur.size() == size) {
        out.add(cur);
        cur = new LinkedHashMap<>(size);
      }
    }
    if (!cur.isEmpty()) out.add(cur);
    return out;
  }
}



