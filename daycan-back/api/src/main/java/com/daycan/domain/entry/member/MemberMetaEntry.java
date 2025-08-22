package com.daycan.domain.entry.member;

import com.daycan.api.dto.common.Url;
import com.daycan.domain.enums.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;

@Schema(description = "수급자 메타 정보 DTO")
public record MemberMetaEntry(

    @Schema(description = "수급자 ID", example = "1")
    Long memberId,

    @Schema(description = "장기요양인정번호", example = "RP123456")
    String careNumber,

    @Schema(description = "수급자 이름", example = "김순애")
    String name,

    @Schema(description = "생년월일", example = "1943-09-12")
    LocalDate birthDate,

    @Schema(description = "성별", example = "FEMALE")
    Gender gender,

    @Schema(description = "사진 URL", example = "https://example.com/photo.jpg")
    String avatarUrl
) {}
