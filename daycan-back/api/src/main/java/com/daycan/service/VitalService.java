package com.daycan.service;


import com.daycan.repository.VitalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class VitalService {
  private final VitalRepository vitalRepository;
}
