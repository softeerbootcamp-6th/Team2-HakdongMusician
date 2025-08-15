import { safeRequest } from "@daycan/api";
import type { TStatistic } from "./types";
import type { YearMonth, YearMonthDay } from "@/types/date";
import { privateInstance } from "../instance";

/**
 * 통계 데이터 조회 startDate와 endDate 사이의 데이터를 조회함
 * @author 홍규진
 */
export const getStatisticData = async (
  startDate: YearMonthDay,
  endDate: YearMonthDay
): Promise<TStatistic[]> => {
  return await safeRequest.get<TStatistic[]>(
    privateInstance,
    `/member/statistics/vitals/from/${startDate}/to/${endDate}`
  );
};

/**
 * 통계 데이터 조회 startDate와 endDate 사이의 데이터를 조회함
 * @author 홍규진
 */
export const getStatisticMonthData = async (
  startDate: YearMonth,
  endDate: YearMonth
): Promise<TStatistic[]> => {
  return await safeRequest.get<TStatistic[]>(
    privateInstance,
    `/member/statistics/vitals/from/${startDate}/to/${endDate}`
  );
};
