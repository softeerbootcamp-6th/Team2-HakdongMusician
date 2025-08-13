package com.daycan.api.dto.validation.annotations;

import com.daycan.api.dto.validation.validators.EnumValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = EnumValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface EnumCheck {

  String message() default "허용되지 않은 값입니다.";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

  String[] anyOf() default {};   // 비어있으면 '모든 값 허용'으로 간주

  String[] except() default {};  // 블랙리스트 (예: {"UNKNOWN"})

  boolean forbidDefault() default true; // @JsonEnumDefaultValue 붙은 값 차단
}