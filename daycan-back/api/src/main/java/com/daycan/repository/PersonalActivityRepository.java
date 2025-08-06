package com.daycan.repository;

import com.daycan.domain.entity.PersonalProgram;
import com.daycan.domain.enums.ActivityScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonalActivityRepository extends JpaRepository<PersonalProgram, Long> {

  /**
   * CareSheet ID로 개인 활동 조회
   */
  @Query("SELECT pa FROM PersonalProgram pa WHERE pa.careSheet.id = :careSheetId")
  List<PersonalProgram> findByCareSheetId(@Param("careSheetId") Long careSheetId);

  /**
   * Activity ID로 개인 활동 조회
   */
  @Query("SELECT pa FROM PersonalProgram pa WHERE pa.activity.id = :activityId")
  List<PersonalProgram> findByActivityId(@Param("activityId") Long activityId);

  /**
   * 특정 점수 이상의 개인 활동 조회
   */
  List<PersonalProgram> findByScoreIn(List<ActivityScore> scores);

  /**
   * CareSheet와 Activity로 개인 활동 조회
   */
  @Query("SELECT pa FROM PersonalProgram pa WHERE pa.careSheet.id = :careSheetId AND pa.activity.id = :activityId")
  List<PersonalProgram> findByCareSheetIdAndActivityId(@Param("careSheetId") Long careSheetId,
      @Param("activityId") Long activityId);
}