package com.daycan.domain.model;

import com.daycan.api.dto.center.response.report.CareReportMetaResponse;
import com.daycan.api.dto.center.response.sheet.CareSheetMetaResponse;
import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.entity.document.Document;
import com.daycan.domain.entry.document.report.ReportStatus;
import com.daycan.domain.entry.document.sheet.SheetStatus;
import com.daycan.domain.entry.member.GuardianMetaEntry;
import com.daycan.domain.entry.member.MemberMetaEntry;
import com.daycan.domain.enums.DocumentStatus;
import io.micrometer.common.lang.Nullable;


public record DocumentMetaView(
    Document document,
    Member member,
    @Nullable Staff writer
) {
  public CareSheetMetaResponse toSheetResponse() {
    Long careSheetId = document.getCareSheet() != null
        ? document.getCareSheet().getId()
        : null;

    SheetStatus sheetStatus = SheetStatus.from(document.getStatus());

    boolean isAttending = document.getStatus() != DocumentStatus.NOT_APPLICABLE;

    MemberMetaEntry memberMeta = new MemberMetaEntry(
        member().getId(),
        member.getUsername(),
        member.getName(),
        member.getBirthDate(),
        member.getGender(),
        member.getAvatarUrl()
    );

    String writerName = writer != null ? writer.getName() : null;
    Long writerId     = writer != null ? writer.getId()   : null;

    return new CareSheetMetaResponse(
        careSheetId,
        sheetStatus,
        memberMeta,
        isAttending,
        writerName,
        writerId
    );
  }

  public CareReportMetaResponse toReportResponse() {
    MemberMetaEntry memberMeta = new MemberMetaEntry(
        member().getId(),
        member.getUsername(),
        member.getName(),
        member.getBirthDate(),
        member.getGender(),
        member.getAvatarUrl()
    );

    GuardianMetaEntry guardianMeta = hasText(member.getGuardianName()) || hasText(member.getGuardianPhoneNumber())
        ? new GuardianMetaEntry(member.getGuardianName(), member.getGuardianPhoneNumber())
        : null;

    ReportStatus status = document.getStatus().toReportStatus(document.getId());

    return new CareReportMetaResponse(
        document.getId(),
        memberMeta,
        guardianMeta,
        status
    );
  }

  private static boolean hasText(String s) {
    return s != null && !s.isBlank();
  }
}
