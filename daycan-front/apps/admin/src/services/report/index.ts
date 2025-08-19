import type { YearMonthDay } from "@/types/date";
import type {
  TReportListItem,
  TReportReadResponse,
  TReportStatus,
} from "./types";
import { safeRequest } from "@daycan/api";
import { privateInstance } from "../instance";

/**
 * 리포트 리스트 조회
 * @param yyyymm 월
 * @param statuses 상태
 * @param memberNameLike 수급자 이름 검색
 * @author 홍규진
 */
export const getReportList = async (
  yyyymm: YearMonthDay,
  statuses?: TReportStatus[],
  memberNameLike?: string
): Promise<TReportListItem[] | null> => {
  return await safeRequest.get<TReportListItem[]>(
    privateInstance,
    `/admin/report/${yyyymm}`,
    {
      params: {
        statuses,
        memberNameLike,
      },
    }
  );
};

/**
 * 리포트 상세 조회
 * @param yyyymmdd 날짜
 * @param memberId 수급자 ID
 * @author 홍규진
 */
export const getReport = async (
  yyyymmdd: YearMonthDay,
  memberId: number
): Promise<TReportReadResponse | null> => {
  return await safeRequest.get<TReportReadResponse>(
    privateInstance,
    `/admin/report/${yyyymmdd}/${memberId}`
  );
};

/**
 * 리포트 전송
 * @param reportId 리포트 ID
 * @author 홍규진
 */
export const sendReport = async (reportId: number): Promise<void> => {
  return await safeRequest.patch(
    privateInstance,
    `/admin/care-report/${reportId}/send`,
    {
      reportId,
    }
  );
};

/**
 * 리포트 검토
 * @param reportId 리포트 ID
 * @author 홍규진
 */
export const reviewReport = async (reportId: number): Promise<void> => {
  return await safeRequest.patch(
    privateInstance,
    `/admin/care-report/${reportId}/review`
  );
};
