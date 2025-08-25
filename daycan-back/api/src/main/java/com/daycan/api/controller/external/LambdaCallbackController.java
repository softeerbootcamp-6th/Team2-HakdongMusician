package com.daycan.api.controller.external;


import com.daycan.api.dto.lambda.SmsCallbackDto;
import com.daycan.api.dto.lambda.report.ReportCallbackDto;
import com.daycan.service.document.CareReportSmsService;
import com.daycan.service.document.CareReportUpdateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/external/callback")
@RequiredArgsConstructor
public class LambdaCallbackController {

  private final CareReportUpdateService reportUpdateService;
  private final CareReportSmsService smsService;

  @PostMapping(path = "/report", consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.CREATED)
  public void onReportCallback(
      @RequestBody ReportCallbackDto dto,
      @RequestHeader(value = "Idempotency-Key", required = false) String idemKey,
      @RequestHeader(value = "X-Job-Id", required = false) String jobId,
      @RequestHeader(value = "Rid", required = false) String rid) {
    log.info("λ callback REPORT jobId={} idemKey={} rid={} body={}", jobId, idemKey, rid, dto);

    reportUpdateService.applyUpdateReport(dto);
  }

  @PostMapping(path = "/sms", consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.CREATED)
  public void onSmsCallback(
      @RequestBody SmsCallbackDto dto,
      @RequestHeader(value = "Idempotency-Key", required = false) String idemKey,
      @RequestHeader(value = "X-Job-Id", required = false) String jobId,
      @RequestHeader(value = "Rid", required = false) String rid) {
    log.info("λ callback SMS jobId={} idemKey={} rid={} body={}", jobId, idemKey, rid, dto);

    smsService.applySmsCallback(dto, idemKey, jobId, rid);
  }
}
