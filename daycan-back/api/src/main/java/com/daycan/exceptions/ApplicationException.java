package com.daycan.exceptions;

import com.daycan.common.response.status.Status;
import lombok.Getter;

@Getter
public class ApplicationException extends RuntimeException {
  private final Status status;
  private final Object data;

  public ApplicationException(Status status) {
    super(status.getMessage());
    this.status = status;
    this.data = null;
  }

  public ApplicationException(Status status, Object data) {
    super(status.getMessage());
    this.status = status;
    this.data = data;
  }
}
