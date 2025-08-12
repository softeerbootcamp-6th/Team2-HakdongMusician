package com.daycan.api.dto.center.request;

import com.daycan.domain.enums.Gender;
import com.daycan.domain.entry.member.PasswordEntry;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

@Schema(description = "수급자 post/patch 요청")
public record MemberRequest(

    @Schema(description = "수급자명", example = "김노인")
    @NotBlank
    String name,

    @Schema(description = "성별", example = "MALE")
    @NotNull
    Gender gender,

    @Schema(description = "생년월일", example = "1930-10-20")
    @NotNull @Past
    LocalDate birthDate,

    @Schema(description = "장기요양 등급", example = "5")
    @Min(1) @Max(6)
    Integer careLevel,

    @Schema(description = "장기요양 인정번호", example = "AA123456754")
    @Size(max = 30)
    String careNumber,

    @Schema(description = "수급자 아바타 이미지 URL", example = "https://cdn.example.com/avatar/USR123.png")
    @Size(max = 500)
    String avatarUrl,

    @Schema(description = "보호자 이름", example = "김학동")
    @Size(max = 50)
    String guardianName,

    @Schema(description = "수급자와의 관계", example = "자녀")
    @Size(max = 30)
    String guardianRelation,

    @Schema(description = "보호자 생년월일", example = "2000-01-01")
    @Past
    LocalDate guardianBirthDate,

    @Schema(description = "보호자 전화번호", example = "010-0101-0101")
    @Size(max = 20)
    String guardianPhoneNumber,

    @Schema(description = "보호자 아바타 이미지 URL", example = "https://cdn.example.com/avatar/GUARD123.png")
    @Size(max = 500)
    String guardianAvatarUrl,

    @Schema(description = "리포트 수신 동의 여부", example = "true")
    @NotNull
    Boolean reportConsent,

    @Schema(description = "보호자 비밀번호(설정/변경 시에만 전송)")
    PasswordEntry passwordEntry

) {
}