package com.daycan.application.admin.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "센터 정보 응답")
public record CenterResponse(
    @Schema(description = "센터명", example = "서울시립노인요양센터")
    String name,
    @Schema(description = "센터 위치", example = "서울특별시 중구 세종대로 110")
    String location,
    @Schema(description = "센터 전화번호", example = "02-1234-5678")
    String phoneNumber,
    @Schema(description = "센터 로고 경로", example = "")
    String logoUrl
) {

}
