package com.daycan.dto;

public record ReportEntry(
    String key, // key "혈압, 아침, 등"
    String value, // 값들
    String warning, // 경고 메시지, null이면 경고 없음
    String additionalInfo // nullable
) {

}
