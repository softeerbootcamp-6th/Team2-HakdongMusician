package com.daycan.service.member;

import com.daycan.api.dto.common.FullReportDto;
import com.daycan.api.dto.member.response.MemberHomeResponse;
import com.daycan.domain.entity.Member;
import com.daycan.domain.model.MemberWeeklyScoreView;
import com.daycan.domain.model.ReportWithDto;
import com.daycan.external.storage.StorageService;
import com.daycan.service.document.CareReportService;
import com.daycan.service.document.VitalService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberFacade {

  private final CareReportService careReportService;
  private final StorageService storageService;
  private final VitalService vitalService;

  @Transactional
  public FullReportDto getReport(Long memberId, LocalDate date) {
    ReportWithDto reportWithDto = careReportService.getReport(memberId, date);
    reportWithDto.careReport().openThis();
    return reportWithDto.fullReportDto();
  }

  @Transactional(readOnly = true)
  public MemberHomeResponse getMemberHome(Member member, LocalDate today) {
    String imageUrl = storageService.presignGet(member.getAvatarUrl());
    boolean isOpened = careReportService.isReportOpened(member.getId(), today);
    MemberWeeklyScoreView weeklyScoreView =
        vitalService.getMemberWeeklyScore(member.getId(), today);

    return  MemberHomeResponse.of(
        member,
        imageUrl,
        isOpened,
        weeklyScoreView.weeklyAvg(),
        weeklyScoreView.lastWeekAvg()
    );
  }
}
