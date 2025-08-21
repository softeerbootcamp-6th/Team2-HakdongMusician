import type { YearMonthDay } from "@/types/date";

/**
 * 문서 월별 조회 응답 타입
 * /admin/document/{memberId}/{month}
 * @author 홍규진
 */
export type TDocumentByMonth = {
  documentDate: YearMonthDay;
  careSheet: {
    careSheetId: number;
    status: "DONE" | "NOT_APPLICABLE" | "PENDING";
  };
  careReport: {
    careReportId: number;
    status: "REVIEWED";
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
