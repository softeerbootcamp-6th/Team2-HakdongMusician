package com.daycan.service.event;

import java.util.Map;

public record SendSmsRequestedEvent(
    Map<String, String> toText,
    String jobIdPrefix,
    String batchKeyPrefix
) implements AsyncEvent {}

