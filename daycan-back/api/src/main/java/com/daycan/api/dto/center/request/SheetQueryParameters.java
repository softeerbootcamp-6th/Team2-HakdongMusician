package com.daycan.api.dto.center.request;

import com.daycan.domain.entry.document.sheet.SheetStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record SheetQueryParameters(
    @Schema(description = "시트 상태 목록", example = "[\"SHEET_PENDING\",\"SHEET_DONE\"]")
    List<SheetStatus> statuses
) {

  public boolean hasStatuses() {
    return statuses != null && !statuses.isEmpty();
  }
}
