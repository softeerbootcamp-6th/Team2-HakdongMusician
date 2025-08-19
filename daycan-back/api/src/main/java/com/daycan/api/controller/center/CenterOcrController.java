package com.daycan.api.controller.center;

import com.daycan.api.dto.center.response.sheet.CareSheetPrefillResponse;
import com.daycan.api.dto.center.response.image.OcrResponse;
import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.CenterDetails;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.enums.Gender;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.net.URI;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/admin/care-sheet/ocr")
@RequiredArgsConstructor
@Tag(name = "\uD83D\uDCF8 기록지 관리 OCR", description = "관리자용 기록지 OCR 관련 API")
@Validated
public class CenterOcrController {

  // 사진으로 등록 (목: 성공 응답만 반환)
  @PostMapping
  @Operation(
      summary = "사진으로 등록",
      description = "이미지 파일(.jpg, .jpeg, .png)을 업로드하여 수급자를 일괄 등록합니다. 최대 10개까지"
  )
  public ResponseWrapper<Void> createMemberFromExcel(
      @AuthenticatedUser
      CenterDetails centerDetails,
      @RequestParam("staffId")
      @Parameter(description = "직원 ID", example = "1", required = true)
      Long staffId,
      @Parameter(description = "이미지 파일 URL 목록(.jpg, .jpeg, .png)", required = true)
      @RequestParam("url") List<URI> ocrUrlList
  ) {
    // TODO: 실제 업로드 & OCR 큐잉 연동
    return ResponseWrapper.onSuccess(null);
  }

  // 오늘자 OCR 집계 조회 (mock)
  @GetMapping
  @Operation(summary = "ocr 결과 조회", description = "OCR로 추출된 수급자 정보 집계를 조회합니다.")
  public ResponseWrapper<List<OcrResponse>> getOcrResults(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "조회 날짜", example = "2025-08-01")
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
      @Parameter(description = "작성자 ID", example = "1", required = true)
      @RequestParam Long writerId
  ) {
    OcrResponse mock = new OcrResponse(
        12L,
        3L,
        4L,
        Map.of(
            101L, new com.daycan.domain.entry.member.MemberMetaEntry(
                2L, "ABC1234","홍길동", LocalDate.of(1940, 1, 1), Gender.MALE,"https://example.com/photo1.jpg"
            ),
            102L, new com.daycan.domain.entry.member.MemberMetaEntry(
                1L, "ABC1234","김수환", LocalDate.of(1940, 1, 1), Gender.MALE,"https://example.com/photo2.jpg"

            )
        )
    );
    return ResponseWrapper.onSuccess(List.of(mock));
  }

  // OCR 프리필 단건 조회 (목)
  @GetMapping("/{ocrId}")
  @Operation(summary = "ocr 프리필 조회", description = "OCR로 추출된 기록지 프리필을 조회합니다.")
  public ResponseWrapper<CareSheetPrefillResponse> getOcrPrefill(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "OCR ID", example = "1")
      @PathVariable Long ocrId
  ) {
    // TODO: care_sheet_prefill 연동. 지금은 목데이터 반환.
    CareSheetPrefillResponse mock = new CareSheetPrefillResponse(
        7L,                          // writerId
        45L,                         // memberId
        "RP123456",                  // careNumber
        LocalDate.of(2025, 8, 1),    // date
        LocalTime.of(9, 0),          // startTime
        LocalTime.of(17, 0),         // endTime
        "123가4567",                 // mobilityNumber
        null,                        // physical (임시 null)
        null,                        // cognitive
        null,                        // healthCare
        null                         // recoveryProgram
    );
    return ResponseWrapper.onSuccess(mock);
  }
}
