package com.daycan.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@Tag(name = "Admin", description = "Swagger 테스트용 어드민 컨트롤러")
public class AdminController {

  @GetMapping("/hello")
  @Operation(summary = "Admin Hello 테스트", description = "Swagger 테스트용 Admin Hello API")
  public String hello() {
    return "Hello, Admin!";
  }
}