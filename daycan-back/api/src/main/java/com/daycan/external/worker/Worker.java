package com.daycan.external.worker;

import com.daycan.external.worker.job.command.WorkerCommand;

public interface Worker {
  void enqueue(WorkerCommand command);
}
