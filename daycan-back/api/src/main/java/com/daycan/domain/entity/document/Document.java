package com.daycan.domain.entity.document;

import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.entity.Center;
import com.daycan.domain.entity.Member;
import com.daycan.domain.enums.DocumentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(
    name = "document",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_document_member_date",
        columnNames = {"member_id", "doc_date"}
    ),
    indexes = {
        @Index(name = "idx_document_member", columnList = "member_id"),
        @Index(name = "idx_document_center", columnList = "center_id"),
        @Index(name = "idx_document_doc_date", columnList = "doc_date")
    }
)

public class Document extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id; // 인조 PK

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "member_id", nullable = false)
  private Member member;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "center_id", nullable = false)
  private Center center; // 작성 시점 기관 박제

  @Builder.Default
  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private DocumentStatus status = DocumentStatus.SHEET_PENDING;

  @Column(name = "doc_date", nullable = false)
  private LocalDate docDate;

  @OneToOne(mappedBy = "document")
  private CareSheet careSheet;

  @OneToOne(mappedBy = "document")
  @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
  private Vital vital;

  @OneToOne(mappedBy = "document")
  private CareReport careReport;


  public void sheetDone() {
    this.status = DocumentStatus.SHEET_DONE;
  }
}