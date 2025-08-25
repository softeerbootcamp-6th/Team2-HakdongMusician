package com.daycan.service.document;

import com.daycan.domain.entity.Member;
import com.daycan.repository.query.DocumentQueryRepository;
import com.daycan.service.event.SendSmsRequestedEvent;
import com.daycan.util.resolver.MessageResolver;
import jakarta.annotation.Nullable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CareReportSmsService {
  private final DocumentQueryRepository documentQueryRepository;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional(propagation = Propagation.MANDATORY)
  public void sendReports(List<Member> members,
      LocalDate reportDate,
      @Nullable LocalDateTime scheduled) {
    if (members == null || members.isEmpty()) return;

    ZoneId KST = ZoneId.of("Asia/Seoul");
    LocalDateTime now = LocalDateTime.now(KST);

    boolean immediate = (scheduled == null) || !scheduled.isAfter(now);

    if (immediate) {
      sendImmediate(members, reportDate);
    } else {
      registerReserved(members, reportDate, scheduled);
    }
  }

  @Transactional
  public void sendImmediate(List<Member> members, LocalDate reportDate) {
    if (members == null || members.isEmpty()) return;

    documentQueryRepository.registerSendingMessages(members, reportDate, true, null);

    Map<String, String> toText = buildToTextMap(members, reportDate);
    if (!toText.isEmpty()) {
      String jobIdPrefix    = "SEND_SMS:" + reportDate;
      String batchKeyPrefix = "REPORT_SMS_BATCH:" + reportDate;
      eventPublisher.publishEvent(new SendSmsRequestedEvent(toText, jobIdPrefix, batchKeyPrefix));
    }
  }

  @Transactional(propagation = Propagation.MANDATORY)
  protected void registerReserved(List<Member> members,
      LocalDate reportDate,
      LocalDateTime scheduled) {
    documentQueryRepository.registerSendingMessages(members, reportDate, false, scheduled);
  }

  private Map<String, String> buildToTextMap(List<Member> members, LocalDate reportDate) {
    Map<String, String> toText = new LinkedHashMap<>();
    for (Member m : members) {
      String to = m.getGuardianPhoneNumber();
      if (to == null || to.isBlank()) continue;

      String text = MessageResolver.resolveReportMessage(
          m.getGuardianName(), m.getName(), reportDate
      );
      toText.put(to, text);
    }
    return toText;
  }

}
