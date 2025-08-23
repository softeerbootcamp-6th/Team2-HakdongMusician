package com.daycan.service.member;

import com.daycan.api.dto.common.FullReportDto;
import com.daycan.api.dto.member.response.MemberHomeResponse;
import com.daycan.api.dto.member.response.MemberReportResponse;
import com.daycan.api.dto.member.response.MemberReportedDateListResponse;
import com.daycan.api.dto.member.response.MemberStatisticsResponse;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.document.CareReport;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.MemberWeeklyScoreView;
import com.daycan.domain.model.ReportWithDto;
import com.daycan.external.storage.StorageService;
import com.daycan.service.document.CareReportService;
import com.daycan.service.document.VitalService;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
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
  public MemberReportResponse getReport(Member member, LocalDate date) {
    ReportWithDto reportWithDto = careReportService.getReport(member.getId(), date,
        DocumentStatus.finished());
    // todo: 주석 해제
//    if(report.getDocument().getStatus()!= DocumentStatus.REPORT_REVIEWED) {
//      throw new ApplicationException(DocumentErrorStatus.INVALID_REPORT_ACCESS);
//    }
   careReportService.saveReport(
       reportWithDto.careReport().openThis()
   );
    return new MemberReportResponse(
        member.getName(),
        member.getGender(),
        reportWithDto.fullReportDto()
    );
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

  @Transactional(readOnly = true)
  public MemberReportedDateListResponse getReportedDates(Member member, YearMonth month){
    List<LocalDate> dateList = careReportService.getReportedDateInMonth(
        member.getId(),month
    );

    return new MemberReportedDateListResponse(dateList);
  }

  @Transactional(readOnly = true)
  public Number getOverallScore(Member member, LocalDate date) {
    return vitalService.getOverallScore(member, date);
  }

  @Transactional(readOnly = true)
  public MemberStatisticsResponse getMemberStatistics(Member member, LocalDate startDate, LocalDate endDate) {
    return vitalService.getVitals(member.getId(), startDate, endDate);
  }

  @Transactional(readOnly = true)
  public MemberStatisticsResponse getMemberStatistics(Member member, YearMonth startMonth, YearMonth endMonth) {
    return vitalService.getVitals(member.getId(), startMonth, endMonth);
  }
}
