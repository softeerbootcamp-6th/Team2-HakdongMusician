package com.daycan.api.controller;

import com.daycan.common.response.ResponseWrapper;
import com.daycan.external.worker.SnsWorker;
import com.daycan.external.worker.job.command.CreateReportCommand;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController()
@RequestMapping("/")
@Tag(name = "Health Check", description = "Health Check API")
@RequiredArgsConstructor
public class HealthCheckController {
  @GetMapping("")
  public ResponseWrapper<Void> check() {
    return ResponseWrapper.onSuccess(null);
  }
}
