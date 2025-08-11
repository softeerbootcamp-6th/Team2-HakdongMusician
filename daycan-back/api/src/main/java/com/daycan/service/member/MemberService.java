package com.daycan.service.member;

import com.daycan.auth.security.PasswordHasher;
import com.daycan.common.response.status.MemberErrorStatus;
import com.daycan.domain.entity.Center;
import com.daycan.domain.entry.MemberCommand;
import com.daycan.api.dto.entry.member.PasswordEntry;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.PageResponse;
import com.daycan.common.response.status.CenterErrorStatus;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.Member;
import com.daycan.domain.enums.Gender;
import com.daycan.api.dto.center.request.MemberRequest;
import com.daycan.api.dto.center.response.AdminMemberResponse;
import com.daycan.repository.jpa.CenterRepository;
import com.daycan.repository.jpa.MemberRepository;
import jakarta.persistence.OptimisticLockException;
import java.util.List;
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
  private final CenterRepository centerRepository;

  /**
   * 센터별 회원 목록 조회 (필터링 지원)
   */
  public List<AdminMemberResponse> getMemberList(Long centerId,
      Gender gender,
      Integer careLevel,
      String name) {
    try {
      List<Member> members = memberRepository.findByCenterWithFilters(centerId, gender, careLevel, name);
      return members.stream()
          .map(this::convertToAdminMemberResponse)
          .toList();
    } catch (Exception e) {
      log.error("회원 목록 조회 중 오류 발생", e);
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  /**
   * 센터별 회원 목록 조회 (필터링 + 페이징)
   */
  public PageResponse<List<AdminMemberResponse>> getMemberListWithPaging(Long centerId,
      Gender gender,
      Integer careLevel,
      String name,
      Pageable pageable) {
    try {
      Page<Member> page = memberRepository.findPageByCenterWithFilters(centerId, gender, careLevel, name, pageable);
      List<AdminMemberResponse> list = page.getContent().stream()
          .map(this::convertToAdminMemberResponse)
          .toList();

      return new PageResponse<>(
          page.getNumber(),
          list,
          (int) page.getTotalElements(),
          page.getTotalPages()
      );
    } catch (Exception e) {
      log.error("회원 목록 조회(페이징) 중 오류 발생", e);
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  /**
   * 특정 회원 상세 조회 (센터 소속 확인)
   */
  public AdminMemberResponse getMemberById(String username, Long centerId) {
    try {
      Member member = memberRepository.findByUsername(username)
          .filter(m -> m.getCenter().getId().equals(centerId))
          .orElseThrow(() -> new ApplicationException(
              memberRepository.findByUsername(username).isEmpty()
                  ? CommonErrorStatus.NOT_FOUND
                  : CenterErrorStatus.MEMBER_NOT_ALLOWED
          ));
      return convertToAdminMemberResponse(member);
    } catch (ApplicationException e) {
      throw e;
    } catch (Exception e) {
      log.error("회원 상세 조회 중 오류 발생", e);
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  /**
   * 새 회원 등록
   */
  @Transactional
  public AdminMemberResponse createMember(MemberRequest req, Long centerId) {
    try {
      // username 전역 유니크 전제
      memberRepository.findByUsername(req.careNumber()).ifPresent(m -> {
        // (선택) 재활성화 정책: 필요 없다면 CONFLICT 던지기
        if (m.isActive()) {
          throw new ApplicationException(CommonErrorStatus.CONSTRAINT_VIOLATION, "이미 존재하는 회원");
        }
        // 재활성화 허용 시
        // m.reactivate(); // Account.reactivate() 사용(선택 사항)
        // m.changeCenter(requireCenter(centerId));
        // m.apply(buildMemberCommand(req, hashPasswordIfPresent(req.passwordEntry())));
        // throw new ApplicationException(CommonErrorStatus.CONFLICT, "재활성화 로직 미적용 상태");
      });

      String hashed = requireAndHashPassword(req.passwordEntry());
      Member member = Member.createNew(
          req.careNumber(),
          requireCenter(centerId),
          req.name(), req.gender(), req.birthDate(),
          hashed
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
  public AdminMemberResponse updateMember(String username, MemberRequest req, Long centerId) {
    try {
      Member member = getByUsernameAndCenter(username, centerId);
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
  public void deleteMember(String username, Long centerId) {
    try {
      Member member = getByUsernameAndCenter(username, centerId);
      member.deactivate(); // Account.deactivate()
      memberRepository.save(member);
    } catch (ApplicationException e) {
      throw e;
    } catch (Exception e) {
      log.error("회원 삭제 중 오류 발생", e);
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  /**
   * 센터별 회원 수 조회 (삭제 제외)
   */
  public long getMemberCount(Long centerId) {
    try {
      return memberRepository.countByCenterIdAndDeletedAtIsNull(centerId);
    } catch (Exception e) {
      log.error("회원 수 조회 중 오류 발생", e);
      throw new ApplicationException(CommonErrorStatus.INTERNAL_ERROR);
    }
  }

  // ───────────────────────── private helpers ─────────────────────────

  private Center requireCenter(Long centerId) {
    return centerRepository.findById(centerId)
        .orElseThrow(() -> new ApplicationException(CenterErrorStatus.NOT_FOUND));
  }

  private Member getByUsernameAndCenter(String username, Long centerId) {
    return memberRepository.findByUsername(username)
        .filter(m -> m.getCenter().getId().equals(centerId))
        .orElseThrow(() -> new ApplicationException(
            memberRepository.findByUsername(username).isEmpty()
                ? CommonErrorStatus.NOT_FOUND
                : CenterErrorStatus.MEMBER_NOT_ALLOWED
        ));
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
        throw new ApplicationException(MemberErrorStatus.MEMBER_INVALID_PARAM, "blank password not allowed");
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

  private AdminMemberResponse convertToAdminMemberResponse(Member m) {
    return AdminMemberResponse.builder()
        .username(m.getUsername())
        .name(m.getName())
        .gender(m.getGender())
        .birthDate(m.getBirthDate())
        .careLevel(m.getCareLevel())
        .avatarUrl(m.getAvatarUrl())
        .guardianName(m.getGuardianName())
        .guardianRelation(m.getGuardianRelation())
        .guardianBirthDate(m.getGuardianBirthDate())
        .guardianPhoneNumber(m.getGuardianPhoneNumber())
        .guardianAvatarUrl(m.getGuardianAvatarUrl())
        .acceptReport(m.getAcceptReport())
        .organizationId(String.valueOf(m.getCenter().getId()))
        .createdAt(m.getCreatedAt())
        .updatedAt(m.getUpdatedAt())
        .build();
  }

  private static boolean isBlank(String v) { return v == null || v.isBlank(); }
}
