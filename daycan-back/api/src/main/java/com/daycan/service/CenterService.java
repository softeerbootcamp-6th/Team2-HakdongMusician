package com.daycan.service;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.CenterErrorStatus;
import com.daycan.domain.entity.Center;
import com.daycan.dto.admin.response.CenterResponse;
import com.daycan.repository.CenterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CenterService {

  private final CenterRepository centerRepository;

  public CenterResponse getCenterInfo(String organizationId) {
    Center center = centerRepository.findById(organizationId)
        .orElseThrow(() -> new ApplicationException(CenterErrorStatus.NOT_FOUND));

    return new CenterResponse(
        center.getName(),
        center.getLocation(),
        center.getPhoneNumber(),
        center.getLogoUrl());
  }
}
