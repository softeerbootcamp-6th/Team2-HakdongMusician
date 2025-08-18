import type { YearMonth, YearMonthDay } from "@/types/date";

export interface DateRange {
  start: string;
  end: string;
}

/**
 * 날짜를 YYYY-MM 형식으로 변환
 * @param date 날짜
 * @returns YYYY-MM 형식의 날짜
 */
export const getYearMonth = (date: Date): YearMonth => {
  const year = date.toISOString().split("T")[0].split("-")[0];
  const month = date.toISOString().split("T")[0].split("-")[1];
  return `${year}-${month}`;
};

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 * @param date 날짜
 * @returns YYYY-MM-DD 형식의 날짜
 */
export const getYearMonthDay = (date: Date): YearMonthDay => {
  const year = date.toISOString().split("T")[0].split("-")[0];
  const month = date.toISOString().split("T")[0].split("-")[1];
  const day = date.toISOString().split("T")[0].split("-")[2];
  return `${year}-${month}-${day}`;
};

/**
 * 날짜 범위를 반환
 * @param period 기간 (1주일, 1개월, 6개월)
 * @param offset 오프셋
 * @returns 날짜 범위
 */
export const getDateRanges = (
  period: string,
  offset: number = 0
): DateRange[] => {
  const today = new Date();
  const ranges: DateRange[] = [];

  switch (period) {
    case "1주일":
      // offset을 기준으로 주 단위로 이동
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - offset * 7 - today.getDay());
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      ranges.push({
        start: getYearMonthDay(startDate), // YYYY-MM-DD 형식
        end: getYearMonthDay(endDate), // YYYY-MM-DD 형식
      });
      break;

    case "1개월":
      // offset을 기준으로 월 단위로 이동
      const monthStartDate = new Date(
        today.getFullYear(),
        today.getMonth() - offset,
        1
      );
      const monthEndDate = new Date(
        today.getFullYear(),
        today.getMonth() - offset + 1,
        0
      );

      ranges.push({
        start: getYearMonthDay(monthStartDate), // YYYY-MM-DD 형식
        end: getYearMonthDay(monthEndDate), // YYYY-MM-DD 형식
      });
      break;

    case "6개월":
      // offset을 기준으로 6개월 단위로 이동
      // 6개월 기간이므로 6개월 전부터 현재까지의 범위
      const endMonth = new Date(
        today.getFullYear(),
        today.getMonth() - offset * 6, // 6개월씩 이동
        1
      );
      const startMonth = new Date(
        endMonth.getFullYear(),
        endMonth.getMonth() - 5, // 6개월 범위 (현재 포함 월부터 5개월 전까지)
        1
      );

      const startYearMonth: YearMonth = getYearMonth(startMonth);
      const endYearMonth: YearMonth = getYearMonth(endMonth);

      ranges.push({
        start: startYearMonth, // YYYY-MM 형식
        end: endYearMonth, // YYYY-MM 형식
      });
      break;

    default:
      ranges.push({
        start: getYearMonthDay(new Date()),
        end: getYearMonthDay(new Date()),
      });
  }

  return ranges;
};
