package com.daycan.api.controller.external;


import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
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

//  private final ReportCreateFacade reportCreateFacade;
  private final ObjectMapper objectMapper = new ObjectMapper(); // 간단히 로깅용

  @PostMapping(path = "/report", consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.CREATED)
  public void onReportCallback(@RequestBody Map<String,Object> body,
      @RequestHeader(value="Idempotency-Key", required=false) String idemKey,
      @RequestHeader(value="X-Job-Id", required=false) String jobId,
      @RequestHeader(value="Rid", required=false) String rid) {
    log.info("λ callback REPORT jobId={} idemKey={} rid={} body={}", jobId, idemKey, rid, body);
  }


  private String preview(Object o, int limit) {
    try {
      String s = objectMapper.writeValueAsString(o);
      return s.length() > limit ? s.substring(0, limit) + "…" : s;
    } catch (Exception e) {
      return String.valueOf(o);
    }
  }
}
