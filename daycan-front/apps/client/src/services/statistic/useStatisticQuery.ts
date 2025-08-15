import { useQuery } from "@tanstack/react-query";
import { getStatisticData, getStatisticMonthData } from ".";
import type { YearMonth, YearMonthDay } from "@/types/date";

const STATISTIC_QUERY_KEY = {
  all: ["statistic"],
  day: (startDate: YearMonthDay, endDate: YearMonthDay) => [
    ...STATISTIC_QUERY_KEY.all,
    startDate,
    endDate,
  ],
  month: (startDate: YearMonth, endDate: YearMonth) => [
    ...STATISTIC_QUERY_KEY.all,
    startDate,
    endDate,
  ],
};

/**
 * 통계 데이터 조회 쿼리
 * startDate, endDate 기간 내 통계 데이터 조회
 * @author 홍규진
 */
export const useGetStatisticDataQuery = (
  startDate: YearMonthDay,
  endDate: YearMonthDay
) => {
  return useQuery({
    queryKey: STATISTIC_QUERY_KEY.day(startDate, endDate),
    queryFn: () => getStatisticData(startDate, endDate),
  });
};

/**
 * 통계 데이터 조회 쿼리
 * startDate, endDate 기간 내 통계 데이터 조회
 * @author 홍규진
 */
export const useGetStatisticMonthDataQuery = (
  startDate: YearMonth,
  endDate: YearMonth
) => {
  return useQuery({
    queryKey: STATISTIC_QUERY_KEY.month(startDate, endDate),
    queryFn: () => getStatisticMonthData(startDate, endDate),
  });
};
