package com.daycan.domain.entry.member;

import io.swagger.v3.oas.annotations.media.Schema;

public record GuardianMetaEntry(

    @Schema(description = "보호자 이름", example = "김영희")
    String guardianName,

    @Schema(description = "보호자 연락처", example = "010-1234-5678")
    String guardianContact
) {

}
