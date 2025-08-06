package com.daycan.facade;

import com.daycan.repository.PersonalProgramRepository;
import com.daycan.service.AiCommentService;
import com.daycan.service.MemberService;
import com.daycan.service.PersonalProgramService;
import com.daycan.service.ProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberReportFacade {
  private final MemberService memberService;
  private final AiCommentService aiCommentService;
  private final ProgramService programService;
  private final PersonalProgramService personalProgramService;

  // 건강
  // ai comment 2,3 개 식사
}
