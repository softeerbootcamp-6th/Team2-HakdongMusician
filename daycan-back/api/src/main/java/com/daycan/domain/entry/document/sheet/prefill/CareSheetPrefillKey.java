package com.daycan.domain.entry.document.sheet.prefill;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CareSheetPrefillKey {

  @Column(name = "writer_id", nullable = false)
  private Long writerId;

  @Column(name = "doc_date", nullable = false)
  private LocalDate docDate;

  @Column(name = "member_id", nullable = false)
  private Long memberId;
}

