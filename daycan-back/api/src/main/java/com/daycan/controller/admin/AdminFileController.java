package com.daycan.controller.admin;

import com.daycan.dto.admin.response.S3Response;
import com.daycan.common.response.ResponseWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

public class AdminFileController {
  @PostMapping(
      value = "/api/files",
      consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE
  )
  @Operation(
      summary = "S3 이미지 업로드",
      description = "Mock S3에 이미지를 업로드하는 척 하고, 가짜 URL을 반환합니다."
  )
  @Deprecated
  public ResponseWrapper<S3Response> uploadFiles(
      @Parameter(
          description = "multipart/form-data 형식의 이미지 리스트. key는 files입니다.",
          content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)
      )
      @RequestPart("files") @NotEmpty List<MultipartFile> files) {

    List<String> fakeUrls = files.stream()
        .map(file -> "https://mock-s3.com/images/example")
        .toList();

    return ResponseWrapper.onSuccess(new S3Response(fakeUrls));
  }

}
