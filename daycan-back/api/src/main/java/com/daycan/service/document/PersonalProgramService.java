package com.daycan.service.document;

import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.document.PersonalProgram;
import com.daycan.repository.jpa.PersonalProgramRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PersonalProgramService {

  private final PersonalProgramRepository personalProgramRepository;

  public List<PersonalProgram> getAllPersonalPrograms() {
    return personalProgramRepository.findAll();
  }

  public PersonalProgram getPersonalProgramById(Long id) {
    return personalProgramRepository.findById(id)
        .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));
  }

}
