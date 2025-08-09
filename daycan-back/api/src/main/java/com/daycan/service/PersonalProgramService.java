package com.daycan.service;

import com.daycan.domain.entity.Document;
import com.daycan.exceptions.ApplicationException;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.PersonalProgram;
import com.daycan.domain.enums.ProgramScore;
import com.daycan.repository.jpa.PersonalProgramRepository;

import java.time.LocalDate;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PersonalProgramService {

  private final PersonalProgramRepository personalProgramRepository;

  public List<PersonalProgram> getAllPersonalActivities() {
    return personalProgramRepository.findAll();
  }

  public PersonalProgram getPersonalActivityById(Long id) {
    return personalProgramRepository.findById(id)
        .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));
  }

  public List<PersonalProgram> getPersonalActivitiesByDocumentId(Long documentId) {
    return personalProgramRepository.findByDocumentId(documentId);
  }

  public List<PersonalProgram> getPersonalActivitiesByMemberAndDate(Long memberId, LocalDate docDate) {
    return personalProgramRepository.findByDocumentMemberIdAndDocumentDocDate(memberId, docDate);
  }

  public List<PersonalProgram> getPersonalActivitiesByProgram(String program) {
    return personalProgramRepository.findByProgramName(program);
  }

  public List<PersonalProgram> getPersonalActivitiesByPrograms(Collection<String> programs) {
    return personalProgramRepository.findByProgramNameIn(programs);
  }

  public List<PersonalProgram> getPersonalActivitiesByScores(Collection<ProgramScore> scores) {
    return personalProgramRepository.findByScoreIn(scores);
  }

  public List<PersonalProgram> getPersonalActivitiesByDocumentAndProgram(Long documentId, String program) {
    return personalProgramRepository.findByDocumentIdAndProgramName(documentId, program);
  }

  public List<PersonalProgram> getPersonalActivitiesByMemberDateAndProgram(
      Long memberId, LocalDate docDate, String program) {
    return personalProgramRepository
        .findByDocumentMemberIdAndDocumentDocDateAndProgramName(memberId, docDate, program);
  }

  @Transactional
  public PersonalProgram createPersonalActivity(Document document, String program,
      ProgramScore score, String personalNote) {

    PersonalProgram entity = PersonalProgram.builder()
        .document(document)
        .programName(program)
        .score(score)
        .personalNote(personalNote)
        .build();

    return personalProgramRepository.save(entity);
  }

  @Transactional
  public PersonalProgram updatePersonalProgram(Long id, ProgramScore score, String personalNote) {
    PersonalProgram personalProgram = getPersonalActivityById(id);
    personalProgram.update(score, personalNote);
    return personalProgram;
  }

  @Transactional
  public void deletePersonalProgram(Long id) {
    if (!personalProgramRepository.existsById(id)) {
      throw new ApplicationException(CommonErrorStatus.NOT_FOUND);
    }
    personalProgramRepository.deleteById(id);
  }

  @Transactional
  public void deletePersonalProgramsByDocumentId(Long documentId) {
    personalProgramRepository.deleteByDocumentId(documentId);
  }
}
