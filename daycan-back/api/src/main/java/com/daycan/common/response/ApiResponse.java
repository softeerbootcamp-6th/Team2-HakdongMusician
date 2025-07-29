package com.daycan.common.response;

import com.daycan.common.response.status.ErrorStatus;
import com.daycan.common.response.status.SuccessStatus;

public record ApiResponse<T>(
    int status,
    String message,
    T result
) {
  public static final ApiResponse<Void> OK = new ApiResponse<>(
      SuccessStatus.OK.getHttpStatus().value(),
      SuccessStatus.OK.getMessage(),
      null
  );

  public static <T> ApiResponse<T> onSuccess(T result) {
    return new ApiResponse<>(
        SuccessStatus.OK.getHttpStatus().value(),
        SuccessStatus.OK.getMessage(),
        result
    );
  }

  public static <T> ApiResponse<T> onFailure(ErrorStatus errorStatus, T data) {
    return new ApiResponse<>(
        errorStatus.getHttpStatus().value(),
        errorStatus.getMessage(),
        data
    );
  }
}

