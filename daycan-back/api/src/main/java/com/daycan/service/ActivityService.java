package com.daycan.service;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.Activity;
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
  public List<Activity> getAllActivities() {
    return activityRepository.findAllByOrderByName();
  }

  /**
   * ID로 활동 조회
   */
  public Activity getActivityById(Long id) {
    return activityRepository.findById(id)
        .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));
  }

  /**
   * 활동명으로 검색
   */
  public List<Activity> searchActivitiesByName(String name) {
    return activityRepository.findByNameContaining(name);
  }

  /**
   * 속성으로 활동 검색
   */
  public List<Activity> searchActivitiesByAttribute(String attribute) {
    return activityRepository.findByAttributeContaining(attribute);
  }

  /**
   * 새로운 활동 생성
   */
  @Transactional
  public Activity createActivity(String name, String attribute) {
    Activity activity = Activity.builder()
        .name(name)
        .attribute(attribute)
        .build();

    return activityRepository.save(activity);
  }

  /**
   * 활동 정보 수정
   */
  @Transactional
  public Activity updateActivity(Long id, String name, String attribute) {
    Activity existingActivity = getActivityById(id);

    Activity updatedActivity = Activity.builder()
        .id(existingActivity.getId())
        .name(name != null ? name : existingActivity.getName())
        .attribute(attribute != null ? attribute : existingActivity.getAttribute())
        .build();

    return activityRepository.save(updatedActivity);
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