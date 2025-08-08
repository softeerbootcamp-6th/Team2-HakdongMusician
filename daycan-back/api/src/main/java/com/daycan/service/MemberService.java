package com.daycan.service;

import static org.apache.logging.log4j.util.Strings.isBlank;

import com.daycan.auth.security.PasswordHasher;
import com.daycan.common.response.status.MemberErrorStatus;
import com.daycan.domain.helper.MemberCommand;
import com.daycan.dto.entry.PasswordEntry;
import com.daycan.exceptions.ApplicationException;
import com.daycan.common.response.PageResponse;
import com.daycan.common.response.status.CenterErrorStatus;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.Member;
import com.daycan.domain.enums.Gender;
import com.daycan.dto.admin.request.MemberRequest;
import com.daycan.dto.admin.response.AdminMemberResponse;
import com.daycan.repository.MemberRepository;
import jakarta.persistence.OptimisticLockException;
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
public class MemberService {

  private final MemberRepository memberRepository;

  /**
   * 센터별 회원 목록 조회 (필터링 지원)
   */
  @Transactional(readOnly = true)
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
  public PageResponse<List<AdminMemberResponse>> getMemberListWithPaging(String organizationId,
      Gender gender,
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
      Member member = memberRepository.findByUsername(username)
          .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));
      // organizationId 체크

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
  public AdminMemberResponse createMember(MemberRequest req, String organizationId) {
    try {
      Member existing = memberRepository.findByUsername(req.careNumber()).orElse(null);
      if (existing != null) {
        return reactivateExistingMember(existing, req, organizationId);
      }

      String hashed = requireAndHashPassword(req.passwordEntry());
      Member member = Member.createNew(
          req.careNumber(), organizationId, req.name(),
          req.gender(), req.birthDate(), hashed
      );
      member.apply(buildMemberCommand(req, null));

      Member saved = memberRepository.save(member);
      return convertToAdminMemberResponse(saved);

    } catch (ApplicationException e) {
      throw e;
    } catch (OptimisticLockException e) {
      throw new ApplicationException(CommonErrorStatus.CONFLICT, "동시 수정 충돌");
    } catch (Exception e) {
      log.error("회원 등록 중 오류 발생", e);
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }


  /**
   * 회원 정보 수정
   */
  @Transactional
  public AdminMemberResponse updateMember(String username, MemberRequest req,
      String organizationId) {
    try {
      Member member = getMemberByUsernameAndOrganizationId(username, organizationId);
      String hashed = hashPasswordIfPresent(req.passwordEntry());
      member.apply(buildMemberCommand(req, hashed));

      Member updated = memberRepository.save(member);
      return convertToAdminMemberResponse(updated);

    } catch (ApplicationException e) {
      throw e;
    } catch (Exception e) {
      log.error("회원 수정 중 오류 발생", e);
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }


  /**
   * 회원 삭제 (소프트 삭제)
   */
  @Transactional
  public void deleteMember(String username, String organizationId) {
    try {
      Member member =
          getMemberByUsernameAndOrganizationId(username, organizationId);

      member.deactivate();
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
  @Transactional(readOnly = true)
  public long getMemberCount(String organizationId) {
    return memberRepository.countByOrganizationIdAndDeletedAtIsNull(organizationId);
  }

  private AdminMemberResponse reactivateExistingMember(Member existing, MemberRequest req, String organizationId) {
    assertReactivatable(existing, req);

    String hashed = hashPasswordIfPresent(req.passwordEntry());
    // 비번이 기존에도 없고 이번에도 안 왔으면 예외
    if (hashed == null && isBlank(existing.getPassword())) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_PASSWORD_NOT_FOUND, "재활성화 시 비밀번호가 필요합니다.");
    }

    existing.reactivateTo(organizationId);
    existing.apply(buildMemberCommand(req, hashed));
    return convertToAdminMemberResponse(existing);
  }

  /** 재활성화 사전 검증 */
  private void assertReactivatable(Member existing, MemberRequest req) {
    if (Boolean.TRUE.equals(existing.getActive())) {
      throw new ApplicationException(
          CommonErrorStatus.CONSTRAINT_VIOLATION,
          "이미 활성 회원(username=" + req.careNumber() + ")이 존재합니다."
      );
    }
  }


  private String requireAndHashPassword(PasswordEntry passwordEntry) {
    if (passwordEntry == null || isBlank(passwordEntry.guardianPassword())) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_PASSWORD_NOT_FOUND, "비밀번호가 필요합니다.");
    }
    return PasswordHasher.hash(passwordEntry.guardianPassword());
  }

  private String hashPasswordIfPresent(PasswordEntry passwordEntry) {
    if (passwordEntry != null) {
      String raw = passwordEntry.guardianPassword();
      if (isBlank(raw)) {
        throw new ApplicationException(MemberErrorStatus.MEMBER_INVALID_PARAM,
            "blank password not allowed");
      }
      return PasswordHasher.hash(raw);
    }
    return null;
  }

  private MemberCommand buildMemberCommand(MemberRequest req, String hashedPassword) {
    return new MemberCommand(
        req.name(), req.gender(), req.birthDate(), req.careLevel(),
        req.avatarUrl(), req.guardianName(), req.guardianRelation(),
        req.guardianBirthDate(), req.guardianPhoneNumber(), req.guardianAvatarUrl(),
        req.reportConsent(),
        hashedPassword
    );
  }

  private Member getMemberByUsernameAndOrganizationId(String username, String organizationId) {
    return memberRepository.findByUsername(username)
        .filter(m -> m.getOrganizationId().equals(organizationId))
        .orElseThrow(() -> new ApplicationException(
            memberRepository.findByUsername(username).isEmpty()
                ? CommonErrorStatus.NOT_FOUND
                : CenterErrorStatus.MEMBER_NOT_ALLOWED
        ));
  }

  /**
   * Member 엔티티를 AdminMemberResponse로 변환
   */
  private AdminMemberResponse convertToAdminMemberResponse(Member member) {
    return AdminMemberResponse.builder()
        .username(member.getUsername())
        .name(member.getName())
        .gender(member.getGender())
        .birthDate(member.getBirthDate())
        .careLevel(member.getCareLevel())
        .avatarUrl(member.getAvatarUrl())
        .guardianName(member.getGuardianName())
        .guardianRelation(member.getGuardianRelation())
        .guardianBirthDate(member.getGuardianBirthDate())
        .guardianPhoneNumber(member.getGuardianPhoneNumber())
        .guardianAvatarUrl(member.getGuardianAvatarUrl())
        .acceptReport(member.getAcceptReport())
        .organizationId(member.getOrganizationId())
        .createdAt(member.getCreatedAt())
        .updatedAt(member.getUpdatedAt())
        .build();
  }

}