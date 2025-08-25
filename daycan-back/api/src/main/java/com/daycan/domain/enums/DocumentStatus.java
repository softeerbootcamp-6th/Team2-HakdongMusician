package com.daycan.domain.enums;

import com.daycan.domain.entry.document.report.ReportStatus;
import com.daycan.domain.entry.document.sheet.SheetStatus;
import java.util.EnumSet;
import java.util.Map;
import java.util.Set;
import lombok.Getter;

import java.util.Collection;


@Getter
public enum DocumentStatus {
  NOT_APPLICABLE("해당없음"),        // 1
  SHEET_PENDING("작성 전"),          // 2
  SHEET_DONE("작성 완료"),           // 2
  REPORT_PENDING("리포트 생성중"),   // 3
  REPORT_CREATED("리포트 생성 완료"), // 3
  REPORT_REVIEWED("리포트 검토 완료"), // 3
  REPORT_SENDING("리포트 전송중"),    // 3
  REPORT_RESERVED("리포트 예약 완료"), // 4
  REPORT_DONE("리포트 전송 완료");     // 4

  private final String description;

  DocumentStatus(String description) {
    this.description = description;
  }

  /* ---------- 전이 가능성(선택적) ---------- */
  private static final Map<DocumentStatus, Set<DocumentStatus>> ALLOWED = Map.of(
      NOT_APPLICABLE, Set.of(SHEET_PENDING),
      SHEET_PENDING, Set.of(SHEET_DONE, NOT_APPLICABLE),
      SHEET_DONE, Set.of(SHEET_DONE, REPORT_PENDING, NOT_APPLICABLE),
      REPORT_PENDING, Set.of(SHEET_DONE, REPORT_CREATED, NOT_APPLICABLE),
      REPORT_CREATED, Set.of(SHEET_DONE, REPORT_REVIEWED, NOT_APPLICABLE),
      REPORT_REVIEWED, Set.of(REPORT_SENDING, REPORT_RESERVED),
      REPORT_RESERVED, Set.of(REPORT_SENDING),
      REPORT_SENDING, Set.of(REPORT_DONE),
      REPORT_DONE, Set.of()
  );

  public boolean canTransitTo(DocumentStatus next) {
    return ALLOWED.getOrDefault(this, Set.of()).contains(next);
  }

  public SheetStatus toSheetStatus() {
    return switch (this) {
      case NOT_APPLICABLE -> SheetStatus.NOT_APPLICABLE;
      case SHEET_PENDING -> SheetStatus.PENDING;
      case SHEET_DONE, REPORT_PENDING, REPORT_CREATED -> SheetStatus.DONE;
      case REPORT_REVIEWED, REPORT_SENDING, REPORT_RESERVED, REPORT_DONE -> SheetStatus.REVIEWED;
    };
  }

  public ReportStatus toReportStatus(Long careReportId) {
    return switch (this) {
      case NOT_APPLICABLE, SHEET_PENDING -> ReportStatus.NOT_APPLICABLE;
      case SHEET_DONE ->
          (careReportId == null ? ReportStatus.NOT_APPLICABLE : ReportStatus.PENDING);
      case REPORT_PENDING -> ReportStatus.PENDING;
      case REPORT_CREATED -> ReportStatus.CREATED;
      case REPORT_REVIEWED -> ReportStatus.REVIEWED;
      case REPORT_SENDING -> ReportStatus.SENDING;
      case REPORT_RESERVED -> ReportStatus.RESERVED;
      case REPORT_DONE -> ReportStatus.DONE;
    };
  }

  public static DocumentStatus from(SheetStatus sheet, ReportStatus report) {
    if (report != null && report != ReportStatus.NOT_APPLICABLE) {
      if (sheet != null && sheet != SheetStatus.DONE) {
        throw new IllegalArgumentException(
            "Report status requires SheetStatus.DONE (sheet=" + sheet + ", report=" + report + ")"
        );
      }
      return switch (report) {
        case PENDING -> REPORT_PENDING;
        case CREATED -> REPORT_CREATED;
        case REVIEWED -> REPORT_REVIEWED;
        case SENDING -> REPORT_SENDING;
        case RESERVED -> REPORT_RESERVED;
        case DONE -> REPORT_DONE;
        case NOT_APPLICABLE -> throw new IllegalStateException("Unreachable");
      };
    }

    if (sheet == null) {
      return NOT_APPLICABLE;
    }
    return switch (sheet) {
      case NOT_APPLICABLE -> NOT_APPLICABLE;
      case PENDING -> SHEET_PENDING;
      case DONE -> SHEET_DONE;
      case REVIEWED -> REPORT_REVIEWED;
    };
  }

  public static DocumentStatus from(ReportStatus report) {
    return from(SheetStatus.DONE, report);
  }

  public static DocumentStatus from(SheetStatus sheet) {
    return from(sheet, ReportStatus.NOT_APPLICABLE);
  }


  public static EnumSet<DocumentStatus> fromSheet(SheetStatus sheet) {
    if (sheet == null) {
      return EnumSet.of(NOT_APPLICABLE);
    }
    return switch (sheet) {
      case NOT_APPLICABLE -> EnumSet.of(NOT_APPLICABLE);
      case PENDING -> EnumSet.of(SHEET_PENDING);
      case DONE -> EnumSet.of(SHEET_DONE, REPORT_PENDING, REPORT_CREATED);
      case REVIEWED -> EnumSet.of(REPORT_REVIEWED, REPORT_SENDING, REPORT_RESERVED, REPORT_DONE);
    };
  }
  public static EnumSet<DocumentStatus> unfinished() {
    return EnumSet.of(
        DocumentStatus.SHEET_PENDING,
        DocumentStatus.SHEET_DONE,
        DocumentStatus.REPORT_PENDING,
        DocumentStatus.REPORT_CREATED
    );
  }

  public static EnumSet<DocumentStatus> finished() {
    return EnumSet.of(
        DocumentStatus.REPORT_SENDING,
        DocumentStatus.REPORT_RESERVED,
        DocumentStatus.REPORT_DONE
    );
  }

  public static EnumSet<DocumentStatus> reviewed() {
    return EnumSet.of(
        DocumentStatus.REPORT_REVIEWED,
        DocumentStatus.REPORT_SENDING,
        DocumentStatus.REPORT_RESERVED,
        DocumentStatus.REPORT_DONE
    );
  }


  public static EnumSet<DocumentStatus> fromReport(ReportStatus report) {
    if (report == null || report == ReportStatus.NOT_APPLICABLE) {
      return EnumSet.of(NOT_APPLICABLE);
    }
    return switch (report) {
      case PENDING -> EnumSet.of(REPORT_PENDING);
      case CREATED -> EnumSet.of(REPORT_CREATED);
      case REVIEWED -> EnumSet.of(REPORT_REVIEWED);
      case SENDING -> EnumSet.of(REPORT_SENDING);
      case RESERVED -> EnumSet.of(REPORT_RESERVED);
      case DONE -> EnumSet.of(REPORT_DONE);
      default -> EnumSet.of(NOT_APPLICABLE);
    };
  }

  public static EnumSet<DocumentStatus> allReportStatuses() {
    return EnumSet.of(
        REPORT_PENDING,
        REPORT_CREATED,
        REPORT_REVIEWED,
        REPORT_SENDING,
        REPORT_RESERVED,
        REPORT_DONE
    );
  }

  public static EnumSet<DocumentStatus> allSheetStatuses() {
    return EnumSet.of(
        NOT_APPLICABLE,
        SHEET_PENDING,
        SHEET_DONE,
        REPORT_PENDING,
        REPORT_CREATED,
        REPORT_REVIEWED,
        REPORT_SENDING,
        REPORT_RESERVED,
        REPORT_DONE
    );
  }
}
