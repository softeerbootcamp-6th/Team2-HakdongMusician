package com.daycan.external.worker;

import com.daycan.external.worker.job.command.WorkerCommand;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.MessageAttributeValue;
import software.amazon.awssdk.services.sns.model.PublishRequest;

import org.slf4j.MDC;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class SnsWorker implements Worker {

  private final SnsClient snsClient;
  private final ObjectMapper objectMapper;

  @Value("${app.aws.sns.topic-arn}")
  private String topicArn;

  @Value("${app.aws.sns.enabled:false}")
  private boolean enabled;

  @Override
  public void enqueue(WorkerCommand command) {
    try {
      if (!enabled) {
        log.info("SNS disabled. Skip enqueue. type={} jobId={} key={}",
            command.taskType(), command.jobId(), command.idempotencyKey());
        return;
      }
      final String payload = objectMapper.writeValueAsString(command);

      Map<String, MessageAttributeValue> attrs = new HashMap<>();
      putAttrString(attrs, "Task-Type", command.taskType().name());
      putAttrString(attrs, "Idempotency-Key", command.idempotencyKey());
      putAttrString(attrs, "Job-Id", command.jobId());
      putAttrNumber(attrs, "Request-At", command.requestAt());
      putAttrString(attrs, "Rid", MDC.get("rid")); // 추적용(옵션)

      PublishRequest req = PublishRequest.builder()
          .topicArn(topicArn)
          .message(payload)
          .messageAttributes(attrs)
          .build();

      var res = snsClient.publish(req);

      log.info("SNS published type={} msgId={} jobId={} idemKey={} requestAt={}",
          command.taskType(), res.messageId(), nz(command.jobId()), nz(command.idempotencyKey()), command.requestAt());

    } catch (Exception e) {
      log.error("SNS publish failed type={} jobId={} idemKey={} requestAt={} err={}",
          command.taskType(), nz(command.jobId()), nz(command.idempotencyKey()), command.requestAt(), e.getMessage(), e);
    }
  }

  private static void putAttrString(Map<String, MessageAttributeValue> attrs, String key, String val) {
    if (val != null && !val.isBlank()) {
      attrs.put(key, MessageAttributeValue.builder().dataType("String").stringValue(val).build());
    }
  }

  private static void putAttrNumber(Map<String, MessageAttributeValue> attrs, String key, long val) {
    if (val > 0) {
      attrs.put(key, MessageAttributeValue.builder().dataType("Number").stringValue(Long.toString(val)).build());
    }
  }

  private static String nz(String s) { return (s == null ? "" : s); }
}
