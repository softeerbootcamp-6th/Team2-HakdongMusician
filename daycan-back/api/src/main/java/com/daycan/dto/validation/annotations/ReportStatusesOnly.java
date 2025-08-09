package com.daycan.dto.validation.annotations;

import com.daycan.dto.validation.validators.ReportStatusesOnlyValidator;
import jakarta.validation.Constraint;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD, ElementType.PARAMETER, ElementType.TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ReportStatusesOnlyValidator.class)
public @interface ReportStatusesOnly {
  String message() default "statuses must be REPORT_* only";
  Class<?>[] groups() default {};
  Class<? extends jakarta.validation.Payload>[] payload() default {};
}
