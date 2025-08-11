package com.daycan.api.dto.center.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record S3Response(

    @Schema(description = "업로드된 S3 URL 목록", example = "[\"https://bucket.s3.amazonaws.com/img1.png\"]")
    List<String> uploadedUrls

) {}

