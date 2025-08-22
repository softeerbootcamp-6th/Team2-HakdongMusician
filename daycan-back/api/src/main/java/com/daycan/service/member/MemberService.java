package com.daycan.service.member;

import com.daycan.auth.security.PasswordHasher;
import com.daycan.common.response.status.error.MemberErrorStatus;
import com.daycan.domain.entity.Center;
import com.daycan.domain.entry.member.MemberCommand;
import com.daycan.domain.entry.member.PasswordEntry;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.CenterErrorStatus;
import com.daycan.common.response.status.error.CommonErrorStatus;
import com.daycan.domain.entity.Member;
import com.daycan.domain.enums.Gender;
import com.daycan.api.dto.center.request.MemberRequest;
import com.daycan.api.dto.center.response.centermanage.AdminMemberResponse;
import com.daycan.external.storage.StorageService;
import com.daycan.repository.jpa.CenterRepository;
import com.daycan.repository.jpa.MemberRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

  private final MemberRepository memberRepository;
  private final CenterRepository centerRepository;
  private final StorageService storageService;

  @Transactional(readOnly = true)
  public List<AdminMemberResponse> getMemberList(
      Long centerId,
      Gender gender,
      Integer careLevel,
      String name
  ) {
    List<Member> memberList = memberRepository.findPageByCenterWithFilters(
        centerId,
        gender,
        careLevel,
        name);

    return memberList.stream()
        .map(this::convertToAdminMemberResponse)
        .toList();
  }

  @Transactional(readOnly = true)
  public AdminMemberResponse getMemberById(Long memberId, Long centerId) {
    Member member = requireActiveMember(memberId, centerId);
    return convertToAdminMemberResponse(member);
  }

  @Transactional
  public AdminMemberResponse createMember(MemberRequest req, Long centerId) {
    Center center = requireCenter(centerId);

    Optional<Member> existing = memberRepository.findByUsername(req.careNumber());
    if (existing.isPresent()) {
      Member m = existing.get();
      if (m.isActive()) {
        throw new ApplicationException(MemberErrorStatus.MEMBER_ALREADY_EXISTS);
      }
      String hashed = requireAndHashPassword(req.passwordEntry());
      m.reactivate();
      m.changeCenter(center);
      m.apply(buildMemberCommand(req, hashed));
      return convertToAdminMemberResponse(m);
    }

    String hashed = requireAndHashPassword(req.passwordEntry());
    Member member = Member.createNew(
        req.careNumber(),
        center,
        req.name(), req.gender(), req.birthDate(),
        hashed
    );
    member.apply(buildMemberCommand(req, null));

    Member saved = memberRepository.save(member);
    return convertToAdminMemberResponse(saved);
  }

  @Transactional
  public AdminMemberResponse updateMember(Long memberId, MemberRequest req, Long centerId) {
    Member member = requireActiveMember(memberId, centerId);
    String hashed = hashPasswordIfPresent(req.passwordEntry());
    member.apply(buildMemberCommand(req, hashed));
    return convertToAdminMemberResponse(member);
  }

  @Transactional
  public void deleteMember(Long memberId, Long centerId) {
    Member member = requireActiveMember(memberId, centerId);
    member.deactivate();
  }


  public Member requireActiveMember(Long memberId) {
    Member m = memberRepository.findById(memberId)
        .orElseThrow(() -> new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND, memberId));
    return requireActiveMember(m);
  }

  public Member requireActiveMember(Member m) {
    if (m == null) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND);
    }
    if (!m.isActive()) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND,
          "비활성 회원+" + m.getId());
    }
    return m;
  }

  public void validateCenterMember(Member member, Long centerId) {
    if (!member.getCenter().getId().equals(centerId)) {
      throw new ApplicationException(CenterErrorStatus.MEMBER_NOT_ALLOWED);
    }
  }

  public Member requireActiveMember(Long memberId, Long centerId){
    Member m = getByMemberIdAndCenter(memberId, centerId)
        .orElseThrow(() -> new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND));
    validateCenterMember(m, centerId);
    return requireActiveMember(m);
  }

  public Optional<Member> getByMemberIdAndCenter(Long memberId, Long centerId) {
    Member m = memberRepository.findById(memberId)
        .orElseThrow(() -> new ApplicationException(MemberErrorStatus.MEMBER_NOT_FOUND));
    validateCenterMember(m, centerId);
    Member member;
    try {
      member = requireActiveMember(m);
    } catch (ApplicationException e) {
      return Optional.empty();
    }
    return Optional.of(member);
  }



  private Center requireCenter(Long centerId) {
    return centerRepository.findById(centerId)
        .orElseThrow(() -> new ApplicationException(CenterErrorStatus.NOT_FOUND));
  }

  private String requireAndHashPassword(PasswordEntry passwordEntry) {
    if (passwordEntry == null || isBlank(passwordEntry.guardianPassword())) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_PASSWORD_NOT_FOUND, "비밀번호가 필요합니다.");
    }
    return PasswordHasher.hash(passwordEntry.guardianPassword());
  }

  private String hashPasswordIfPresent(PasswordEntry passwordEntry) {
    if (passwordEntry == null) {
      return null;
    }
    String raw = passwordEntry.guardianPassword();
    if (isBlank(raw)) {
      throw new ApplicationException(MemberErrorStatus.MEMBER_INVALID_PARAM,
          "blank password not allowed");
    }
    return PasswordHasher.hash(raw);
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
        .id(m.getId())
        .careNumber(m.getUsername())
        .name(m.getName())
        .gender(m.getGender())
        .birthDate(m.getBirthDate())
        .careLevel(m.getCareLevel())
        .avatarUrl(presignAvatarUrl(m.getAvatarUrl()))
        .guardianName(m.getGuardianName())
        .guardianRelation(m.getGuardianRelation())
        .guardianBirthDate(m.getGuardianBirthDate())
        .guardianPhoneNumber(m.getGuardianPhoneNumber())
        .guardianAvatarUrl(presignAvatarUrl(m.getGuardianAvatarUrl()))
        .acceptReport(m.getAcceptReport())
        .organizationId(String.valueOf(m.getCenter().getId()))
        .createdAt(m.getCreatedAt())
        .updatedAt(m.getUpdatedAt())
        .build();
  }

  private String presignAvatarUrl(String avatarUrl) {
    if (isBlank(avatarUrl)) {
      return null;
    }
    return storageService.presignGet(avatarUrl);
  }

  private static boolean isBlank(String v) {
    return v == null || v.isBlank();
  }
}