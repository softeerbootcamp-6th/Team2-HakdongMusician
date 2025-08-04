package com.daycan.dto.admin.request;

import com.daycan.domain.enums.Gender;
import com.daycan.domain.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;

@Schema(description = "관리자 정보 요청")
public record AdminRequest(

    @Schema(description = "센터 ID (char(11))", example = "CTR00001234", required = true) String centerId,

    @Schema(description = "이름", example = "홍관리", required = true) String name,

    @Schema(description = "성별", example = "MALE", required = true) Gender gender,

    @Schema(description = "역할(권한)", example = "CENTER_ADMIN", required = true) Role role,

    @Schema(description = "생년월일", example = "1985-03-15", required = true) LocalDate birthDate,

    @Schema(description = "전화번호", example = "010-1234-5678", required = true) String phoneNumber,

    @Schema(description = "프로필 이미지 URL", example = "https://cdn.example.com/avatar/ADMIN_123.png") String avatarUrl,

    @Schema(description = "로그인 사용자명", example = "hongadmin", required = true) String username) {

}