package com.daycan.service;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.PageResponse;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.Member;
import com.daycan.domain.enums.Gender;
import com.daycan.dto.admin.request.MemberRequest;
import com.daycan.dto.admin.response.AdminMemberResponse;
import com.daycan.repository.MemberRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

  private final MemberRepository memberRepository;

  /**
   * 센터별 회원 목록 조회 (필터링 지원)
   */
  public List<AdminMemberResponse> getMemberList(String organizationId, Gender gender,
      Integer careLevel, String name) {
    try {
      List<Member> members = memberRepository.findByOrganizationIdWithFilters(
          organizationId, gender, careLevel, name);

      return members.stream()
          .map(this::convertToAdminMemberResponse)
          .collect(Collectors.toList());

    } catch (Exception e) {
      log.error("회원 목록 조회 중 오류 발생: {}", e.getMessage());
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  /**
   * 센터별 회원 목록 조회 (필터링 지원, 페이징)
   */
  public PageResponse<List<AdminMemberResponse>> getMemberListWithPaging(String organizationId, Gender gender,
      Integer careLevel, String name, Pageable pageable) {
    try {
      Page<Member> memberPage = memberRepository.findByOrganizationIdWithFilters(
          organizationId, gender, careLevel, name, pageable);

      List<AdminMemberResponse> memberList = memberPage.getContent().stream()
          .map(this::convertToAdminMemberResponse)
          .collect(Collectors.toList());

      return new PageResponse<>(
          memberPage.getNumber(),
          memberList,
          (int) memberPage.getTotalElements(),
          memberPage.getTotalPages());

    } catch (Exception e) {
      log.error("회원 목록 조회(페이징) 중 오류 발생: {}", e.getMessage());
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  /**
   * 특정 회원 상세 조회
   */
  public AdminMemberResponse getMemberById(String username, String organizationId) {
    try {
      Member member = memberRepository.findByUsernameAndOrganizationIdAndDeletedAtIsNull(username,
          organizationId)
          .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));

      return convertToAdminMemberResponse(member);

    } catch (ApplicationException e) {
      throw e;
    } catch (Exception e) {
      log.error("회원 상세 조회 중 오류 발생: {}", e.getMessage());
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  /**
   * 새 회원 등록
   */
  @Transactional
  public AdminMemberResponse createMember(MemberRequest memberRequest, String organizationId) {
    try {
      // 장기요양인정번호 중복 체크
      if (memberRepository.existsByUsernameAndOrganizationIdAndDeletedAtIsNull(
          memberRequest.careNumber(), organizationId)) {
        throw new ApplicationException(CommonErrorStatus.CONSTRAINT_VIOLATION);
      }

      Member member = Member.builder()
          .username(memberRequest.careNumber())
          .name(memberRequest.name())
          .gender(memberRequest.gender())
          .birthDate(memberRequest.birthDate())
          .careLevel(memberRequest.careLevel())
          .avatarUrl(memberRequest.avatarUrl())
          .guardianName(memberRequest.guardianName())
          .guardianRelation(memberRequest.guardianRelation())
          .guardianRelationBirthDate(memberRequest.guardianBirthDate())
          .guardianPhoneNumber(memberRequest.guardianPhoneNumber())
          .guardianAvatarUrl(memberRequest.guardianAvatarUrl())
          .acceptReport(memberRequest.reportConsent())
          .organizationId(organizationId)
          .password(memberRequest.guardianPassword()) // 실제로는 암호화 필요
          .createdAt(LocalDateTime.now())
          .updatedAt(LocalDateTime.now())
          .build();

      Member savedMember = memberRepository.save(member);
      return convertToAdminMemberResponse(savedMember);

    } catch (ApplicationException e) {
      throw e;
    } catch (Exception e) {
      log.error("회원 등록 중 오류 발생: {}", e.getMessage());
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  /**
   * 회원 정보 수정
   */
  @Transactional
  public AdminMemberResponse updateMember(String username, MemberRequest memberRequest,
      String organizationId) {
    try {
      Member existingMember = memberRepository
          .findByUsernameAndOrganizationIdAndDeletedAtIsNull(username, organizationId)
          .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));

      // 엔티티 업데이트 (Setter 사용)
      existingMember.setName(memberRequest.name());
      existingMember.setGender(memberRequest.gender());
      existingMember.setBirthDate(memberRequest.birthDate());
      existingMember.setCareLevel(memberRequest.careLevel());
      existingMember.setAvatarUrl(memberRequest.avatarUrl());
      existingMember.setGuardianName(memberRequest.guardianName());
      existingMember.setGuardianRelation(memberRequest.guardianRelation());
      existingMember.setGuardianRelationBirthDate(memberRequest.guardianBirthDate());
      existingMember.setGuardianPhoneNumber(memberRequest.guardianPhoneNumber());
      existingMember.setGuardianAvatarUrl(memberRequest.guardianAvatarUrl());
      existingMember.setAcceptReport(memberRequest.reportConsent());
      // TODO 암호화 필요
      existingMember.setPassword(memberRequest.guardianPassword());
      existingMember.setUpdatedAt(LocalDateTime.now());

      Member updatedMember = memberRepository.save(existingMember);
      return convertToAdminMemberResponse(updatedMember);

    } catch (ApplicationException e) {
      throw e;
    } catch (Exception e) {
      log.error("회원 수정 중 오류 발생: {}", e.getMessage());
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  /**
   * 회원 삭제 (소프트 삭제)
   */
  @Transactional
  public void deleteMember(String username, String organizationId) {
    try {
      Member member = memberRepository.findByUsernameAndOrganizationIdAndDeletedAtIsNull(username,
          organizationId)
          .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));

      member.setDeletedAt(LocalDateTime.now());
      memberRepository.save(member);

    } catch (ApplicationException e) {
      throw e;
    } catch (Exception e) {
      log.error("회원 삭제 중 오류 발생: {}", e.getMessage());
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  /**
   * 센터별 회원 수 조회
   */
  public long getMemberCount(String organizationId) {
    return memberRepository.countByOrganizationIdAndDeletedAtIsNull(organizationId);
  }

  /**
   * Member 엔티티를 AdminMemberResponse로 변환
   */
  private AdminMemberResponse convertToAdminMemberResponse(Member member) {
    return new AdminMemberResponse(
        member.getUsername(),
        member.getName(),
        member.getGender(),
        member.getBirthDate(),
        member.getCareLevel(),
        member.getAvatarUrl(),
        member.getGuardianName(),
        member.getGuardianRelation(),
        member.getGuardianRelationBirthDate(),
        member.getGuardianPhoneNumber(),
        member.getGuardianAvatarUrl(),
        member.getAcceptReport(),
        member.getOrganizationId(),
        member.getCreatedAt(),
        member.getUpdatedAt());
  }
}