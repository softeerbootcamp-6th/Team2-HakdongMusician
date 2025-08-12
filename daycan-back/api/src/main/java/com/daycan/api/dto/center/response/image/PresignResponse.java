package com.daycan.api.dto.center.response.image;

import java.util.List;
import java.util.Map;

public record PresignResponse(
    String objectKey,
    String uploadUrl,
    Map<String, List<String>> headers
) {}
