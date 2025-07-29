package com.daycan.adapter.admin;

import com.daycan.application.common.dto.MemberResponse;
import com.daycan.common.response.ApiResponse;
import com.daycan.domain.enums.Gender;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/member")
@Tag(name = "👵🏻 수급자 관리", description = "관리자용 수급자 관련 API")
public class AdminMemberController {

  @GetMapping("")
  public ApiResponse<MemberResponse> getMemberList() {
    return ApiResponse.onSuccess(new MemberResponse(
        "홍길동",
        Gender.MALE,
        LocalDate.of(1950, 5, 12),
        5,
        "https://cdn.example.com/avatar/USR123.png",
        "AA1234567",
        "이보호자",
        "딸",
        LocalDate.of(1978, 10, 2),
        "010-1234-5678",
        "https://cdn.example.com/avatar/GUARD123.png",
        true));
  }

}
