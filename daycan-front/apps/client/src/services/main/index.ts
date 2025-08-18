import { safeRequest } from "@daycan/api";
import type { TGetHomeDataResponse } from "./types";
import { privateInstance } from "../instance";
import type { YearMonthDay } from "@/types/date";

/**
 * 홈 데이터 조회 (기본값: 오늘 날짜)
 * 날짜를 기준으로 home 화면을 구성하기 위해 사용
 * @author 홍규진
 */
export const getMainData = async (
  yyyymmdd: YearMonthDay
): Promise<TGetHomeDataResponse> => {
  return await safeRequest.get<TGetHomeDataResponse>(
    privateInstance,
    `/member/home/${yyyymmdd}`
  );
};
