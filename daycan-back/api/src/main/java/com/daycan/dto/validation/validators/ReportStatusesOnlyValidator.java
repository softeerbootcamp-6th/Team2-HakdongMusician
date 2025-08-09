package com.daycan.dto.validation.validators;

import com.daycan.domain.enums.DocumentStatus;
import com.daycan.dto.validation.annotations.ReportStatusesOnly;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.List;

public class ReportStatusesOnlyValidator implements
    ConstraintValidator<ReportStatusesOnly, List<DocumentStatus>> {
  @Override
  public boolean isValid(List<DocumentStatus> value, ConstraintValidatorContext ctx) {
    if (value == null) return true; // null 허용이면 true, 비허용이면 false
    return value.stream().allMatch(s -> s.name().startsWith("REPORT_"));
  }
}

