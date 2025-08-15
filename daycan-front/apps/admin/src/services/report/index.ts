import type { YearMonthDay } from "@/types/date";
import type {
  TReportListItem,
  TReportReadResponse,
  TReportStatus,
} from "./types";
import { safeRequest } from "@daycan/api";
import { privateInstance } from "../instance";
import { handleError } from "@/services/error/handleError";

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
  try {
    const response = await safeRequest.get<TReportListItem[]>(
      privateInstance,
      `/admin/report/${yyyymm}`,
      {
        params: {
          statuses,
          memberNameLike,
        },
      }
    );
    return response;
  } catch (error) {
    handleError(error);
    return Promise.resolve(null);
  }
};

/**
 * 리포트 상세 조회
 * @param yyyymmdd 날짜
 * @param memberId 수급자 ID
 * @author 홍규진
 */
export const getReport = async (
  yyyymmdd: YearMonthDay,
  memberId: string
): Promise<TReportReadResponse | null> => {
  try {
    const response = await safeRequest.get<TReportReadResponse>(
      privateInstance,
      `/admin/report/${yyyymmdd}/${memberId}`
    );
    return response;
  } catch (error) {
    handleError(error);
    return Promise.resolve(null);
  }
};

/**
 * 리포트 전송
 * @param reportId 리포트 ID
 * @author 홍규진
 */
export const sendReport = async (reportId: number): Promise<void> => {
  try {
    await safeRequest.patch(
      privateInstance,
      `/admin/care-report/${reportId}/send`,
      {
        reportId,
      }
    );
  } catch (error) {
    handleError(error);
  }
};

/**
 * 리포트 검토
 * @param reportId 리포트 ID
 * @author 홍규진
 */
export const reviewReport = async (reportId: number): Promise<void> => {
  try {
    await safeRequest.patch(
      privateInstance,
      `/admin/care-report/${reportId}/review`
    );
  } catch (error) {
    handleError(error);
  }
};
