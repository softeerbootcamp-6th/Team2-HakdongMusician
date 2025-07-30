package com.daycan.adapter.admin;

import com.daycan.application.admin.dto.MemberRequest;
import com.daycan.application.common.dto.MemberResponse;
import com.daycan.common.response.ApiResponse;
import com.daycan.domain.enums.Gender;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController()
@RequestMapping("/admin/member")
@Tag(name = "👵🏻 수급자 관리", description = "관리자용 수급자 관련 API")
public class AdminMemberController {

  private final List<MemberResponse> mockMemberList = Arrays.asList(
      new MemberResponse(
          "홍길동",
          Gender.MALE,
          LocalDate.of(1950, 5, 12),
          5,
          "https://cdn.example.com/avatar/USR123.png",
          "AA1234567",
          "이보호자",
          "딸",
          LocalDate.of(1978, 10, 2),
          "010-1234-5678",
          "https://cdn.example.com/avatar/GUARD123.png",
          true),
      new MemberResponse(
          "김영희",
          Gender.FEMALE,
          LocalDate.of(1945, 8, 25),
          3,
          "https://cdn.example.com/avatar/USR124.png",
          "BB2345678",
          "김보호자",
          "아들",
          LocalDate.of(1970, 3, 15),
          "010-2345-6789",
          "https://cdn.example.com/avatar/GUARD124.png",
          true),
      new MemberResponse(
          "박철수",
          Gender.MALE,
          LocalDate.of(1955, 12, 3),
          2,
          "https://cdn.example.com/avatar/USR125.png",
          "CC3456789",
          "박보호자",
          "며느리",
          LocalDate.of(1980, 7, 20),
          "010-3456-7890",
          "https://cdn.example.com/avatar/GUARD125.png",
          false));

  @GetMapping("")
  @Operation(summary = "수급자 목록 조회", description = "성별, 장기요양등급, 이름으로 필터링하여 수급자 목록을 조회합니다.")
  public ApiResponse<List<MemberResponse>> getMemberList(
      @Parameter(description = "성별 (MALE, FEMALE)", example = "MALE") @RequestParam(required = false) Gender gender,

      @Parameter(description = "장기요양등급 (1~5등급)", example = "3") @RequestParam(required = false) Integer careGrade,

      @Parameter(description = "고령자 이름 (부분 검색 가능)", example = "홍길동") @RequestParam(required = false) String name) {
    return ApiResponse.onSuccess(mockMemberList);
  }

  @PostMapping("")
  @Operation(summary = "수급자 등록", description = "새로운 수급자를 등록합니다.")
  public ApiResponse<Void> createMember(@RequestBody MemberRequest memberRequest) {
    return ApiResponse.onSuccess(null);
  }

  @PostMapping(value = "/excel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @Operation(summary = "엑셀로 수급자 일괄 등록", description = "엑셀 파일(.xlsx, .xls)을 업로드하여 수급자를 일괄 등록합니다.")
  public ApiResponse<List<MemberResponse>> createMemberFromExcel(
      @Parameter(description = "엑셀 파일 (.xlsx, .xls)", required = true) @RequestParam("file") MultipartFile file) {
    return ApiResponse.onSuccess(mockMemberList);
  }

}
