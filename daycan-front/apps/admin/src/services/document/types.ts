import type { YearMonthDay } from "@/types/date";
import type { CareSheetStatus } from "../careSheet/types";
import type { TReportStatus } from "../report/types";

/**
 * 문서 월별 조회 응답 타입
 * /admin/document/{memberId}/{month}
 * @author 홍규진
 */
export type TDocumentByMonth = {
  documentDate: YearMonthDay;
  careSheet: {
    careSheetId: number;
    status: CareSheetStatus;
  };
  careReport: {
    careReportId: number;
    status: TReportStatus;
  };
};

/**
 * 문서 개수 조회 응답 타입
 * /admin/document/count/{date}
 * @author 홍규진
 */
export type TDocumentCount = {
  numberOfCareReport: number;
  numberOfCareSheet: number;
};
