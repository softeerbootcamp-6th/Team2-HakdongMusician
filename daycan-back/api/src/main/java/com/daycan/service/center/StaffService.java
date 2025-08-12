package com.daycan.service.center;

import com.daycan.domain.entity.Center;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.StaffErrorStatus;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.StaffRole;
import com.daycan.api.dto.center.request.AdminStaffRequest;
import com.daycan.api.dto.center.response.centermanage.AdminStaffResponse;
import com.daycan.repository.jpa.CenterRepository;
import com.daycan.repository.jpa.StaffRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StaffService {

  private final StaffRepository staffRepository;
  private final CenterRepository centerRepository; // ← 추가

  @Transactional(readOnly = true)
  public List<AdminStaffResponse> getStaffList(Long centerId, StaffRole staffRole, Gender gender,
      String name) {
    List<Staff> staffList = staffRepository.findByCenterWithFilters(centerId, staffRole, gender,
        name);
    return staffList.stream().map(this::toAdminResponse).toList();
  }

  @Transactional(readOnly = true)
  public AdminStaffResponse getStaffById(Long id, Long centerId) {
    Staff staff = staffRepository.findByIdAndCenterId(id, centerId)
        .orElseThrow(() -> new ApplicationException(StaffErrorStatus.NOT_FOUND));
    return toAdminResponse(staff);
  }


  @Transactional
  public AdminStaffResponse createStaff(AdminStaffRequest req, Center center) {
    Staff staff = Staff.builder()
        .name(req.name())
        .gender(req.gender())
        .center(center)
        .staffRole(req.staffRole())
        .birthDate(req.birthDate())
        .phoneNumber(req.phoneNumber())
        .avatarUrl(req.avatarUrl())
        .build();

    Staff saved = staffRepository.save(staff);
    return toAdminResponse(saved);
  }

  @Transactional
  public AdminStaffResponse updateStaff(Long id, AdminStaffRequest req, Long centerId) {
    Staff staff = staffRepository.findByIdAndCenterId(id, centerId)
        .orElseThrow(() -> new ApplicationException(StaffErrorStatus.NOT_FOUND));

    staff.update(
        req.name(),
        req.gender(),
        req.staffRole(),
        req.birthDate(),
        req.phoneNumber(),
        req.avatarUrl()
    );

    return toAdminResponse(staff);
  }

  @Transactional
  public void deleteStaff(Long id, Long centerId) {
    Staff staff = staffRepository.findByIdAndCenterId(id, centerId)
        .orElseThrow(() -> new ApplicationException(StaffErrorStatus.NOT_FOUND));
    staffRepository.delete(staff);
  }


  /*
   * ---- helper method ----
   */

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
