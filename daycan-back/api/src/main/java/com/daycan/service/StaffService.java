package com.daycan.service;

import com.daycan.common.response.status.CenterErrorStatus;
import com.daycan.domain.entity.Center;
import com.daycan.exceptions.ApplicationException;
import com.daycan.common.response.status.StaffErrorStatus;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.StaffRole;
import com.daycan.dto.admin.request.AdminStaffRequest;
import com.daycan.dto.admin.response.AdminStaffResponse;
import com.daycan.repository.CenterRepository;
import com.daycan.repository.StaffRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StaffService {

  private final StaffRepository staffRepository;
  private final CenterRepository centerRepository; // ← 추가

  public List<AdminStaffResponse> getStaffList(Long centerId, StaffRole staffRole, Gender gender, String name) {
    List<Staff> staffList = staffRepository.findByCenterWithFilters(centerId, staffRole, gender, name);
    return staffList.stream().map(this::toAdminResponse).toList();
  }

  public AdminStaffResponse getStaffById(Long id, Long centerId) {
    Staff staff = staffRepository.findByIdAndCenterId(id, centerId)
        .orElseThrow(() -> new ApplicationException(StaffErrorStatus.NOT_FOUND));
    return toAdminResponse(staff);
  }

  // ───────────────────────── write ops ─────────────────────────

  @Transactional
  public AdminStaffResponse createStaff(AdminStaffRequest req, Long centerId) {
    Center center = requireCenter(centerId);

    Staff staff = Staff.builder()
        .name(req.name())
        .gender(req.gender())
        .staffRole(req.staffRole())
        .birthDate(req.birthDate())
        .phoneNumber(req.phoneNumber())
        .avatarUrl(req.avatarUrl())
        .center(center)                      // ← 연관 주입
        .build();

    Staff saved = staffRepository.save(staff);
    return toAdminResponse(saved);
  }

  @Transactional
  public AdminStaffResponse updateStaff(Long id, AdminStaffRequest req, Long centerId) {
    Staff staff = staffRepository.findByIdAndCenterId(id, centerId)
        .orElseThrow(() -> new ApplicationException(StaffErrorStatus.NOT_FOUND));

    // 엔티티가 @Builder(toBuilder = true)이므로 toBuilder로 부분 업데이트
    staff = staff.toBuilder()
        .name(req.name())
        .gender(req.gender())
        .staffRole(req.staffRole())
        .birthDate(req.birthDate())
        .phoneNumber(req.phoneNumber())
        .avatarUrl(req.avatarUrl())
        .build();

    Staff saved = staffRepository.save(staff);
    return toAdminResponse(saved);
  }

  @Transactional
  public void deleteStaff(Long id, Long centerId) {
    Staff staff = staffRepository.findByIdAndCenterId(id, centerId)
        .orElseThrow(() -> new ApplicationException(StaffErrorStatus.NOT_FOUND));
    staffRepository.delete(staff); // 소프트 삭제가 필요하면 필드/메서드로 전환
  }

  // ───────────────────────── helpers ─────────────────────────

  private Center requireCenter(Long centerId) {
    return centerRepository.findById(centerId)
        .orElseThrow(() -> new ApplicationException(CenterErrorStatus.NOT_FOUND));
  }

  private AdminStaffResponse toAdminResponse(Staff s) {
    return new AdminStaffResponse(
        s.getId(),
        s.getCenter().getId(),
        s.getName(),
        s.getGender(),
        s.getStaffRole(),
        s.getBirthDate(),
        s.getPhoneNumber(),
        s.getAvatarUrl()
    );
  }
}
