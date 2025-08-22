import type { TTime, YearMonthDay } from "@/types/date";
import type {
  TReportEditRequest,
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
    `/admin/care-report/${yyyymm}`,
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
    `/admin/care-report/${yyyymmdd}/${memberId}`
  );
};

/**
 * 리포트 전송
 * @param memberIds 수급자 ID 리스트
 * @param sendDate 전송 날짜
 * @param sendTime 전송 시간
 * @author 홍규진
 */
export const sendReport = async (
  memberIds: number[],
  sendDate?: YearMonthDay,
  sendTime?: TTime
): Promise<void> => {
  return await safeRequest.patch(privateInstance, `/admin/care-report/send`, {
    memberIds,
    sendDate,
    sendTime,
  });
};

/**
 * 리포트 검토
 * @param reportId 리포트 ID
 * @author 홍규진
 */
export const reviewReport = async (
  reportId: number,
  editRequest: TReportEditRequest
): Promise<void> => {
  return await safeRequest.put(
    privateInstance,
    `/admin/care-report/${reportId}/review`,
    editRequest
  );
};
