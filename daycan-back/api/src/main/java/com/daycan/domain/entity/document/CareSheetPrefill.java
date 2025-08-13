package com.daycan.domain.entity.document;

import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.entry.document.sheet.prefill.CareSheetPrefillKey;
import com.daycan.domain.entry.document.sheet.prefill.CareSheetPrefillPayload;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Version;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

@Getter
@Entity
@Table(
    name = "care_sheet_prefill",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_writer_date_member",
            columnNames = {"writer_id", "doc_date", "member_id"}
        )
    },
    indexes = {
        @Index(name = "idx_prefill_writer_date", columnList = "writer_id, doc_date")
    }
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CareSheetPrefill extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // 인조 PK

  @Embedded
  private CareSheetPrefillKey key; // 값 타입

  @Type(JsonType.class)
  @Column(name = "payload", columnDefinition = "json", nullable = false)
  private CareSheetPrefillPayload payload;

  @Version
  @Column(name = "version", nullable = false)
  private Integer version = 0;

  @Builder
  private CareSheetPrefill(CareSheetPrefillKey key, CareSheetPrefillPayload payload) {
    this.key = key;
    this.payload = payload;
  }

  public CareSheetPrefill replacePayload(CareSheetPrefillPayload newPayload) {
    this.payload = newPayload;
    return this;
  }
}


