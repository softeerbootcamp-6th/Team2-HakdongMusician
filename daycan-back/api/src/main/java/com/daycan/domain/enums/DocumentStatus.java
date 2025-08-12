package com.daycan.domain.enums;

import com.daycan.domain.entry.document.report.ReportStatus;
import com.daycan.domain.entry.document.sheet.SheetStatus;
import java.util.Map;
import java.util.Set;
import lombok.Getter;

@Getter
public enum DocumentStatus {
  NOT_APPLICABLE("해당없음"), // 1
  SHEET_PENDING("작성 전"), // 2
  SHEET_DONE("작성 완료"), // 2
  REPORT_PENDING("리포트 생성중"), // 3
  REPORT_CREATED("리포트 생성 완료"), // 3
  REPORT_REVIEWED("리포트 검토 완료"), // 3
  REPORT_SENDING("리포트 전송중"), // 3
  REPORT_RESERVED("리포트 예약 완료"), // 4
  REPORT_DONE("리포트 전송 완료"); // 4

  private final String description;

  DocumentStatus(String description) {
    this.description = description;
  }

  private static final Map<DocumentStatus, Set<DocumentStatus>> ALLOWED = Map.of(
      NOT_APPLICABLE, Set.of(SHEET_PENDING),
      SHEET_PENDING,  Set.of(SHEET_DONE),
      SHEET_DONE,     Set.of(REPORT_PENDING),
      REPORT_PENDING, Set.of(REPORT_CREATED),
      REPORT_CREATED, Set.of(REPORT_REVIEWED),
      REPORT_REVIEWED,Set.of(REPORT_SENDING, REPORT_RESERVED),
      REPORT_RESERVED,Set.of(REPORT_SENDING),
      REPORT_SENDING, Set.of(REPORT_DONE),
      REPORT_DONE,    Set.of()
  );
  public boolean canTransitTo(DocumentStatus next) {
    return ALLOWED.getOrDefault(this, Set.of()).contains(next);
  }

  public SheetStatus toSheetStatus() {
    return switch (this) {
      case NOT_APPLICABLE -> SheetStatus.NOT_APPLICABLE;
      case SHEET_PENDING -> SheetStatus.PENDING;
      case SHEET_DONE,
           REPORT_PENDING, REPORT_CREATED, REPORT_REVIEWED, REPORT_SENDING, REPORT_RESERVED, REPORT_DONE
          -> SheetStatus.DONE;
    };
  }

  public ReportStatus toReportStatus(Long careReportId) {
    return switch (this) {
      case NOT_APPLICABLE, SHEET_PENDING -> ReportStatus.NOT_APPLICABLE;
      case SHEET_DONE     -> (careReportId == null ? ReportStatus.NOT_APPLICABLE : ReportStatus.PENDING);
      case REPORT_PENDING   -> ReportStatus.PENDING;
      case REPORT_CREATED   -> ReportStatus.CREATED;
      case REPORT_REVIEWED  -> ReportStatus.REVIEWED;
      case REPORT_SENDING   -> ReportStatus.SENDING;
      case REPORT_RESERVED  -> ReportStatus.RESERVED;
      case REPORT_DONE      -> ReportStatus.DONE;
    };
  }


  public static DocumentStatus from(SheetStatus sheet, ReportStatus report) {
    // 리포트 축이 유효하면 리포트 축을 우선한다.
    if (report != null && report != ReportStatus.NOT_APPLICABLE) {
      // 안전장치: 리포트가 진행/완료인데 시트가 DONE이 아니라면 모순
      if (sheet != null && sheet != SheetStatus.DONE) {
        throw new IllegalArgumentException("Report status requires SheetStatus.DONE (sheet=" + sheet + ", report=" + report + ")");
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

    // 리포트 축이 없으면 시트 축으로 결정
    if (sheet == null) return NOT_APPLICABLE;
    return switch (sheet) {
      case NOT_APPLICABLE -> NOT_APPLICABLE;
      case PENDING -> SHEET_PENDING;
      case DONE -> SHEET_DONE;
    };
  }



    // 편의 생성자: 리포트 축만으로 결정 (시트는 자동으로 DONE 가정)
    public static DocumentStatus from(ReportStatus report) {
      return from(SheetStatus.DONE, report);
    }

    // 편의 생성자: 시트 축만으로 결정 (리포트는 아직 시작 전으로 가정)
    public static DocumentStatus from(SheetStatus sheet) {
      return from(sheet, ReportStatus.NOT_APPLICABLE);
    }

}
