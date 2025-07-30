package com.daycan.common.response.status;

import org.springframework.http.HttpStatus;

// 인터페이스
public interface ErrorStatus {
  HttpStatus getHttpStatus();
  String getMessage();
}
