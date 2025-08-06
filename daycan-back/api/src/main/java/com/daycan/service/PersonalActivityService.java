package com.daycan.service;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.Activity;
import com.daycan.domain.entity.CareSheet;
import com.daycan.domain.entity.PersonalActivity;
import com.daycan.domain.enums.ActivityScore;
import com.daycan.repository.PersonalActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PersonalActivityService {

  private final PersonalActivityRepository personalActivityRepository;
  private final ActivityService activityService;

  /**
   * 모든 개인 활동 조회
   */
  public List<PersonalActivity> getAllPersonalActivities() {
    return personalActivityRepository.findAll();
  }

  /**
   * ID로 개인 활동 조회
   */
  public PersonalActivity getPersonalActivityById(Long id) {
    return personalActivityRepository.findById(id)
        .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));
  }

  /**
   * CareSheet ID로 개인 활동 목록 조회
   */
  public List<PersonalActivity> getPersonalActivitiesByCareSheetId(Long careSheetId) {
    return personalActivityRepository.findByCareSheetId(careSheetId);
  }

  /**
   * Activity ID로 개인 활동 목록 조회
   */
  public List<PersonalActivity> getPersonalActivitiesByActivityId(Long activityId) {
    return personalActivityRepository.findByActivityId(activityId);
  }

  /**
   * 특정 점수 범위의 개인 활동 조회
   */
  public List<PersonalActivity> getPersonalActivitiesByScores(List<ActivityScore> scores) {
    return personalActivityRepository.findByScoreIn(scores);
  }

  /**
   * CareSheet와 Activity로 개인 활동 조회
   */
  public List<PersonalActivity> getPersonalActivitiesByCareSheetAndActivity(Long careSheetId, Long activityId) {
    return personalActivityRepository.findByCareSheetIdAndActivityId(careSheetId, activityId);
  }

  /**
   * 새로운 개인 활동 생성
   */
  @Transactional
  public PersonalActivity createPersonalActivity(CareSheet careSheet, Long activityId,
      ActivityScore score, String personalNote) {
    Activity activity = activityService.getActivityById(activityId);

    PersonalActivity personalActivity = PersonalActivity.builder()
        .careSheet(careSheet)
        .activity(activity)
        .score(score)
        .personalNote(personalNote)
        .build();

    return personalActivityRepository.save(personalActivity);
  }

  /**
   * 개인 활동 수정
   */
  @Transactional
  public PersonalActivity updatePersonalActivity(Long id, ActivityScore score, String personalNote) {
    PersonalActivity existingActivity = getPersonalActivityById(id);

    PersonalActivity updatedActivity = PersonalActivity.builder()
        .id(existingActivity.getId())
        .careSheet(existingActivity.getCareSheet())
        .activity(existingActivity.getActivity())
        .score(score != null ? score : existingActivity.getScore())
        .personalNote(personalNote != null ? personalNote : existingActivity.getPersonalNote())
        .build();

    return personalActivityRepository.save(updatedActivity);
  }

  /**
   * 개인 활동 삭제
   */
  @Transactional
  public void deletePersonalActivity(Long id) {
    if (!personalActivityRepository.existsById(id)) {
      throw new ApplicationException(CommonErrorStatus.NOT_FOUND);
    }
    personalActivityRepository.deleteById(id);
  }

  /**
   * CareSheet의 모든 개인 활동 삭제
   */
  @Transactional
  public void deletePersonalActivitiesByCareSheetId(Long careSheetId) {
    List<PersonalActivity> personalActivities = getPersonalActivitiesByCareSheetId(careSheetId);
    personalActivityRepository.deleteAll(personalActivities);
  }
}