import type { YearMonthDay } from "@/types/date";
import type {
  TCareSheetListItem,
  TCareSheetReadResponse,
  TCareSheetWriteRequest,
  TCareSheetAttendanceRequest,
} from "./types";
import { safeRequest } from "@daycan/api";
import { privateInstance } from "@/services/instance";

/**
 * 기록지 리스트 조회 함수
 * /admin/care-sheet/{yyyymmdd}
 * @author 홍규진
 */
export const getCareSheetList = async (
  date: YearMonthDay,
  memberId: string
): Promise<TCareSheetListItem[] | null> => {
  return await safeRequest.get<TCareSheetListItem[]>(
    privateInstance,
    `/admin/care-sheet/${date}/${memberId}`
  );
};

/**
 * 기록지 단건 조회 함수
 * /admin/care-sheet/{date}/{memberId}
 * @author 홍규진
 */
export const getCareSheet = async (
  date: YearMonthDay,
  memberId: string
): Promise<TCareSheetReadResponse | null> => {
  return await safeRequest.get<TCareSheetReadResponse>(
    privateInstance,
    `/admin/care-sheet/${date}/${memberId}`
  );
};

/**
 * 기록지 작성 함수
 * /admin/care-sheet
 * @author 홍규진
 */
export const writeCareSheet = async (
  request: TCareSheetWriteRequest
): Promise<void> => {
  return await safeRequest.post(privateInstance, "/admin/care-sheet", request);
};

/**
 * 수급자 출결 처리 함수
 * /admin/care-sheet/attendance
 * @author 홍규진
 */
export const updateCareSheetAttendance = async (
  request: TCareSheetAttendanceRequest
): Promise<void> => {
  return await safeRequest.patch(
    privateInstance,
    "/admin/care-sheet/attendance",
    request
  );
};
