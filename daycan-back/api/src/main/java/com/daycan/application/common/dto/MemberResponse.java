package com.daycan.application.common.dto;

import com.daycan.domain.enums.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;

@Schema(description = "수급자 정보 응답")
public record MemberResponse(

    @Schema(description = "수급자명", example = "홍노인")
    String name,

    @Schema(description = "성별", example = "MALE")
    Gender gender,

    @Schema(description = "생년월일", example = "1950-05-12")
    LocalDate birthDate,

    @Schema(description = "장기요양 등급", example = "5")
    Integer careLevel,

    @Schema(description = "아바타 이미지 URL", example = "https://cdn.example.com/avatar/USR123.png")
    String avatarUrl,

    @Schema(description = "장기요양 인정번호", example = "AA1234567")
    String careNumber,

    @Schema(description = "보호자 이름", example = "이보호자")
    String guardianName,

    @Schema(description = "보호자 관계", example = "딸")
    String guardianRelation,

    @Schema(description = "보호자 생년월일", example = "1978-10-02")
    LocalDate guardianRelationBirthDate,

    @Schema(description = "보호자 전화번호", example = "010-1234-5678")
    String guardianPhoneNumber,

    @Schema(description = "보호자 아바타 이미지 url", example = "https://cdn.example.com/avatar/GUARD123.png")
    String guardianAvatarUrl,

    @Schema(description = "SMS 수신 동의 여부", example = "true")
    Boolean isSubscribed

) {

}