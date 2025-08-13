package com.daycan.domain.model;

import com.daycan.api.dto.center.response.sheet.CareSheetMetaResponse;
import com.daycan.domain.entity.Member;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.entity.document.Document;
import com.daycan.domain.entry.document.sheet.SheetStatus;
import com.daycan.domain.entry.member.MemberMetaEntry;
import com.daycan.domain.enums.DocumentStatus;
import io.micrometer.common.lang.Nullable;


public record CareSheetMetaView(
    Document document,
    Member member,
    @Nullable Staff writer
) {
  public CareSheetMetaResponse toResponse() {
    // careSheetId: 존재하면 id, 없으면 null
    Long careSheetId = document.getCareSheet() != null
        ? document.getCareSheet().getId()
        : null;

    // SheetStatus: DocumentStatus → SheetStatus
    SheetStatus sheetStatus = SheetStatus.from(document.getStatus());

    // isAttending: NOT_APPLICABLE 이면 false, 나머지는 true
    boolean isAttending = document.getStatus() != DocumentStatus.NOT_APPLICABLE;

    // member 메타 (필드명은 너 엔티티에 맞춰)
    MemberMetaEntry memberMeta = new MemberMetaEntry(
        member.getUsername(),   // 예: 장기요양인정번호(문자열). 필드명이 다르면 수정
        member.getName(),
        member.getBirthDate(),
        member.getGender()
    );

    // writer는 없을 수 있음
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
}
