package com.daycan.common.exceptions.handler;

import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.ResponseWrapper;
import com.daycan.common.response.status.error.CommonErrorStatus;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleValidation(MethodArgumentNotValidException ex) {
    var errors = ex.getBindingResult().getFieldErrors().stream()
        .map(err -> err.getField() + ": " + err.getDefaultMessage())
        .toList();
    return buildErrorResponse(CommonErrorStatus.METHOD_ARGUMENT_NOT_VALID, errors);
  }

  @ExceptionHandler(MissingServletRequestParameterException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleMissingParam(
      MissingServletRequestParameterException ex
  ) {
    String msg = "필수 파라미터 누락: " + ex.getParameterName();
    return buildErrorResponse(CommonErrorStatus.METHOD_ARGUMENT_NOT_VALID, msg);
  }

  @ExceptionHandler(org.springframework.web.bind.MissingPathVariableException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleMissingPathVar(
      MissingPathVariableException ex
  ) {
    String msg = "경로 변수 누락: " + ex.getVariableName();
    return buildErrorResponse(CommonErrorStatus.METHOD_ARGUMENT_NOT_VALID, msg);
  }

  @ExceptionHandler(org.springframework.web.bind.MissingRequestHeaderException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleMissingHeader(
     MissingRequestHeaderException ex
  ) {
    String msg = "필수 헤더 누락: " + ex.getHeaderName();
    return buildErrorResponse(CommonErrorStatus.METHOD_ARGUMENT_NOT_VALID, msg);
  }


  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleNotReadable(org.springframework.http.converter.HttpMessageNotReadableException ex) {
    String msg = (ex.getMostSpecificCause() != null) ? ex.getMostSpecificCause().getMessage() : ex.getMessage();
    return buildErrorResponse(CommonErrorStatus.MALFORMED_JSON, msg);
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleTypeMismatch(org.springframework.web.method.annotation.MethodArgumentTypeMismatchException ex) {
    String msg = ex.getName() + " 타입 오류: " + ex.getValue();
    return buildErrorResponse(CommonErrorStatus.METHOD_ARGUMENT_NOT_VALID, msg);
  }

  @ExceptionHandler(BindException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleBind(org.springframework.validation.BindException ex) {
    var errors = ex.getBindingResult().getFieldErrors().stream()
        .map(err -> err.getField() + ": " + err.getDefaultMessage())
        .toList();
    return buildErrorResponse(CommonErrorStatus.METHOD_ARGUMENT_NOT_VALID, errors);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleConstraintViolation(ConstraintViolationException ex) {
    var errors = ex.getConstraintViolations().stream()
        .map(v -> v.getPropertyPath() + ": " + v.getMessage())
        .toList();
    return buildErrorResponse(CommonErrorStatus.CONSTRAINT_VIOLATION, errors);
  }

  @ExceptionHandler(NoHandlerFoundException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleNoHandler(org.springframework.web.servlet.NoHandlerFoundException ex) {
    return buildErrorResponse(CommonErrorStatus.NOT_FOUND, ex.getRequestURL());
  }

  @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleMethodNotSupported(org.springframework.web.HttpRequestMethodNotSupportedException ex) {
    return buildErrorResponse(CommonErrorStatus.METHOD_NOT_ALLOWED, ex.getMethod());
  }

  @ExceptionHandler(ApplicationException.class)
  public ResponseEntity<ResponseWrapper<Object>> handleApplication(ApplicationException ex) {
    return ResponseEntity.status(ex.getStatus().getHttpStatus())
        .body(ResponseWrapper.onFailure(ex.getStatus(), ex.getData()));
  }

  // 9) 마지막 안전망
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ResponseWrapper<Object>> handleException(Exception ex) {
    log.error("Unhandled exception: ", ex);
    return buildErrorResponse(CommonErrorStatus.INTERNAL_ERROR, null);
  }

  private ResponseEntity<ResponseWrapper<Object>> buildErrorResponse(CommonErrorStatus status, Object data) {
    return ResponseEntity.status(status.getHttpStatus()).body(ResponseWrapper.onFailure(status, data));
  }
}
