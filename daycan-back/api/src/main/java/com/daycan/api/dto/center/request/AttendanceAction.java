package com.daycan.api.dto.center.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "출결 처리 액션")
public enum AttendanceAction {
  ABSENT,
  PRESENT
}
