package com.daycan.repository;

import com.daycan.domain.entity.PersonalActivity;
import com.daycan.domain.enums.ActivityScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonalActivityRepository extends JpaRepository<PersonalActivity, Long> {

  /**
   * CareSheet ID로 개인 활동 조회
   */
  @Query("SELECT pa FROM PersonalActivity pa WHERE pa.careSheet.id = :careSheetId")
  List<PersonalActivity> findByCareSheetId(@Param("careSheetId") Long careSheetId);

  /**
   * Activity ID로 개인 활동 조회
   */
  @Query("SELECT pa FROM PersonalActivity pa WHERE pa.activity.id = :activityId")
  List<PersonalActivity> findByActivityId(@Param("activityId") Long activityId);

  /**
   * 특정 점수 이상의 개인 활동 조회
   */
  List<PersonalActivity> findByScoreIn(List<ActivityScore> scores);

  /**
   * CareSheet와 Activity로 개인 활동 조회
   */
  @Query("SELECT pa FROM PersonalActivity pa WHERE pa.careSheet.id = :careSheetId AND pa.activity.id = :activityId")
  List<PersonalActivity> findByCareSheetIdAndActivityId(@Param("careSheetId") Long careSheetId,
      @Param("activityId") Long activityId);
}