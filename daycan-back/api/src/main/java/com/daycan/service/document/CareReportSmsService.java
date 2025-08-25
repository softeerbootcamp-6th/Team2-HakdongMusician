package com.daycan.service.document;

import com.daycan.api.dto.lambda.SmsCallbackDto;
import com.daycan.domain.entity.Member;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.repository.jpa.DocumentRepository;
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
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
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
  private final DocumentRepository documentRepository;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional(propagation = Propagation.MANDATORY)
  public void sendReports(List<Member> members,
      LocalDate reportDate,
      @Nullable LocalDateTime scheduled) {
    if (members == null || members.isEmpty()) {
      return;
    }

    ZoneId KST = ZoneId.of("Asia/Seoul");
    LocalDateTime now = LocalDateTime.now(KST);

    boolean immediate = (scheduled == null) || !scheduled.isAfter(now);

    if (immediate) {
      sendImmediate(members, reportDate);
    } else {
      registerReserved(members, reportDate, scheduled);
    }
  }

  @Transactional(propagation = Propagation.MANDATORY)
  public void sendImmediate(List<Member> members, LocalDate reportDate) {
    if (members == null || members.isEmpty()) {
      return;
    }

    List<Long> documentIds = documentQueryRepository
        .registerSendingMessages(members, reportDate, true, null);

    SendSmsRequestedEvent event = buildSendSmsEvent(members, reportDate, documentIds);

    if (event != null) {
      eventPublisher.publishEvent(event);
    }
  }


  @Transactional
  public void applySmsCallback(SmsCallbackDto dto, String idemKeyHeader, String jobId, String rid) {
    if (dto == null || dto.data() == null) return;

    var data = dto.data();

    if (data.docIds() != null && !data.docIds().isEmpty()
        && data.status() == SmsCallbackDto.Status.success) {
      documentRepository.markDocumentsDoneByIds(data.docIds(), DocumentStatus.REPORT_DONE);
      return;
    }
    handleNonIdsInCallbackDto(dto);
  }


  @Transactional(propagation = Propagation.MANDATORY)
  protected void registerReserved(List<Member> members,
      LocalDate reportDate,
      LocalDateTime scheduled) {
    documentQueryRepository.registerSendingMessages(members, reportDate, false, scheduled);
  }

  private SendSmsRequestedEvent buildSendSmsEvent(
      List<Member> members,
      LocalDate reportDate,
      List<Long> documentIds
  ) {
    Map<String, String> toText = new LinkedHashMap<>();
    for (Member m : members) {
      String to = m.getGuardianPhoneNumber();
      if (to == null || to.isBlank()) {
        continue;
      }

      String text = MessageResolver.resolveReportMessage(
          m.getGuardianName(), m.getName(), reportDate
      );
      toText.put(to, text);
    }

    if (toText.isEmpty()) {
      return null;
    }

    String jobIdPrefix = "SEND_SMS:" + reportDate;
    String batchKeyPrefix = "REPORT_SMS_BATCH:" + reportDate;

    return new SendSmsRequestedEvent(
        toText,
        documentIds,
        jobIdPrefix,
        batchKeyPrefix,
        reportDate
    );
  }

  private void handleNonIdsInCallbackDto( SmsCallbackDto dto){
    if (dto.data().results() == null || dto.data().results().isEmpty()) return;

    Set<String> phones = dto.data().results().stream()
        .filter(r -> "success".equalsIgnoreCase(r.status()))
        .map(SmsCallbackDto.Result::to)
        .filter(Objects::nonNull)
        .collect(Collectors.toSet());

    if (!phones.isEmpty()) {
      documentQueryRepository.markDoneByPhonesAndDate(phones, dto.data().date());
    }
  }

}
