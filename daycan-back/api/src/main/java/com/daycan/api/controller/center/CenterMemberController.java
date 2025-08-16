package com.daycan.api.controller.center;

import com.daycan.auth.annotation.AuthenticatedUser;
import com.daycan.auth.model.CenterDetails;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.entity.Center;
import com.daycan.domain.enums.Gender;
import com.daycan.api.dto.center.request.MemberRequest;
import com.daycan.api.dto.center.response.centermanage.AdminMemberResponse;
import com.daycan.service.member.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/member")
@Tag(name = "\uD83D\uDC75 수급자 관리", description = "관리자용 수급자 관련 API")
@RequiredArgsConstructor
public class CenterMemberController {

  private final MemberService memberService;

  @GetMapping("")
  @Operation(summary = "수급자 목록 조회", description = "성별, 장기요양등급, 이름으로 필터링하여 수급자 목록을 조회합니다.")
  public ResponseWrapper<List<AdminMemberResponse>> getMemberList(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "성별 (MALE, FEMALE)", example = "MALE") @RequestParam(required = false) Gender gender,
      @Parameter(description = "장기요양등급 (1~5등급)", example = "3") @RequestParam(required = false) @Valid @Min(1) @Max(5) Integer careLevel,
      @Parameter(description = "수급자 이름 (부분 검색 가능)", example = "홍길동") @RequestParam(required = false) String name) {
    Center center = centerDetails.getCenter();

    List<AdminMemberResponse> memberList = memberService.getMemberList(
        center.getId(), gender, careLevel, name);

    return ResponseWrapper.onSuccess(memberList);
  }

  @GetMapping("/{memberId}")
  @Operation(summary = "수급자 상세 조회", description = "특정 수급자의 상세 정보를 조회합니다.")
  public ResponseWrapper<AdminMemberResponse> getMemberById(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "장기요양인정번호", example = "1L") @PathVariable Long memberId) {
    Center center = centerDetails.getCenter();

    AdminMemberResponse member = memberService.getMemberById(
        memberId,
        center.getId());
    return ResponseWrapper.onSuccess(member);
  }

  @PostMapping("")
  @Operation(summary = "수급자 등록", description = "새로운 수급자를 등록합니다.")
  public ResponseWrapper<AdminMemberResponse> createMember(
      @AuthenticatedUser CenterDetails centerDetails,
      @RequestBody @Valid MemberRequest memberRequest) {
    Center center = centerDetails.getCenter();

    AdminMemberResponse newMember = memberService.createMember(memberRequest,
        center.getId());
    return ResponseWrapper.onSuccess(newMember);
  }

  @PutMapping("/{memberId}")
  @Operation(summary = "수급자 정보 수정", description = "기존 수급자의 정보를 수정합니다.")
  public ResponseWrapper<AdminMemberResponse> updateMember(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "수급자 id", example = "1") @PathVariable Long memberId,
      @RequestBody @Valid MemberRequest memberRequest) {
    Center center = centerDetails.getCenter();

    AdminMemberResponse updatedMember = memberService.updateMember(memberId, memberRequest,
        center.getId());
    return ResponseWrapper.onSuccess(updatedMember);
  }

  @DeleteMapping("/{memberId}")
  @Operation(summary = "수급자 삭제", description = "특정 수급자를 삭제합니다.")
  public ResponseWrapper<Void> deleteMember(
      @AuthenticatedUser CenterDetails centerDetails,
      @Parameter(description = "장기요양인정번호", example = "1") @PathVariable Long memberId) {
    Center center = centerDetails.getCenter();

    memberService.deleteMember(memberId, center.getId());
    return ResponseWrapper.onSuccess(null);
  }

}
