package com.daycan.common.exception;

import com.daycan.common.response.status.ErrorStatus;
import lombok.Getter;

@Getter
public class ApplicationException extends RuntimeException {
  private final ErrorStatus errorStatus;
  private final Object data;

  public ApplicationException(ErrorStatus errorStatus) {
    super(errorStatus.getMessage());
    this.errorStatus = errorStatus;
    this.data = null;
  }

  public ApplicationException(ErrorStatus errorStatus, Object data) {
    super(errorStatus.getMessage());
    this.errorStatus = errorStatus;
    this.data = data;
  }
}
