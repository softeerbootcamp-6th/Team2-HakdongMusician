package com.daycan.common.response;

import com.daycan.common.response.status.ErrorStatus;
import com.daycan.common.response.status.SuccessStatus;

public record ResponseWrapper<T>(
    int status,
    String message,
    T result
) {
  public static <T> ResponseWrapper<T> onSuccess(T result) {
    return new ResponseWrapper<>(
        SuccessStatus.OK.getHttpStatus().value(),
        SuccessStatus.OK.getMessage(),
        result
    );
  }

  public static <T> ResponseWrapper<T> onFailure(ErrorStatus errorStatus, T data) {
    return new ResponseWrapper<>(
        errorStatus.getHttpStatus().value(),
        errorStatus.getMessage(),
        data
    );
  }
}

