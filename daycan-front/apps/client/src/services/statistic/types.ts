import type { YearMonthDay } from "@/types/date";

/**
 * 각 통계별 데이터 타입
 * values는 각 통계별 데이터 타입에 따라 변경되기에 Record<string, number> 타입으로 정의함
 * 일자 - 값 형태로 오게될 예정
 * @author 홍규진
 */
export type TStatisticValues = {
  values: Record<YearMonthDay, number>;
  average: number;
};

/**
 * 요청에 따른 통계 데이터 타입
 * 온도, 혈압, 소변, 배변 데이터 타입이 존재하며
 * 각 데이터 타입에 따라, 날짜별 데이터를 제공함
 * @author 홍규진
 */
export type TStatistic = {
  temperatureValues: TStatisticValues;
  bloodPressureDiastolicValues: TStatisticValues;
  bloodPressureSystolicValues: TStatisticValues;
  defecationCountValues: TStatisticValues;
  urinationCountValues: TStatisticValues;
};
