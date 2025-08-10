package com.daycan.domain.enums;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum Gender {
  MALE,
  FEMALE,
  @JsonEnumDefaultValue UNKNOWN
}
