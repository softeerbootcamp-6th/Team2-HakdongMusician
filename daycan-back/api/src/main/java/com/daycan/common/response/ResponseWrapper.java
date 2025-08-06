package com.daycan.common.response;

import com.daycan.common.response.status.Status;
import com.daycan.common.response.status.SuccessStatus;

public record ResponseWrapper<T>(
    int status,
    int code,
    String message,
    T result
) {
  public static <T> ResponseWrapper<T> onSuccess(T result) {
    return new ResponseWrapper<>(
        SuccessStatus.OK.getHttpStatus().value(),
        SuccessStatus.OK.getCode(),
        SuccessStatus.OK.getMessage(),
        result
    );
  }

  public static <T> ResponseWrapper<T> onFailure(Status status, T data) {
    return new ResponseWrapper<>(
        status.getHttpStatus().value(),
        status.getCode(),
        status.getMessage(),
        data
    );
  }
}

