package com.daycan.external.storage;

import com.daycan.api.dto.center.response.image.PresignResponse;
import java.util.List;

public interface StorageService {

  PresignResponse presignSingle(String extension, String contentType);

  List<PresignResponse> presignOcrBatch(int count, String extension, String contentType);

  String presignGet(String objectRef);
}
