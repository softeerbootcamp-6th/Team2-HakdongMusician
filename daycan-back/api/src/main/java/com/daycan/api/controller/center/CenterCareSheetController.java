package com.daycan.api.controller.center;

import com.daycan.api.dto.center.request.AttendanceMarkRequest;
import com.daycan.api.dto.center.request.CareSheetRequest;
import com.daycan.api.dto.center.request.SheetQueryParameters;
import com.daycan.api.dto.center.response.centermanage.AttendanceResultResponse;
import com.daycan.api.dto.center.response.sheet.CareSheetMetaResponse;
import com.daycan.api.dto.center.response.sheet.CareSheetResponse;
import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.CenterDetails;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.entry.document.sheet.SheetStatus;
import com.daycan.service.document.CenterDocumentFacade;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/admin/care-sheet")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "\uD83D\uDCDC 기록지 관리", description = "관리자용 기록지 관련 API")
public class CenterCareSheetController {

  private final CenterDocumentFacade centerDocumentFacade;

  @GetMapping("/{date}/{memberId}")
  @Operation(summary = "기록지 단건 조회", description = "수급자 ID와 날짜로 기록지를 조회합니다.")
  public ResponseWrapper<CareSheetResponse> getCareSheetByRecipientAndDate(
      @AuthenticatedUser
      CenterDetails centerDetails,

      @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
      @Schema(description = "조회할 날짜", example = "2025-08-01") LocalDate date,

      @PathVariable
      @Schema(description = "수급자 ID", example = "1") Long memberId
  ) {
    CareSheetResponse response = centerDocumentFacade.getCareSheetByMemberAndDate(
        centerDetails.getCenter(),
        memberId, date
    );
    return ResponseWrapper.onSuccess(
        response
    );
  }

  @GetMapping("/{sheetId:\\d+}")
  @Operation(summary = "기록지 단건 조회", description = "기록지 id로 기록지를 조회합니다.")
  public ResponseWrapper<CareSheetResponse> getCareSheetByRecipientAndDate(
      @AuthenticatedUser
      CenterDetails centerDetails,

      @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
      @Schema(description = "기록지 id", example = "1") Long sheetId
  ) {
    CareSheetResponse response = centerDocumentFacade.getCareSheetById(
        centerDetails.getCenter(),
        sheetId
    );
    return ResponseWrapper.onSuccess(
        response
    );
  }

  // 리스트 조회
  @GetMapping("/{date:\\d{4}-\\d{2}-\\d{2}}")
  @Operation(
      summary = "기록지 리스트 조회",
      description = """
          특정 날짜의 기록지를 조회합니다.
          """
  )
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "조회 성공")
  })
  public ResponseWrapper<List<CareSheetMetaResponse>> getCareSheetList(
      @AuthenticatedUser
      CenterDetails centerDetails,

      @ParameterObject @ModelAttribute @Valid
      SheetQueryParameters query,

      @PathVariable
      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
      @Schema(description = "조회 날짜", example = "2025-08-04")
      LocalDate date,

      @RequestParam(required = false)
      Long writerId
  ) {
    List<SheetStatus> statuses = query.statuses();
    return ResponseWrapper.onSuccess(
        centerDocumentFacade.getCareSheetMetaListByDate(
            centerDetails.getCenter(), date, writerId, statuses
        )
    );
  }

  @PostMapping("")
  @Operation(summary = "기록지 직접 등록",
      description = "기록지 내용을 업로드합니다. (신체, 인지, 건강, 기능 회복 항목 포함)")
  public ResponseWrapper<Long> uploadCareSheet(
      @AuthenticatedUser CenterDetails centerDetails,
      @Valid @RequestBody CareSheetRequest request
  ) {
    log.info("CareSheetRequest: {}", request.toString());
    Long id = centerDocumentFacade.writeCareSheet(centerDetails.getCenter(), request);
    return ResponseWrapper.onSuccess(id);
  }

  @PatchMapping("/attendance")
  @Operation(
      summary = "수급자 출결 일괄 처리",
      description = "요청으로 받은 수급자 ID 목록을 지정한 날짜에 결석/출석으로 일괄 처리합니다."
  )
  @ApiResponses(@ApiResponse(responseCode = "200", description = "처리 성공"))
  public ResponseWrapper<AttendanceResultResponse> markAttendance(
      @AuthenticatedUser CenterDetails centerDetails,
      @RequestBody @Valid AttendanceMarkRequest request
  ) {
    AttendanceResultResponse response = centerDocumentFacade.markAttendance(
        centerDetails.getCenter(),
        request.memberIds(),
        request.date(),
        request.action()
    );
    return ResponseWrapper.onSuccess(
        response
    );
  }

}
