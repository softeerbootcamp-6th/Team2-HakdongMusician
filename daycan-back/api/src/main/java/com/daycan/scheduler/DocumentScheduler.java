package com.daycan.scheduler;

import com.daycan.domain.entity.Member;
import com.daycan.repository.jpa.MemberRepository;
import com.daycan.service.document.DocumentService;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DocumentScheduler {

  private static final ZoneId KST = ZoneId.of("Asia/Seoul");

  private final MemberRepository memberRepository;
  private final DocumentService documentService;

  @Transactional
  @SchedulerLock(name = "DocumentScheduler_preCreateDocuments", lockAtLeastFor = "1m", lockAtMostFor = "10m")
  @Scheduled(cron = "0 0 5 * * *", zone = "Asia/Seoul")  // 매일 05:00
  // 람다로 이전 고려
  // or 비동기 방식으로 DLQ 처리
  public void preCreateDocuments() {

    LocalDate today = LocalDate.now(KST);
    List<Member> activeMembers = memberRepository.findAllActive();

    documentService.upsertAll(activeMembers, today);
  }

}