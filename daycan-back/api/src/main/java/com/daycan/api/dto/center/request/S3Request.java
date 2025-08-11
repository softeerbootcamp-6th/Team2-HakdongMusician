package com.daycan.api.dto.center.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record S3Request(

    @Schema(
        description = "multipart/form-data 형식의 이미지 리스트. key 값은 files입니다.",
        example = "[image1.jpg, image2.png]"
    )
    @NotEmpty(message = "하나 이상의 파일을 업로드해야 합니다.")
    List<MultipartFile> files

) {}

