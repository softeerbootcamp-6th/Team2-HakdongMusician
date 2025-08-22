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
  private final SnsWorker snsWorker;

  @GetMapping("")
  public ResponseWrapper<Void> check() {
    return ResponseWrapper.onSuccess(null);
  }

  @PostMapping("")
  public void test(){
    snsWorker.enqueue(new CreateReportCommand(
        UUID.randomUUID().toString(),
        "test-job-id",
        1L,1L, LocalDate.now(),
        buildDemoSrc(),
        System.currentTimeMillis()
    ));
  }

  public static Map<String, Object> buildDemoSrc() {
    return Map.of(
        "breakfast", "일반식 : 1인분",
        "lunch", "죽 : 1/2 이하",
        "dinner", "",
        "physical_comment", "아침을 맛있게 드셨어요",
        "cognitive_comment", "숫자 퍼즐은 집중 유지, 단어 맞추기에 흥미 보임.",
        "functional_comment", "상지 스트레칭과 의자 스쿼트로 진행, 가동범위 소폭 개선. 반응 양호",
        "health_comment", "혈압 안정적, 피로감 약간.",
        "physical_program_names", "스트레칭, 의자 스쿼트",
        "cognitive_program_names", "숫자 퍼즐, 단어 맞추기"
    );
  }
}
