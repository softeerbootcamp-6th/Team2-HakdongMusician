package com.daycan.external.worker;

import com.daycan.external.worker.job.command.CreateReportCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class Enqueuer {

  private final Worker worker;

  @Async("eventTaskExecutor")
  @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
  public void enqueueReportCreateOn(CreateReportCommand cmd) {
    worker.enqueue(cmd);
  }
}

