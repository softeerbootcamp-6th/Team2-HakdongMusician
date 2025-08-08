package com.daycan.domain.helper;

import com.daycan.domain.enums.Gender;
import java.time.LocalDate;

public record MemberCommand(
    String name,
    Gender gender,
    LocalDate birthDate,
    Integer careLevel,
    String avatarUrl,
    String guardianName,
    String guardianRelation,
    LocalDate guardianBirthDate,
    String guardianPhoneNumber,
    String guardianAvatarUrl,
    Boolean acceptReport,
    String hashedPassword // 이미 해시된 것만!
) {

}