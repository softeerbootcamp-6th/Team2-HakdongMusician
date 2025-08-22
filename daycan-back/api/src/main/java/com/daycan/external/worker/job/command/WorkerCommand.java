package com.daycan.external.worker.job.command;

import com.daycan.external.worker.job.enums.TaskType;

public interface WorkerCommand {

  TaskType taskType();

  String jobId();

  String idempotencyKey();

  Object payload();

  long requestAt();
}
