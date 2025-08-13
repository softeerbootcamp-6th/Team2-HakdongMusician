package com.daycan.api.dto.validation.validators;

import com.daycan.api.dto.validation.annotations.EnumCheck;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.HashSet;
import java.util.Set;

public class EnumValidator implements ConstraintValidator<EnumCheck, Enum<?>> {
  private Set<String> anyOf;
  private Set<String> except;
  private boolean forbidDefault;

  @Override
  public void initialize(EnumCheck ann) {
    this.anyOf = Set.of(ann.anyOf());
    this.except = Set.of(ann.except());
    this.forbidDefault = ann.forbidDefault();
  }

  @Override
  public boolean isValid(Enum<?> value, ConstraintValidatorContext ctx) {
    if (value == null) return true; // null은 @NotNull이 담당
    Class<? extends Enum<?>> type = value.getDeclaringClass();

    // 허용 집합 계산
    Set<String> allowed = new HashSet<>();
    if (anyOf.isEmpty()) {
      for (Object e : type.getEnumConstants()) {
        allowed.add(((Enum<?>) e).name());
      }
      if (forbidDefault) {
        for (Object e : type.getEnumConstants()) {
          try {
            var f = type.getField(((Enum<?>) e).name());
            if (f.isAnnotationPresent(com.fasterxml.jackson.annotation.JsonEnumDefaultValue.class)) {
              allowed.remove(((Enum<?>) e).name());
            }
          } catch (NoSuchFieldException ignore) {}
        }
      }
      allowed.removeAll(except);
    } else {
      allowed.addAll(anyOf);
    }

    return allowed.contains(value.name());
  }
}
