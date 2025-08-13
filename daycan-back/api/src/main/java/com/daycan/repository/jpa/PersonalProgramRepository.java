package com.daycan.repository.jpa;

import com.daycan.domain.entity.document.PersonalProgram;

import com.daycan.domain.enums.ProgramScore;
import java.time.LocalDate;
import java.util.Collection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonalProgramRepository extends JpaRepository<PersonalProgram, Long> {

  // 문서 단위 전체
  List<PersonalProgram> findByCareSheetId(Long careSheetId);

  // CareSheet + 프로그램명
  List<PersonalProgram> findByCareSheetIdAndProgramName(Long careSheetId, String programName);

  // 멤버 + 일자 (CareSheet -> Document 경유)
  List<PersonalProgram> findByCareSheetDocumentMemberIdAndCareSheetDocumentDate(
      Long memberId, LocalDate docDate);

  // 멤버 + 일자 + 프로그램명
  List<PersonalProgram> findByCareSheetDocumentMemberIdAndCareSheetDocumentDateAndProgramName(
      Long memberId, LocalDate docDate, String programName);

  // 프로그램/점수 필터
  List<PersonalProgram> findByProgramName(String programName);
  List<PersonalProgram> findByProgramNameIn(Collection<String> programNames);
  List<PersonalProgram> findByScoreIn(Collection<ProgramScore> scores);

  // CareSheet 단위 일괄 삭제
  void deleteByCareSheetId(Long careSheetId);

  // 페이징 예시
  Page<PersonalProgram> findByCareSheetId(Long careSheetId, Pageable pageable);

}
