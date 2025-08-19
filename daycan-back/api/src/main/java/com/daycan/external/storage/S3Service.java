package com.daycan.external.storage;

import com.daycan.common.response.status.error.CommonErrorStatus;
import com.daycan.api.dto.center.response.image.PresignResponse;
import com.daycan.common.exceptions.ApplicationException;
import java.net.URI;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;



@Service
@RequiredArgsConstructor
public class S3Service implements StorageService{

  private final S3Presigner presigner;

  @Value("${app.s3.bucket}")
  private String bucket;

  private static final Set<String> ALLOWED_IMAGE_TYPES = Set.of("image/jpeg", "image/png", "image/jpg");

  public PresignResponse presignSingle(String extension, String contentType) {
    validateImageContentType(contentType);
    String key = "profiles/%s/origin.%s".formatted(UUID.randomUUID(),extension);
    return presignPut(key, contentType);
  }

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

  public String presignGet(String objectRef) {
    if (objectRef == null || objectRef.isBlank()) {
        return null;
    }
    String key = toKey(objectRef);

    GetObjectRequest get = GetObjectRequest.builder()
        .bucket(bucket)
        .key(key)
        .build();

    GetObjectPresignRequest preq = GetObjectPresignRequest.builder()
        .getObjectRequest(get)
        .signatureDuration(Duration.ofMinutes(10))
        .build();

    PresignedGetObjectRequest p = presigner.presignGetObject(preq);
    return  p.url().toString();
  }


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

  private String toKey(String ref) {
    if (ref.startsWith("s3://")) {
      String after = ref.substring("s3://".length());
      int slash = after.indexOf('/');
      if (slash < 0) throw new ApplicationException(CommonErrorStatus.INVALID_URL);
      String b = after.substring(0, slash);
      String k = after.substring(slash + 1);
      if (!b.equals(bucket)) {
        throw new ApplicationException(CommonErrorStatus.INVALID_URL);
      }
      return decode(stripLeadingSlash(k));
    }

    try {
      URI u = URI.create(ref);
      if (u.getScheme() == null) {

        return decode(stripLeadingSlash(ref));
      }
      String host = u.getHost();
      String path = u.getPath() == null ? "" : u.getPath();
      String cleanPath = stripLeadingSlash(path);

      if (host == null || host.isBlank()) {
        return decode(cleanPath);
      }

      if (host.startsWith(bucket + ".s3.")) {
        return decode(cleanPath);
      }

      if (!cleanPath.isEmpty()) {
        if (cleanPath.startsWith(bucket + "/")) {
          return decode(cleanPath.substring(bucket.length() + 1));
        }
        return decode(cleanPath);
      }
      return decode(ref);
    } catch (IllegalArgumentException e) {
      // URL 파싱 실패 -> 순수 key로 취급
      return decode(stripLeadingSlash(ref));
    }
  }

  private static String stripLeadingSlash(String s) {
    if (s == null) return null;
    return s.startsWith("/") ? s.substring(1) : s;
  }

  private static String decode(String s) {
    try {
      return java.net.URLDecoder.decode(s, java.nio.charset.StandardCharsets.UTF_8);
    } catch (Exception e) {
      return s;
    }
  }



}

