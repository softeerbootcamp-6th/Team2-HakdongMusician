package com.daycan.dto.admin.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "센터 정보 응답")
public record CenterResponse(
        @Schema(description = "센터명", example = "서울시립노인요양센터") String name,
        @Schema(description = "센터 장기요양기관 기호", example = "CEN12345") String centerCode,
        @Schema(description = "센터 전화번호", example = "02-1234-5678") String phoneNumber,
        @Schema(description = "센터 로고 경로", example = "") String logoUrl
) {

}
