package com.daycan.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
@Tag(name = "Test", description = "Swagger 테스트용 컨트롤러")
public class TestController {

  @GetMapping("/hello")
  @Operation(summary = "Hello 테스트", description = "Swagger 테스트용 Hello API")
  public String hello() {
    return "Hello, Swagger!";
  }

  @PostMapping
  @Operation(summary = "Create 테스트", description = "테스트용 데이터 생성")
  public String create() {
    return "Create 성공";
  }

  @GetMapping("/{id}")
  @Operation(summary = "Read 테스트", description = "테스트용 데이터 조회")
  public String read(@PathVariable Long id) {
    return "Read: " + id;
  }

  @PutMapping("/{id}")
  @Operation(summary = "Update 테스트", description = "테스트용 데이터 수정")
  public String update(@PathVariable Long id) {
    return "Update: " + id;
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete 테스트", description = "테스트용 데이터 삭제")
  public String delete(@PathVariable Long id) {
    return "Delete: " + id;
  }
}