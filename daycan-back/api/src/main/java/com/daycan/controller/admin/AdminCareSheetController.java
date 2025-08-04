package com.daycan.controller.admin;

import com.daycan.dto.admin.entry.CognitiveEntry;
import com.daycan.dto.admin.entry.HealthCareEntry;
import com.daycan.dto.admin.entry.MealSupport;
import com.daycan.dto.admin.entry.PhysicalEntry;
import com.daycan.dto.admin.entry.ProgramEntry;
import com.daycan.dto.admin.entry.RecoveryProgramEntry;
import com.daycan.dto.admin.request.AbsenceRegisterRequest;
import com.daycan.dto.admin.request.CareSheetRequest;
import com.daycan.dto.admin.request.DayFilter;
import com.daycan.dto.admin.response.AbsenceRegisterResponse;
import com.daycan.dto.admin.response.CareSheetMetaResponse;
import com.daycan.dto.admin.response.CareSheetResponse;
import com.daycan.dto.admin.response.UrlResponse;
import com.daycan.common.response.PageResponse;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.enums.*;

import com.daycan.dto.entry.BloodPressureEntry;
import com.daycan.dto.entry.MealEntry;
import com.daycan.dto.entry.MemberMetaEntry;
import com.daycan.dto.entry.TemperatureEntry;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin/care-sheet")
@Tag(name = "📜 기록지 관리", description = "관리자용 기록지 관련 API")
public class AdminCareSheetController {

  // 단건 조회
  @GetMapping("/{date}/{recipientId}")
  @Operation(summary = "기록지 단건 조회", description = "수급자 ID와 날짜로 기록지를 조회합니다.")
  public ResponseWrapper<CareSheetResponse> getCareSheetByRecipientAndDate(
      @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
      @Schema(description = "조회할 날짜", example = "2025-08-01") LocalDate date,

      @PathVariable
      @Schema(description = "수급자 ID", example = "RP123456") String recipientId
  ) {
    return ResponseWrapper.onSuccess(
        new CareSheetResponse(
            10L,
            1L,
            recipientId,
            date,
            LocalTime.of(9, 0),
            LocalTime.of(17, 0),
            "123가4567",
            mockPhysicalEntry(),
            mockCognitiveEntry(),
            mockHealthCareEntry(),
            mockRecoveryProgramEntry()
        )
    );
  }

  // 리스트 조회
  @GetMapping("/{date}")
  @Operation(
      summary = "기록지 리스트 조회",
      description = """
        특정 날짜의 기록지를 조회합니다.
        - dayFilter (선택): TODAY | DELAYED (기본값: 없음)
        - 정렬 기준: scheduledDate DESC
        """
  )
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "조회 성공")
  })
  public PageResponse<List<CareSheetMetaResponse>> getCareSheetList(
      @PathVariable
      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
      @Schema(description = "조회 날짜", example = "2025-08-04")
      LocalDate date,

      @RequestParam(value = "dayFilter", required = false)
      @Parameter(description = "TODAY | DELAYED", example = "TODAY")
      DayFilter dayFilter
  ) {
    List<CareSheetMetaResponse> mock = List.of(
        new CareSheetMetaResponse(
            1001L,
            CareSheetStatus.DONE,
            new MemberMetaEntry("MEM12345", "오애순",
                LocalDate.of(1943, 9, 12), Gender.FEMALE),
            true,
            "양금명",
            501L
        ),
        new CareSheetMetaResponse(
            1002L,
            CareSheetStatus.PENDING,
            new MemberMetaEntry("MEM67890", "김관식",
                LocalDate.of(1940, 3, 8), Gender.MALE),
            false,
            null,
            null
        )
    );
    return new PageResponse<>(0, mock, 2, 1);
  }

  // 파일 다운로드
  @GetMapping("/download")
  @Operation(summary = "공단 제출용 기록지 파일 다운로드", description = "국민건강보험공단 제출용 기록지 파일(Excel)을 다운로드합니다.")
  public ResponseWrapper<UrlResponse> downloadCareReportFile(
      @RequestParam(required = true) String year,
      @RequestParam(required = true) String month) {
    return ResponseWrapper.onSuccess(
        new UrlResponse("https://cdn.example.com/excel/care_report_공단제출용.xlsx"));
  }

  // 사진으로 등록
  @PostMapping(value = "/ocr", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @Operation(summary = "사진으로 등록", description = "이미지 파일(.jpg, .jpeg, .png)을 업로드하여 수급자를 일괄 등록합니다. 최대 10개까지")
  public ResponseWrapper<Void> createMemberFromExcel(
      @Parameter(description = "이미지 파일 여러 개(.jpg, .jpeg, .png)", required = true)
      @RequestParam("file") MultipartFile[] files) {
    return ResponseWrapper.onSuccess(null);
  }

  // 기록지 등록
  @PostMapping("")
  @Operation(summary = "기록지 직접 등록", description = "기록지 내용을 업로드합니다. (신체, 인지, 건강, 기능 회복 항목 포함)")
  public ResponseWrapper<Void> uploadCareSheet(
      @Valid @RequestBody CareSheetRequest request
  ) {
    return ResponseWrapper.onSuccess(null);
  }

  // 결석 처리
  @PostMapping("/attendance/absent")
  @Operation(
      summary = "수급자 결석 처리",
      description = "요청으로 받은 수급자 ID 목록을 금일 결석으로 표시합니다."
  )
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "결석 처리 성공")
  })
  public ResponseWrapper<AbsenceRegisterResponse> markAbsence(
      @RequestBody @Valid AbsenceRegisterRequest request
  ) {
    return ResponseWrapper.onSuccess(
        new AbsenceRegisterResponse(
            request.memberIds(),
            request.memberIds().size()
        )
    );
  }

  /* Mock 생성 메서드 */

  private PhysicalEntry mockPhysicalEntry() {
    return new PhysicalEntry(
        true, true, true,
        new MealSupport(true, new MealEntry(MealType.REGULAR, MealAmount.FULL)),
        new MealSupport(true, new MealEntry(MealType.PORRIDGE, MealAmount.MORE_HALF)),
        new MealSupport(false, null),
        1, 2, "양호"
    );
  }

  private CognitiveEntry mockCognitiveEntry() {
    return new CognitiveEntry(true, true, "인지 능력 양호");
  }

  private HealthCareEntry mockHealthCareEntry() {
    return new HealthCareEntry(
        true, true, false,
        new BloodPressureEntry(120, 80),
        new TemperatureEntry(37.5f),
        "정상 체온 유지"
    );
  }

  private RecoveryProgramEntry mockRecoveryProgramEntry() {
    return new RecoveryProgramEntry(
        true, false, true, true,
        List.of(
            new ProgramEntry(ProgramType.PHYSICAL, "보행 연습", ProgramEvaluation.MEDIUM),
            new ProgramEntry(ProgramType.COGNITIVE, "퍼즐 맞추기", ProgramEvaluation.HIGH)
        ),
        "적극적으로 참여"
    );
  }
}
