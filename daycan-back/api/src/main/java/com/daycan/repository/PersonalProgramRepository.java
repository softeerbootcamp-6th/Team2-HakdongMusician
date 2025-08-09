package com.daycan.repository;

import com.daycan.domain.entity.PersonalProgram;
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
  List<PersonalProgram> findByDocumentId(Long documentId);

  // 문서 + 프로그램명
  List<PersonalProgram> findByDocumentIdAndProgramName(Long documentId, String programName);

  // 멤버 + 일자(문서 경유)
  List<PersonalProgram> findByDocumentMemberIdAndDocumentDocDate(Long memberId, LocalDate docDate);

  // 멤버 + 일자 + 프로그램명
  List<PersonalProgram> findByDocumentMemberIdAndDocumentDocDateAndProgramName(
      Long memberId, LocalDate docDate, String programName);

  // 프로그램/점수 필터
  List<PersonalProgram> findByProgramName(String programName);
  List<PersonalProgram> findByProgramNameIn(Collection<String> programNames);

  List<PersonalProgram> findByScoreIn(Collection<ProgramScore> scores);

  // 일괄 삭제(문서 단위)
  void deleteByDocumentId(Long documentId);

  // 정렬/페이징
  Page<PersonalProgram> findByDocumentId(Long documentId, Pageable pageable);
}
