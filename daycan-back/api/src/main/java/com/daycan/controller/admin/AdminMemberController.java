package com.daycan.controller.admin;

import com.daycan.common.annotations.CenterPrinciple;
import com.daycan.common.response.PageResponse;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.domain.entity.Center;
import com.daycan.domain.enums.Gender;
import com.daycan.dto.admin.request.MemberRequest;
import com.daycan.dto.admin.response.AdminMemberResponse;
import com.daycan.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springdoc.core.annotations.ParameterObject;

@RestController()
@RequestMapping("/admin/member")
@Tag(name = "👵🏻 수급자 관리", description = "관리자용 수급자 관련 API")
@RequiredArgsConstructor
public class AdminMemberController {

  private final MemberService memberService;

  @GetMapping("")
  @Operation(summary = "수급자 목록 조회", description = "성별, 장기요양등급, 이름으로 필터링하여 수급자 목록을 조회합니다.")
  public ResponseWrapper<PageResponse<List<AdminMemberResponse>>> getMemberList(
      @CenterPrinciple Center center,
      @Parameter(description = "성별 (MALE, FEMALE)", example = "MALE") @RequestParam(required = false) Gender gender,
      @Parameter(description = "장기요양등급 (1~5등급)", example = "3") @RequestParam(required = false) @Valid @Min(1) @Max(5) Integer careLevel,
      @Parameter(description = "수급자 이름 (부분 검색 가능)", example = "홍길동") @RequestParam(required = false) String name,
      @ParameterObject Pageable pageable) {

    PageResponse<List<AdminMemberResponse>> memberList = memberService.getMemberListWithPaging(
        center.getOrganizationId(), gender, careLevel, name, pageable);

    return ResponseWrapper.onSuccess(memberList);
  }

  @GetMapping("/{username}")
  @Operation(summary = "수급자 상세 조회", description = "특정 수급자의 상세 정보를 조회합니다.")
  public ResponseWrapper<AdminMemberResponse> getMemberById(
      @CenterPrinciple Center center,
      @Parameter(description = "장기요양인정번호", example = "AA1234567") @PathVariable String username) {
    AdminMemberResponse member = memberService.getMemberById(
        username,
        center.getOrganizationId());
    return ResponseWrapper.onSuccess(member);
  }

  @PostMapping("")
  @Operation(summary = "수급자 등록", description = "새로운 수급자를 등록합니다.")
  public ResponseWrapper<AdminMemberResponse> createMember(
      @CenterPrinciple Center center,
      @RequestBody @Valid MemberRequest memberRequest) {
    AdminMemberResponse newMember = memberService.createMember(memberRequest,
        center.getOrganizationId());
    return ResponseWrapper.onSuccess(newMember);
  }

  @PutMapping("/{username}")
  @Operation(summary = "수급자 정보 수정", description = "기존 수급자의 정보를 수정합니다.")
  public ResponseWrapper<AdminMemberResponse> updateMember(
      @CenterPrinciple Center center,
      @Parameter(description = "장기요양인정번호", example = "AA1234567") @PathVariable String username,
      @RequestBody @Valid MemberRequest memberRequest) {
    AdminMemberResponse updatedMember = memberService.updateMember(username, memberRequest,
        center.getOrganizationId());
    return ResponseWrapper.onSuccess(updatedMember);
  }

  @DeleteMapping("/{username}")
  @Operation(summary = "수급자 삭제", description = "특정 수급자를 삭제합니다.")
  public ResponseWrapper<Void> deleteMember(
      @CenterPrinciple Center center,
      @Parameter(description = "장기요양인정번호", example = "AA1234567") @PathVariable String username) {
    memberService.deleteMember(username, center.getOrganizationId());
    return ResponseWrapper.onSuccess(null);
  }

  @PostMapping(value = "/excel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @Operation(summary = "엑셀로 수급자 일괄 등록", description = "엑셀 파일(.xlsx, .xls)을 업로드하여 수급자를 일괄 등록합니다.")
  public ResponseWrapper<List<AdminMemberResponse>> createMemberFromExcel(
      @CenterPrinciple Center center,
      @Parameter(description = "엑셀 파일 (.xlsx, .xls)", required = true) @RequestParam("file") MultipartFile file) {
    // TODO: 엑셀 파일 파싱 및 일괄 등록 로직 구현 필요
    List<AdminMemberResponse> memberList = memberService.getMemberList(center.getOrganizationId(),
        null, null, null);
    return ResponseWrapper.onSuccess(memberList);
  }

}
