package com.daycan.api.dto.center.response.image;

import com.daycan.domain.entry.member.MemberMetaEntry;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.Map;

public record OcrResponse(
    @Schema(
        description = "성공한 OCR 요청의 수",
        example = "12"
    )
    Long successCount,
    @Schema(
        description = "진행중인 OCR 요청의 수",
        example = "3"
    )
    Long continueCount,
    @Schema(
        description = "실패한 OCR 요청의 수",
        example = "4"
    )
    Long failCount,
    @Schema(
        description = "성공한 OCR 요청의 ID 목록",
        example = "["
            + "{1: } ]"
    )
    Map<Long, MemberMetaEntry> successIds
) {
}
