package com.daycan.api.controller.center;

import com.daycan.common.response.ResponseWrapper;
import com.daycan.api.dto.center.response.PresignResponse;

import com.daycan.external.S3Service;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/images")
@Tag(name = "\uD83D\uDEE2 S3 관련 API", description = "이미지 업로드 및 presigned URL 관련 API")
public class CenterImageController {

  private final S3Service s3Service;

  /**
   * 한 장 업로드용 presigned URL 발급 (주로 프로필)
   * TODO: thumbnail 만드는 비동기 로직 필요
   */
  @PostMapping("/presign/single")
  public ResponseWrapper<PresignResponse> presignSingle(
      @RequestParam @Pattern(regexp = "jpg|jpeg|png") String extension, // jpg|jpeg|png
      @RequestParam @NotBlank String contentType          // image/jpeg ...
  ) {
    return ResponseWrapper.onSuccess(
        s3Service.presignSingle(extension, contentType)
    );
  }


  /**
   * 여러 장 업로드용 presigned URL 배치 발급 (OCR 등)
   */
  @PostMapping("/presign/list")
  public ResponseWrapper<List<PresignResponse>> presignOcrBatch(
      @RequestParam @Min(1) @Max(20) int count,
      @RequestParam @Pattern(regexp = "jpg|jpeg|png") String extension,
      @RequestParam @NotBlank String contentType
  ) {
    return ResponseWrapper.onSuccess(
        s3Service.presignOcrBatch(count, extension, contentType)
    );
  }

}