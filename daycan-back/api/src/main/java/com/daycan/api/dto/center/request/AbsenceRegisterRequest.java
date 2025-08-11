package com.daycan.api.dto.center.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Schema(description = "결석 처리 요청 DTO")
public record AbsenceRegisterRequest(

    @NotEmpty
    @Schema(
        description = "결석 처리할 수급자 ID 목록",
        example = "[\"MEM12345\", \"MEM67890\"]"
    )
    List<String> memberIds
) {}
