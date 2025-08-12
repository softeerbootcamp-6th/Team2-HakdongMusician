package com.daycan.api.dto.center.response;

import com.daycan.domain.entry.document.sheet.SheetStatus;
import com.daycan.domain.entry.member.MemberMetaEntry;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "기록지 메타 정보 응답 DTO")
public record CareSheetMetaResponse(

    @Schema(description = "기록지 ID", example = "1001")
    Long careSheetId,

    @Schema(description = "기록지 상태", implementation = SheetStatus.class)
    SheetStatus status,

    @Schema(description = "수급자 메타 정보")
    MemberMetaEntry memberMeta,

    @Schema(description = "금일 출석 여부", example = "true")
    Boolean isAttending,

    @Schema(description = "작성자 이름 (미작성 시 null)", example = "양동성")
    String writerName,

    @Schema(description = "작성자 ID (미작성 시 null)", example = "501")
    Long writerId
) {}

