package com.daycan.external.worker.job.strategy;

import com.daycan.external.worker.job.command.WorkerCommand;
import com.daycan.external.worker.job.enums.TaskType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class ReportCreateCommandStrategy implements CommandStrategy {

  @Override public TaskType supports() { return TaskType.REPORT_CREATE; }

  @Override
  public String buildMessage(WorkerCommand command, ObjectMapper om) throws com.fasterxml.jackson.core.JsonProcessingException {
    return om.writeValueAsString(command);
  }
}

