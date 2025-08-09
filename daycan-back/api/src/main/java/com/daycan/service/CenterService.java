package com.daycan.service;

import com.daycan.exceptions.ApplicationException;
import com.daycan.common.response.status.CenterErrorStatus;
import com.daycan.domain.entity.Center;
import com.daycan.dto.admin.response.CenterResponse;
import com.daycan.repository.CenterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CenterService {

  private final CenterRepository centerRepository;

  public CenterResponse getCenterInfo(Long centerId) {
    Center center = centerRepository.findById(centerId)
        .orElseThrow(() -> new ApplicationException(CenterErrorStatus.NOT_FOUND));

    return new CenterResponse(
        center.getName(),
        center.getLocation(),
        center.getPhoneNumber(),
        center.getLogoUrl()
    );
  }
}
