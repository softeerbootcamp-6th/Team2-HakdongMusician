package com.daycan.dto.admin.request;

import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.StaffRole;
import com.daycan.dto.validation.annotations.EnumCheck;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import java.time.LocalDate;

@Schema(description = "관리자 정보 요청"
    + "<br> Gender: MALE | FEMALE"
    + "<br> StaffRole: DIRECTOR | SOCIAL_WORKER | CAREGIVER")
public record AdminStaffRequest(
    @Schema(description = "이름", example = "홍관리", requiredMode = RequiredMode.REQUIRED)
    String name,

    @Schema(description = "성별", example = "MALE", requiredMode = RequiredMode.REQUIRED)
    @EnumCheck
    Gender gender,

    @Schema(description = "역할(권한)", example = "CENTER_ADMIN", requiredMode = RequiredMode.REQUIRED)
    @EnumCheck
    StaffRole staffRole,

    @Schema(description = "생년월일", example = "1985-03-15", requiredMode = RequiredMode.REQUIRED)
    LocalDate birthDate,

    @Schema(description = "전화번호", example = "010-1234-5678", requiredMode = RequiredMode.REQUIRED)
    String phoneNumber,

    @Schema(description = "프로필 이미지 URL", example = "https://cdn.example.com/progile/ADMIN_123.png")
    String avatarUrl

) {

}