package com.daycan.domain.entity.document;

import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.CenterErrorStatus;
import com.daycan.common.response.status.error.DocumentErrorStatus;
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
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
    name = "document",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_document_member_date",
        columnNames = {"member_id", "date"}
    ),
    indexes = {
        @Index(name = "idx_doc_date_member_status",
            columnList = "date, status, member_id"),
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

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private DocumentStatus status ;

  @Column(name = "date", nullable = false)
  private LocalDate date;

  @OneToOne(mappedBy = "document")
  private CareSheet careSheet;

  @OneToOne(mappedBy = "document")
  private Vital vital;

  @OneToOne(mappedBy = "document")
  private CareReport careReport;

  @Column(name="reserved_send_time", nullable = true)
  private LocalDateTime reservedSendTime;

  // 생성 일원화
  private Document(Member member, Center center, LocalDate date) {
    try{
      this.member = Objects.requireNonNull(member);
      this.center = Objects.requireNonNull(center);
      this.date = Objects.requireNonNull(date);
    }catch (NullPointerException e){
      throw new ApplicationException(DocumentErrorStatus.NULL_MEMBER_OR_CENTER);
    }
    this.status = DocumentStatus.SHEET_PENDING; // 초기 상태
    validateCenterMember(); // 생성 시 불변식 보장
  }

  public static Document create(Member member, Center center, LocalDate docDate) {
    return new Document(member, center, docDate);
  }

  public void transitTo(DocumentStatus next) {
    if (!status.canTransitTo(next)) {
      throw new ApplicationException(DocumentErrorStatus.INVALID_STATUS_TRANSITION);
    }
    this.status = next;
  }

  public void markSheetNotApplicable() {
    transitTo(DocumentStatus.NOT_APPLICABLE);
  }
  public void markSheetPending() {
    transitTo(DocumentStatus.SHEET_PENDING);
  }

  public void markSheetDone() {
    transitTo(DocumentStatus.SHEET_DONE);
  }

  public void markReportPending() {
    transitTo(DocumentStatus.REPORT_PENDING);
  }

  public void markReportCreated() {
    transitTo(DocumentStatus.REPORT_CREATED);
  }

  public void markReviewed() {
    transitTo(DocumentStatus.REPORT_REVIEWED);
  }

  public void markSending() {
    transitTo(DocumentStatus.REPORT_SENDING);
  }

  public void reserveSending(
      LocalDateTime reservedTime
  ) {
    this.reservedSendTime = Objects.requireNonNull(reservedTime);
    transitTo(DocumentStatus.REPORT_RESERVED);
  }

  public void markDone() {
    transitTo(DocumentStatus.REPORT_DONE);
  }


  // 양방향 연관 헬퍼
  public void linkCareSheet(CareSheet sheet) {
    this.careSheet = sheet;
    if (sheet != null && sheet.getDocument() != this) {
      sheet.linkDocument(this);
    }
  }

  public void linkVital(Vital vital) {
    this.vital = vital;
    if (vital != null && vital.getDocument() != this) {
      vital.linkDocument(this);
    }
  }

  public void linkCareReport(CareReport report) {
    this.careReport = report;
    if (report != null && report.getDocument() != this) {
      report.linkDocument(this);
    }
  }

  // ---- 불변식 ----
  private void validateCenterMember() {
    if (!Objects.equals(this.member.getCenter().getId(), this.center.getId())) {
      throw new ApplicationException(CenterErrorStatus.MEMBER_NOT_ALLOWED);
    }
  }

  private void prePersist() {
    if (status == null) {
      status = DocumentStatus.SHEET_PENDING;
    }
    validateCenterMember();
  }

}