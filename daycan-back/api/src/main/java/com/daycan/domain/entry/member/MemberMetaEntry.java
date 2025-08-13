package com.daycan.domain.entry.member;

import com.daycan.domain.enums.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;

@Schema(description = "수급자 메타 정보 DTO")
public record MemberMetaEntry(

    @Schema(description = "수급자 ID(장기요양인증번호)", example = "MEM12345")
    String memberId,

    @Schema(description = "수급자 이름", example = "김순애")
    String name,

    @Schema(description = "생년월일", example = "1943-09-12")
    LocalDate birthDate,

    @Schema(description = "성별", example = "FEMALE")
    Gender gender
) {}
