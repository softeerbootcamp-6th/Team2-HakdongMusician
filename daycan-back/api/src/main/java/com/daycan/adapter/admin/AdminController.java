package com.daycan.adapter.admin;

import com.daycan.application.admin.dto.AdminRequest;
import com.daycan.application.admin.dto.AdminResponse;
import com.daycan.common.response.ApiResponse;
import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.Role;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@Tag(name = "👨‍💼 종사자 관리", description = "관리자용 종사자 관련 API")
public class AdminController {

  private final List<AdminResponse> mockAdminList = List.of(
      new AdminResponse(
          1L,
          "CTR00001234",
          "홍관리",
          Gender.MALE,
          Role.DIRECTOR,
          LocalDate.of(1985, 3, 15),
          "010-1234-5678",
          "https://cdn.example.com/avatar/ADMIN_001.png",
          "hongadmin"),
      new AdminResponse(
          2L,
          "CTR00001234",
          "김간호",
          Gender.FEMALE,
          Role.SOCIAL_WORKER,
          LocalDate.of(1990, 7, 22),
          "010-2345-6789",
          "https://cdn.example.com/avatar/ADMIN_002.png",
          "kimnurse"),
      new AdminResponse(
          3L,
          "CTR00001234",
          "박의사",
          Gender.MALE,
          Role.CAREGIVER,
          LocalDate.of(1982, 12, 8),
          "010-3456-7890",
          "https://cdn.example.com/avatar/ADMIN_003.png",
          "parkdoctor"));

  @GetMapping("")
  @Operation(summary = "종사자 목록 조회", description = "직무, 성별, 이름으로 필터링하여 종사자 목록을 조회합니다.")
  public ApiResponse<List<AdminResponse>> getAdminList(
      @Parameter(description = "직무/역할 (DIRECTOR: 센터장, SOCIAL_WORKER: 사회복지사, CAREGIVER: 요양보호사)", example = "SOCIAL_WORKER") @RequestParam(required = false) Role role,

      @Parameter(description = "성별 (MALE, FEMALE)", example = "FEMALE") @RequestParam(required = false) Gender gender,

      @Parameter(description = "종사자 이름 (부분 검색 가능)", example = "김간호") @RequestParam(required = false) String name) {
    // TODO: 실제 필터링 로직 구현 필요
    return ApiResponse.onSuccess(mockAdminList);
  }

  @GetMapping("/{id}")
  @Operation(summary = "종사자 상세 조회", description = "특정 종사자의 상세 정보를 조회합니다.")
  public ApiResponse<AdminResponse> getAdminById(
      @Parameter(description = "종사자 ID", example = "1") @PathVariable Long id) {
    // TODO: 실제 ID로 조회하는 로직 구현
    return ApiResponse.onSuccess(mockAdminList.get(0));
  }

  @PostMapping("")
  @Operation(summary = "종사자 등록", description = "새로운 종사자를 등록합니다.")
  public ApiResponse<AdminResponse> createAdmin(@RequestBody AdminRequest adminRequest) {
    // TODO: 실제 종사자 등록 로직 구현
    AdminResponse newAdmin = new AdminResponse(
        99L,
        adminRequest.centerId(),
        adminRequest.name(),
        adminRequest.gender(),
        adminRequest.role(),
        adminRequest.birthDate(),
        adminRequest.phoneNumber(),
        adminRequest.avatarUrl(),
        adminRequest.username());
    return ApiResponse.onSuccess(newAdmin);
  }

  @PutMapping("/{id}")
  @Operation(summary = "종사자 정보 수정", description = "기존 종사자의 정보를 수정합니다.")
  public ApiResponse<AdminResponse> updateAdmin(
      @Parameter(description = "종사자 ID", example = "1") @PathVariable Long id,
      @RequestBody AdminRequest adminRequest) {
    // TODO: 실제 종사자 정보 수정 로직 구현
    AdminResponse updatedAdmin = new AdminResponse(
        id,
        adminRequest.centerId(),
        adminRequest.name(),
        adminRequest.gender(),
        adminRequest.role(),
        adminRequest.birthDate(),
        adminRequest.phoneNumber(),
        adminRequest.avatarUrl(),
        adminRequest.username());
    return ApiResponse.onSuccess(updatedAdmin);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "종사자 삭제", description = "특정 종사자를 삭제합니다.")
  public ApiResponse<Void> deleteAdmin(
      @Parameter(description = "종사자 ID", example = "1") @PathVariable Long id) {
    return ApiResponse.OK;
  }

}