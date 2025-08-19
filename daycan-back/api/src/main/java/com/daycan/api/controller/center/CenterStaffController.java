package com.daycan.api.controller.center;

import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.CenterDetails;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.entity.Center;
import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.StaffRole;
import com.daycan.api.dto.center.request.AdminStaffRequest;
import com.daycan.api.dto.center.response.centermanage.AdminStaffResponse;
import com.daycan.service.center.StaffService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
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
@RequestMapping("/admin/staff")
@Tag(name = "\uD83D\uDC77\u200D♂\uFE0F 종사자 관리", description = "관리자용 종사자 관련 API")
@RequiredArgsConstructor
@Validated
public class CenterStaffController {

  private final StaffService staffService;

  @GetMapping("")
  @Operation(summary = "종사자 목록 조회", description = "직무, 성별, 이름으로 필터링하여 종사자 목록을 조회합니다.")
  public ResponseWrapper<List<AdminStaffResponse>> getStaffList(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "직무/역할 (DIRECTOR: 센터장, SOCIAL_WORKER: 사회복지사, CAREGIVER: 요양보호사)", example = "ROLE_SOCIAL_WORKER") @RequestParam(required = false) StaffRole staffRole,
      @Parameter(description = "성별 (MALE, FEMALE)", example = "FEMALE") @RequestParam(required = false) Gender gender,
      @Parameter(description = "종사자 이름 (부분 검색 가능)", example = "김간호") @RequestParam(required = false) String name) {
    Center center = centerDetails.getCenter();

    List<AdminStaffResponse> staffList = staffService.getStaffList(
        center.getId(),
        staffRole,
        gender,
        name);
    return ResponseWrapper.onSuccess(staffList);
  }

  @GetMapping("/{id}")
  @Operation(summary = "종사자 상세 조회", description = "특정 종사자의 상세 정보를 조회합니다.")
  public ResponseWrapper<AdminStaffResponse> getStaffById(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "종사자 ID", example = "1") @PathVariable Long id) {
    Center center = centerDetails.getCenter();

    AdminStaffResponse staff = staffService.getStaffById(id, center.getId());
    return ResponseWrapper.onSuccess(staff);
  }

  @PostMapping("")
  @Operation(summary = "종사자 등록", description = "새로운 종사자를 등록합니다."
      + "<br> 로그인 되어 있는 센터에 종사자를 등록합니다.")
  public ResponseWrapper<AdminStaffResponse> createStaff(
      @AuthenticatedUser CenterDetails centerDetails,
      @RequestBody AdminStaffRequest adminStaffRequest) {
    Center center = centerDetails.getCenter();

    AdminStaffResponse newStaff = staffService.createStaff(adminStaffRequest,
        center);
    return ResponseWrapper.onSuccess(newStaff);
  }

  @PutMapping("/{id}")
  @Operation(summary = "종사자 정보 수정", description = "기존 종사자의 정보를 수정합니다.")
  public ResponseWrapper<AdminStaffResponse> updateStaff(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "종사자 ID", example = "1") @PathVariable Long id,
      @RequestBody AdminStaffRequest adminStaffRequest) {
    Center center = centerDetails.getCenter();
    AdminStaffResponse updatedStaff = staffService.updateStaff(id, adminStaffRequest,
        center.getId());
    return ResponseWrapper.onSuccess(updatedStaff);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "종사자 삭제", description = "특정 종사자를 삭제합니다.")
  public ResponseWrapper<Void> deleteStaff(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "종사자 ID", example = "1") @PathVariable Long id) {
    Center center = centerDetails.getCenter();

    staffService.deleteStaff(id, center.getId());
    return ResponseWrapper.onSuccess(null);
  }

}