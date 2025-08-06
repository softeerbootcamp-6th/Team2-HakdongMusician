package com.daycan.repository;

import com.daycan.domain.entity.PersonalProgram;
import com.daycan.domain.enums.ActivityScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonalProgramRepository extends JpaRepository<PersonalProgram, Long> {

  /**
   * CareSheet ID로 개인 활동 조회
   */
  @Query("SELECT pa FROM PersonalProgram pa WHERE pa.careSheet.id = :careSheetId")
  List<PersonalProgram> findByCareSheetId(@Param("careSheetId") Long careSheetId);

  /**
   * Program ID로 개인 활동 조회
   */
  @Query("SELECT pa FROM PersonalProgram pa WHERE pa.program.id = :programId")
  List<PersonalProgram> findByProgramId(@Param("programId") Long programId);

  /**
   * 특정 점수 이상의 개인 활동 조회
   */
  List<PersonalProgram> findByScoreIn(List<ActivityScore> scores);

  /**
   * CareSheet와 Program의 개인 활동 조회
   */
  @Query("SELECT pa FROM PersonalProgram pa WHERE pa.careSheet.id = :careSheetId AND pa.program.id = :activityId")
  List<PersonalProgram> findByCareSheetIdAndProgramId(@Param("careSheetId") Long careSheetId,
      @Param("programId") Long programId);
}