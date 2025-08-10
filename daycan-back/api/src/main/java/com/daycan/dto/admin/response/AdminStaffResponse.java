package com.daycan.dto.admin.response;


import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.StaffRole;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;

@Schema(description = "관리자 정보 응답")
public record AdminStaffResponse(

    @Schema(description = "관리자 ID (PK)", example = "123")
    Long staffId,

    @Schema(description = "센터 ID Long", example = "1")
    Long centerId,

    @Schema(description = "이름", example = "홍관리")
    String name,

    @Schema(description = "성별", example = "MALE")
    Gender gender,

    @Schema(description = "역할(권한)", example = "CENTER_ADMIN")
    StaffRole staffRole,

    @Schema(description = "생년월일", example = "1985-03-15")
    LocalDate birthDate,

    @Schema(description = "전화번호", example = "010-1234-5678")
    String phoneNumber,

    @Schema(description = "프로필 이미지 URL", example = "https://cdn.example.com/avatar/ADMIN_123.png")
    String avatarUrl

) {

}