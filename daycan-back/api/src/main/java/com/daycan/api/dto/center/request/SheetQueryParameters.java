package com.daycan.api.dto.center.request;

import com.daycan.domain.entry.document.sheet.SheetStatus;
import java.util.List;

public record SheetQueryParameters(
    List<SheetStatus> statuses
) {

}
