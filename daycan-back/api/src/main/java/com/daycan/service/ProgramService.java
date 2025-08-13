package com.daycan.service;

import com.daycan.domain.entity.Center;
import com.daycan.domain.enums.ProgramType;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.CommonErrorStatus;
import com.daycan.domain.entity.Program;
import com.daycan.repository.jpa.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProgramService {

  private final ProgramRepository programRepository;

  /**
   * 모든 활동 조회 (이름순)
   */
  public List<Program> getAllPrograms() {
    return programRepository.findAllByOrderByName();
  }

  /**
   * ID로 활동 조회
   */
  public Program getProgramById(Long id) {
    return programRepository.findById(id)
        .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));
  }

  /**
   * 활동명으로 검색
   */
  public List<Program> searchActivitiesByName(String name) {
    return programRepository.findByNameContaining(name);
  }

  /**
   * 새로운 활동 생성
   */
  @Transactional
  public Program createProgram(Center center, String name,  ProgramType programType) {
    Program program = Program.builder()
        .center(center)
        .name(name)
        .programType(programType)
        .build();

    return programRepository.save(program);
  }

//  /**
//   * 활동 정보 수정
//   */
//  @Transactional
//  public Program updateActivity(Long id, String name, String attribute) {
//    Program existingProgram = getProgramById(id);
//
//    Program updatedProgram = Program.builder()
//        .id(existingProgram.getId())
//        .name(name != null ? name : existingProgram.getName())
//        .attribute(attribute != null ? attribute : existingProgram.getAttribute())
//        .build();
//
//    return programRepository.save(updatedProgram);
//  }
//
//  /**
//   * 활동 삭제
//   */
//  @Transactional
//  public void deleteProgram(Long id) {
//    if (!programRepository.existsById(id)) {
//      throw new ApplicationException(CommonErrorStatus.NOT_FOUND);
//    }
//    programRepository.deleteById(id);
//  }
}