package com.daycan.api.controller;

import com.daycan.common.response.ResponseWrapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/")
@Tag(name = "🩺 Health Check", description = "Health Check API")
public class HealthCheckController {

  @GetMapping("")
  public ResponseWrapper<Void> check() {
    return ResponseWrapper.onSuccess(null);
  }
}
