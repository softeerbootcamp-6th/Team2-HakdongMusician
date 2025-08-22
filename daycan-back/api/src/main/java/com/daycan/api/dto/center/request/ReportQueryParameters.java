package com.daycan.api.dto.center.request;


import com.daycan.domain.entry.document.report.ReportStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import java.text.Normalizer;
import java.util.List;
import java.util.Optional;

public record ReportQueryParameters(
    @Schema(description = "리포트 상태 목록", example = "[\"PENDING\",\"CREATED\"]")
    List<ReportStatus> statuses,

    @Schema(description = "수급자 이름 부분검색", example = "김")
    String memberNameLike
) {
  public Optional<String> memberNameLikeNorm() {
    if (memberNameLike == null) return Optional.empty();
    String s = Normalizer.normalize(memberNameLike.trim(), Normalizer.Form.NFC)
        .replaceAll("\\s+", " ");
    return s.isEmpty() ? Optional.empty() : Optional.of(s);
  }

}
