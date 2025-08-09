package com.daycan.exceptions;

import com.daycan.common.response.status.DocumentErrorStatus;

public class DocumentNonCreatedException extends ApplicationException {

  public DocumentNonCreatedException() {
    super(DocumentErrorStatus.DOCUMENT_NOT_FOUND);
  }

}
