package com.daycan.domain.enums;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;

public enum StaffRole {
  DIRECTOR("센터장", "ROLE_DIRECTOR"),
  SOCIAL_WORKER("사회복지사", "ROLE_SOCIAL_WORKER"),
  CAREGIVER("요양보호사", "ROLE_CAREGIVER"),

  @JsonEnumDefaultValue UNKNOWN("", ""),
  ;

  private final String kor;        // 한글 표시용
  private final String authority;  // Spring Security 권한명 등

  StaffRole(String kor, String authority) {
    this.kor = kor;
    this.authority = authority;
  }

  /**
   * 역직렬화: 코드(DIRECTOR) 또는 한글(센터장) 모두 허용
   */
  @JsonCreator
  public static StaffRole from(Object value) {
    if (value == null) {
      return null;
    }
    String s = value.toString().trim();
    return Arrays.stream(values())
        .filter(r -> r.name().equalsIgnoreCase(s) || r.kor.equals(s))
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("Unknown AdminRole: " + value));
  }

  /**
   * 한글 라벨
   */
  public String kor() {
    return kor;
  }

  /**
   * 권한 문자열 (예: Spring Security)
   */
  public String authority() {
    return authority;
  }

  /**
   * JSON 직렬화 시 기본 값 (DIRECTOR / SOCIAL_WORKER / CAREGIVER)
   */
  @JsonValue
  public String code() {
    return name();
  }
}