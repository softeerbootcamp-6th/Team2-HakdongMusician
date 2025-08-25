package com.daycan.external.worker.job.strategy;

import com.daycan.external.worker.job.command.WorkerCommand;
import com.daycan.external.worker.job.enums.TaskType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public interface CommandStrategy {
  TaskType supports();

  String buildMessage(WorkerCommand command, ObjectMapper om) throws JsonProcessingException;

}
