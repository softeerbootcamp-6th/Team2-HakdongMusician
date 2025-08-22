package com.daycan.api.controller.member;

import com.daycan.api.dto.member.response.MemberHomeResponse;
import com.daycan.api.dto.member.response.MemberReportResponse;
import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.MemberDetails;
import com.daycan.api.dto.common.FullReportDto;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.service.document.CareReportService;
import com.daycan.service.member.MemberFacade;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Tag(name = "\uD83D\uDCE8 고령자 리포트 API",
    description = "고령자의 일일 상태 리포트를 조회하는 API입니다. 식사, 건강, 신체/인지 활동별 리포트를 각각 조회할 수 있습니다.")
@Validated
public class MemberController {
  private final MemberFacade memberFacade;

  @Operation(
      summary = "리포트 전체 응답",
      description = """
          모든 리포트 조회 API는 공통적으로 ResponseWrapper를 사용하여 응답합니다.
          성공 시, data 필드에 리포트 내용을 담아 반환합니다.
          인지 program, 건강 program이 여러개인 경우 점수는 분야별로 평균이 계산됩니다.
          """
  )
  @GetMapping("report/{date}")
  public ResponseWrapper<MemberReportResponse> getReport(
      @AuthenticatedUser MemberDetails memberDetails,
      @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2025-07-31", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
      LocalDate date
  ) {
    MemberReportResponse report = memberFacade.getReport(memberDetails.getMember(), date);
    return ResponseWrapper.onSuccess(
        report
    );
  }

  @GetMapping("/home/{date}")
  public ResponseWrapper<MemberHomeResponse> getCenterInfo(
      @AuthenticatedUser MemberDetails memberDetails,
      @Parameter(description = "조회 날짜 (yyyy-MM-dd)", example = "2025-07-31", required = true)
      @PathVariable
      @Valid @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
      LocalDate date
  ) {
    MemberHomeResponse response = memberFacade.getMemberHome(memberDetails.getMember(),date);
    return ResponseWrapper.onSuccess(
        response
    );
  }

}

