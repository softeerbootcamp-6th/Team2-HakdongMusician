package com.daycan.api.controller.center;

import com.daycan.api.dto.entry.document.sheet.SheetStatus;
import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.CenterDetails;
import com.daycan.api.dto.entry.document.sheet.CognitiveEntry;
import com.daycan.api.dto.entry.document.sheet.HealthCareEntry;
import com.daycan.api.dto.entry.document.sheet.MealSupport;
import com.daycan.api.dto.entry.document.sheet.PhysicalEntry;
import com.daycan.api.dto.entry.document.sheet.ProgramEntry;
import com.daycan.api.dto.entry.document.sheet.RecoveryProgramEntry;
import com.daycan.api.dto.center.request.AbsenceRegisterRequest;
import com.daycan.api.dto.center.request.CareSheetRequest;
import com.daycan.api.dto.entry.document.DayFilter;
import com.daycan.api.dto.center.response.AbsenceRegisterResponse;
import com.daycan.api.dto.center.response.CareSheetMetaResponse;
import com.daycan.api.dto.center.response.CareSheetResponse;
import com.daycan.api.dto.center.response.UrlResponse;
import com.daycan.common.response.PageResponse;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.enums.*;
import com.daycan.api.dto.entry.document.BloodPressureEntry;
import com.daycan.api.dto.entry.document.sheet.MealEntry;
import com.daycan.api.dto.entry.member.MemberMetaEntry;
import com.daycan.api.dto.entry.document.TemperatureEntry;
import com.daycan.service.document.DocumentService;

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

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin/care-sheet")
@RequiredArgsConstructor
@Tag(name = "기록지 관리", description = "관리자용 기록지 관련 API")
public class CenterCareSheetController {
  private final DocumentService documentService;

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
            SheetStatus.DONE,
            new MemberMetaEntry("MEM12345", "오애순",
                LocalDate.of(1943, 9, 12), Gender.FEMALE),
            true,
            "양금명",
            501L
        ),
        new CareSheetMetaResponse(
            1002L,
            SheetStatus.PENDING,
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
  @Deprecated
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
      @AuthenticatedUser CenterDetails centerDetails,
      @Valid @RequestBody CareSheetRequest request
  ) {
    documentService.writeCareSheet(request);
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
        true, true, true,"30분", "샤워",
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
            new ProgramEntry(ProgramType.PHYSICAL, "보행 연습", ProgramScore.MEDIUM),
            new ProgramEntry(ProgramType.COGNITIVE, "퍼즐 맞추기", ProgramScore.HIGH)
        ),
        "적극적으로 참여"
    );
  }
}
