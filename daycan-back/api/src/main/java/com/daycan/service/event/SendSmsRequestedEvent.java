package com.daycan.service.event;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record SendSmsRequestedEvent(
    Map<String, String> toText,   // key: phone, value: text
    List<Long> documentIds,
    String jobIdPrefix,
    String batchKeyPrefix,
    LocalDate reportDate
) implements AsyncEvent {}


