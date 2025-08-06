package com.daycan.service;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.Program;
import com.daycan.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ActivityService {

  private final ActivityRepository activityRepository;

  /**
   * 모든 활동 조회 (이름순)
   */
  public List<Program> getAllActivities() {
    return activityRepository.findAllByOrderByName();
  }

  /**
   * ID로 활동 조회
   */
  public Program getActivityById(Long id) {
    return activityRepository.findById(id)
        .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));
  }

  /**
   * 활동명으로 검색
   */
  public List<Program> searchActivitiesByName(String name) {
    return activityRepository.findByNameContaining(name);
  }

  /**
   * 속성으로 활동 검색
   */
  public List<Program> searchActivitiesByAttribute(String attribute) {
    return activityRepository.findByAttributeContaining(attribute);
  }

  /**
   * 새로운 활동 생성
   */
  @Transactional
  public Program createActivity(String name, String attribute) {
    Program program = Program.builder()
        .name(name)
        .attribute(attribute)
        .build();

    return activityRepository.save(program);
  }

  /**
   * 활동 정보 수정
   */
  @Transactional
  public Program updateActivity(Long id, String name, String attribute) {
    Program existingProgram = getActivityById(id);

    Program updatedProgram = Program.builder()
        .id(existingProgram.getId())
        .name(name != null ? name : existingProgram.getName())
        .attribute(attribute != null ? attribute : existingProgram.getAttribute())
        .build();

    return activityRepository.save(updatedProgram);
  }

  /**
   * 활동 삭제
   */
  @Transactional
  public void deleteActivity(Long id) {
    if (!activityRepository.existsById(id)) {
      throw new ApplicationException(CommonErrorStatus.NOT_FOUND);
    }
    activityRepository.deleteById(id);
  }
}