import type { YearMonthDay } from "@/types/date";
import type {
  TCareSheetListItem,
  TCareSheetReadResponse,
  TCareSheetWriteRequest,
  TCareSheetAttendanceRequest,
} from "./types";
import { safeRequest } from "@daycan/api";
import { privateInstance } from "@/services/instance";
import { handleError } from "@/services/error/handleError";

/**
 * 기록지 리스트 조회 함수
 * /admin/care-sheet/{yyyymmdd}
 * @author 홍규진
 */
export const getCareSheetList = (
  date: YearMonthDay,
  memberId: string
): Promise<TCareSheetListItem[] | null> => {
  try {
    const response = safeRequest.get<TCareSheetListItem[]>(
      privateInstance,
      `/admin/care-sheet/${date}/${memberId}`
    );
    return response;
  } catch (error) {
    handleError(error);
    return Promise.resolve(null);
  }
};

/**
 * 기록지 단건 조회 함수
 * /admin/care-sheet/{date}/{memberId}
 * @author 홍규진
 */
export const getCareSheet = (
  date: YearMonthDay,
  memberId: string
): Promise<TCareSheetReadResponse | null> => {
  try {
    const response = safeRequest.get<TCareSheetReadResponse>(
      privateInstance,
      `/admin/care-sheet/${date}/${memberId}`
    );
    return response;
  } catch (error) {
    handleError(error);
    return Promise.resolve(null);
  }
};

/**
 * 기록지 작성 함수
 * /admin/care-sheet
 * @author 홍규진
 */
export const writeCareSheet = async (
  request: TCareSheetWriteRequest
): Promise<void> => {
  try {
    await safeRequest.post(privateInstance, "/admin/care-sheet", request);
  } catch (error) {
    handleError(error, "mobile");
  }
};

/**
 * 수급자 출결 처리 함수
 * /admin/care-sheet/attendance
 * @author 홍규진
 */
export const updateCareSheetAttendance = async (
  request: TCareSheetAttendanceRequest
): Promise<void> => {
  try {
    await safeRequest.patch(
      privateInstance,
      "/admin/care-sheet/attendance",
      request
    );
  } catch (error) {
    handleError(error);
  }
};
