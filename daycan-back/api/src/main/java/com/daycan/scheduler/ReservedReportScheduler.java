package com.daycan.scheduler;

import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.document.Document;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.repository.jpa.DocumentRepository;
import com.daycan.service.document.CareReportSmsService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservedReportScheduler {
  private final DocumentRepository documentRepository;
  private final CareReportSmsService smsService;


  @Scheduled(cron = "0 0/30 * * * *", zone = "Asia/Seoul")
  public void run() {
    LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
    log.info("ReservedReportScheduler start at {}", now);

    List<Document> docs = documentRepository.findByStatusAndReservedSendTimeLessThanEqual(
        DocumentStatus.REPORT_RESERVED, now
    );

    Map<LocalDate, List<Member>> byDate = docs.stream()
        .collect(Collectors.groupingBy(
            Document::getDate,
            Collectors.mapping(Document::getMember, Collectors.toList())
        ));

    byDate.forEach((date, members) -> {
      try {
        smsService.sendImmediate(members, date);
        log.info("Triggered sendImmediate for {} members, date={}", members.size(), date);
      } catch (Exception e) {
        log.error("sendImmediate failed for date {}", date, e);
      }
    });

    log.info("ReservedReportScheduler finished at {}", now);
  }
}

