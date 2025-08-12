package com.daycan.external;

import com.daycan.common.response.status.error.CommonErrorStatus;
import com.daycan.api.dto.center.response.image.PresignResponse;
import com.daycan.common.exceptions.ApplicationException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;



@Service
@RequiredArgsConstructor
public class S3Service {

  private final S3Presigner presigner;

  @Value("${app.s3.bucket}")
  private String bucket;

  private static final Set<String> ALLOWED_IMAGE_TYPES = Set.of("image/jpeg", "image/png", "image/jpg");

  /** 한 장 presign (프로필 원본 등) */
  public PresignResponse presignSingle(String extension, String contentType) {
    validateImageContentType(contentType);
    String key = "profiles/%s/origin.%s".formatted(UUID.randomUUID(),extension);
    return presignPut(key, contentType);
  }

  /** OCR 다건 presign */
  public List<PresignResponse> presignOcrBatch(int count, String extension, String contentType) {
    validateImageContentType(contentType);
    String datePath = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE); // yyyyMMdd

    List<PresignResponse> list = new ArrayList<>(count);
    for (int i = 0; i < count; i++) {
      String key = "ocr/%s/%s.%s".formatted(datePath, UUID.randomUUID(), extension);
      list.add(presignPut(key, contentType));
    }
    return list;
  }

  /* ===== 내부 유틸 ===== */
  private PresignResponse presignPut(String key, String contentType) {
    PutObjectRequest put = PutObjectRequest.builder()
        .bucket(bucket).key(key).contentType(contentType)
        .cacheControl(null)
        .build();

    PutObjectPresignRequest preq = PutObjectPresignRequest.builder()
        .putObjectRequest(put)
        .signatureDuration(Duration.ofMinutes(10))
        .build();

    PresignedPutObjectRequest p = presigner.presignPutObject(preq);
    return new PresignResponse(key, p.url().toString(), p.signedHeaders());
  }


  private void validateImageContentType(String contentType) {
    if (!ALLOWED_IMAGE_TYPES.contains(contentType)) {
      throw new ApplicationException(CommonErrorStatus.INVALID_FILE_FORMAT);
    }
  }

}

