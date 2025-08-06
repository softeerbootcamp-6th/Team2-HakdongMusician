package com.daycan.service;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.Program;
import com.daycan.domain.entity.CareSheet;
import com.daycan.domain.entity.PersonalProgram;
import com.daycan.domain.enums.ActivityScore;
import com.daycan.repository.PersonalProgramRepository;
import com.daycan.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PersonalProgramService {

  private final PersonalProgramRepository personalProgramRepository;
  private final ProgramRepository programRepository;

  /**
   * 모든 개인 활동 조회
   */
  public List<PersonalProgram> getAllPersonalActivities() {
    return personalProgramRepository.findAll();
  }

  /**
   * ID로 개인 활동 조회
   */
  public PersonalProgram getPersonalActivityById(Long id) {
    return personalProgramRepository.findById(id)
        .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));
  }

  /**
   * CareSheet ID로 개인 활동 목록 조회
   */
  public List<PersonalProgram> getPersonalActivitiesByCareSheetId(Long careSheetId) {
    return personalProgramRepository.findByCareSheetId(careSheetId);
  }

  /**
   * Activity ID로 개인 활동 목록 조회
   */
  public List<PersonalProgram> getPersonalActivitiesByActivityId(Long programId) {
    return personalProgramRepository.findByProgramId(programId);
  }

  /**
   * 특정 점수 범위의 개인 활동 조회
   */
  public List<PersonalProgram> getPersonalActivitiesByScores(List<ActivityScore> scores) {
    return personalProgramRepository.findByScoreIn(scores);
  }

  /**
   * CareSheet와 Activity로 개인 활동 조회
   */
  public List<PersonalProgram> getPersonalActivitiesByCareSheetAndActivity(Long careSheetId, Long activityId) {
    return personalProgramRepository.findByCareSheetIdAndProgramId(careSheetId, activityId);
  }

  /**
   * 새로운 개인 활동 생성
   */
  @Transactional
  public PersonalProgram createPersonalActivity(CareSheet careSheet, Long programId,
      ActivityScore score, String personalNote) {
    Program program = programRepository.findById(programId)
        .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));

    PersonalProgram personalProgram = PersonalProgram.builder()
        .careSheet(careSheet)
        .program(program)
        .score(score)
        .personalNote(personalNote)
        .build();

    return personalProgramRepository.save(personalProgram);
  }

  /**
   * 개인 활동 수정
   */
  @Transactional
  public PersonalProgram updatePersonalActivity(Long id, ActivityScore score, String personalNote) {
    PersonalProgram existingActivity = getPersonalActivityById(id);

    PersonalProgram updatedActivity = PersonalProgram.builder()
        .id(existingActivity.getId())
        .careSheet(existingActivity.getCareSheet())
        .program(existingActivity.getProgram())
        .score(score != null ? score : existingActivity.getScore())
        .personalNote(personalNote != null ? personalNote : existingActivity.getPersonalNote())
        .build();

    return personalProgramRepository.save(updatedActivity);
  }

  /**
   * 개인 활동 삭제
   */
  @Transactional
  public void deletePersonalActivity(Long id) {
    if (!personalProgramRepository.existsById(id)) {
      throw new ApplicationException(CommonErrorStatus.NOT_FOUND);
    }
    personalProgramRepository.deleteById(id);
  }

  /**
   * CareSheet의 모든 개인 활동 삭제
   */
  @Transactional
  public void deletePersonalActivitiesByCareSheetId(Long careSheetId) {
    List<PersonalProgram> personalActivities = getPersonalActivitiesByCareSheetId(careSheetId);
    personalProgramRepository.deleteAll(personalActivities);
  }
}