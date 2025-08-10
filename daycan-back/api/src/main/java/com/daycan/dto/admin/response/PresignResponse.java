package com.daycan.dto.admin.response;

import java.util.List;
import java.util.Map;

public record PresignResponse(
    String objectKey,
    String uploadUrl,
    Map<String, List<String>> headers
) {}
