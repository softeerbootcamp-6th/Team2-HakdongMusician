package com.daycan.common.response.status;

import org.springframework.http.HttpStatus;

// 인터페이스
public interface Status {
  HttpStatus getHttpStatus();
  int getCode();
  String getMessage();
}
