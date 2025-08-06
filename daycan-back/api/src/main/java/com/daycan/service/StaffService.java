package com.daycan.service;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.StaffErrorStatus;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.StaffRole;
import com.daycan.dto.admin.request.AdminStaffRequest;
import com.daycan.dto.admin.response.AdminStaffResponse;
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

  public List<AdminStaffResponse> getStaffList(String organizationId, StaffRole staffRole, Gender gender,
      String name) {
    List<Staff> staffList = staffRepository.findByOrganizationIdWithFilters(organizationId,
        staffRole,
        gender, name);

    return staffList.stream()
        .map(this::toAdminResponse)
        .toList();
  }

  public AdminStaffResponse getStaffById(Long id, String organizationId) {
    Staff staff = staffRepository.findByIdAndOrganizationId(id, organizationId)
        .orElseThrow(() -> new ApplicationException(StaffErrorStatus.NOT_FOUND));

    return toAdminResponse(staff);
  }

  @Transactional
  public AdminStaffResponse createStaff(AdminStaffRequest adminStaffRequest,
      String organizationId) {
    Staff staff = new Staff(
        null,
        adminStaffRequest.name(),
        adminStaffRequest.gender(),
        adminStaffRequest.staffRole(),
        adminStaffRequest.birthDate(),
        adminStaffRequest.phoneNumber(),
        adminStaffRequest.avatarUrl(),
        organizationId,
        LocalDateTime.now(),
        LocalDateTime.now(),
        null
    );

    Staff savedStaff = staffRepository.save(staff);
    return toAdminResponse(savedStaff);
  }

  @Transactional
  public AdminStaffResponse updateStaff(Long id, AdminStaffRequest adminStaffRequest,
      String organizationId) {
    Staff staff = staffRepository.findByIdAndOrganizationId(id, organizationId)
        .orElseThrow(() -> new ApplicationException(StaffErrorStatus.NOT_FOUND));

    Staff updatedStaff = new Staff(
        staff.getId(),
        adminStaffRequest.name(),
        adminStaffRequest.gender(),
        adminStaffRequest.staffRole(),
        adminStaffRequest.birthDate(),
        adminStaffRequest.phoneNumber(),
        adminStaffRequest.avatarUrl(),
        organizationId,
        staff.getCreatedAt(),
        staff.getUpdatedAt(),
        staff.getDeletedAt());

    Staff savedStaff = staffRepository.save(updatedStaff);
    return toAdminResponse(savedStaff);
  }

  @Transactional
  public void deleteStaff(Long id, String organizationId) {
    Staff staff = staffRepository.findByIdAndOrganizationId(id, organizationId)
        .orElseThrow(() -> new ApplicationException(StaffErrorStatus.NOT_FOUND));

    staffRepository.delete(staff);
  }

  private AdminStaffResponse toAdminResponse(Staff staff) {
    return new AdminStaffResponse(
        staff.getId(),
        staff.getOrganizationId(),
        staff.getName(),
        staff.getGender(),
        staff.getStaffRole(),
        staff.getBirthDate(),
        staff.getPhoneNumber(),
        staff.getAvatarUrl()
    );
  }
}