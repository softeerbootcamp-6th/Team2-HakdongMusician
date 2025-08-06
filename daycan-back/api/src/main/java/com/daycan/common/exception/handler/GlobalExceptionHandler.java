package com.daycan.common.exception.handler;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.common.response.status.CommonErrorStatus;
import jakarta.validation.ConstraintViolationException;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  /**
   * 커스텀 ApplicationException 처리
   * 비즈니스 예외 처리 (대부분 4xx)
   */
  @ExceptionHandler(ApplicationException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleApplicationException(ApplicationException ex) {
    log.error("[ApplicationException] {} - {}", ex.getStatus(), ex.getMessage(), ex);

    return ResponseEntity
        .status(ex.getStatus().getHttpStatus())
        .body(ResponseWrapper.onFailure(ex.getStatus(), ex.getData()));
  }

  /**
   * @Validated 검증 실패 (ex. @RequestParam, @PathVariable)
   * ConstraintViolationException은 메서드 레벨 검증 실패 시 발생합니다.
   * 모든 제약조건(@Min, @Max, @Pattern, 커스텀 @Constraint 등)을 이곳에서 처리합니다.
   */
  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleConstraintViolationException(
      ConstraintViolationException ex
  ) {
    List<String> errors = ex.getConstraintViolations().stream()
        .map(v -> v.getPropertyPath() + ": " + v.getMessage())
        .toList();

    log.warn("[ConstraintViolationException] {}", errors);
    return buildErrorResponse(CommonErrorStatus.CONSTRAINT_VIOLATION, errors);
  }

  /**
   * @Valid 검증 실패 (ex. @RequestBody)
   * DTO 필드 검증 중 실패했을 때 발생합니다.
   * javax.validation 기본 어노테이션(@NotNull, @Size 등)뿐 아니라,
   * 커스텀 validation 어노테이션(@MyCustomConstraint 등)도 포함됩니다.
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleValidationException(
      MethodArgumentNotValidException ex
  ) {
    List<String> errors = ex.getBindingResult().getFieldErrors().stream()
        .map(err -> err.getField() + ": " + err.getDefaultMessage())
        .toList();

    log.warn("[MethodArgumentNotValidException] {}", errors);
    return buildErrorResponse(CommonErrorStatus.METHOD_ARGUMENT_NOT_VALID, errors);
  }

  /**
   * 그 외 처리하지 못한 예외 (서버 내부 오류)
   */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ResponseWrapper<Object>> handleException(Exception ex) {
    log.error("[UnhandledException] {}", ex.getMessage(), ex);
    return buildErrorResponse(CommonErrorStatus.INTERNAL_ERROR, null);
  }

  /**
   * 에러 상태에 맞춰 ResponseEntity<ApiResponse>를 생성합니다.
   */
  private ResponseEntity<ResponseWrapper<Object>> buildErrorResponse(
      CommonErrorStatus status,
      Object data
  ) {
    return ResponseEntity
        .status(status.getHttpStatus())
        .body(ResponseWrapper.onFailure(status, data));
  }
}
