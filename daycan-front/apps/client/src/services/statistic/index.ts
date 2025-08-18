import { safeRequest } from "@daycan/api";
import type { TDailyStatistic, TMonthlyStatistic } from "./types";
import type { YearMonth, YearMonthDay } from "@/types/date";
import { privateInstance } from "../instance";

/**
 * 일별 통계 데이터 조회 (1주일/1달 기간용)
 * @author 홍규진
 */
export const getStatisticData = async (
  startDate: YearMonthDay,
  endDate: YearMonthDay
): Promise<TDailyStatistic> => {
  return await safeRequest.get<TDailyStatistic>(
    privateInstance,
    `/member/statistics/vitals/from/${startDate}/to/${endDate}`
  );
};

/**
 * 월별 통계 데이터 조회 (6개월 기간용)
 * @author 홍규진
 */
export const getStatisticMonthData = async (
  startDate: YearMonth,
  endDate: YearMonth
): Promise<TMonthlyStatistic> => {
  return await safeRequest.get<TMonthlyStatistic>(
    privateInstance,
    `/member/statistics/vitals/from/${startDate}/to/${endDate}`
  );
};
