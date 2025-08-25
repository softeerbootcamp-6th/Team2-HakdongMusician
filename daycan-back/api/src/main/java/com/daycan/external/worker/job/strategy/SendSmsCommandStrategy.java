package com.daycan.external.worker.job.strategy;

import com.daycan.external.worker.job.command.WorkerCommand;
import com.daycan.external.worker.job.enums.TaskType;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.sns.model.MessageAttributeValue;

@Component
@RequiredArgsConstructor
public class SendSmsCommandStrategy implements CommandStrategy {

  @Override public TaskType supports() { return TaskType.SEND_SMS; }

  @Override
  public String buildMessage(WorkerCommand command, ObjectMapper om) throws com.fasterxml.jackson.core.JsonProcessingException {
    // ✅ payload()만 발행 → 람다는 {"messages":[...]} 그대로 받음
    return om.writeValueAsString(command.payload());
  }
}
