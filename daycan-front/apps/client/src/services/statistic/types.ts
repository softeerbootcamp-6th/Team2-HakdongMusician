import type { YearMonth, YearMonthDay } from "@/types/date";

/**
 * 각 통계별 데이터 타입
 * values는 기간에 따라 다른 날짜 형식을 사용함
 * - 1주일/1달: YYYY-MM-DD 형식
 * - 6개월: YYYY-MM 형식
 * @author 홍규진
 */
export type TStatisticValues<T extends string = YearMonthDay> = {
  values: Record<T, number>;
  average: number;
};

/**
 * 일별/월별 통계 데이터 타입 (기간별 구분)
 */
export type TDailyStatisticValues = TStatisticValues<YearMonthDay>;
export type TMonthlyStatisticValues = TStatisticValues<YearMonth>;

/**
 * 일별 통계 데이터 타입 (1주일/1달 기간용)
 * @author 홍규진
 */
export type TDailyStatistic = {
  dailyScoreValues: TDailyStatisticValues;
  temperatureValues: TDailyStatisticValues;
  bloodPressureDiastolicValues: TDailyStatisticValues;
  bloodPressureSystolicValues: TDailyStatisticValues;
  defecationCountValues: TDailyStatisticValues;
  urinationCountValues: TDailyStatisticValues;
};

/**
 * 월별 통계 데이터 타입 (6개월 기간용)
 * @author 홍규진
 */
export type TMonthlyStatistic = {
  dailyScoreValues: TMonthlyStatisticValues;
  temperatureValues: TMonthlyStatisticValues;
  bloodPressureDiastolicValues: TMonthlyStatisticValues;
  bloodPressureSystolicValues: TMonthlyStatisticValues;
  defecationCountValues: TMonthlyStatisticValues;
  urinationCountValues: TMonthlyStatisticValues;
};

/**
 * 통계 데이터 Union 타입
 */
export type TStatistic = TDailyStatistic | TMonthlyStatistic;
