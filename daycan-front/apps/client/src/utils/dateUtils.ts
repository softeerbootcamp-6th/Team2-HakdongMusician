import type { YearMonth, YearMonthDay } from "@/types/date";

/**
 * 오늘 날짜를 (YYYY-MM-DD) 형식으로 반환
 * @returns 오늘 날짜 (YYYY-MM-DD)
 * @author 홍규진
 */
export const TODAY_DATE = new Date()
  .toISOString()
  .split("T")[0] as YearMonthDay;

export const TODAY_YYYYMM = new Date()
  .toISOString()
  .split("T")[0]
  .split("-")
  .slice(0, 2)
  .join("-") as YearMonth;

export const formatYYYYMMDD = (date: Date | string): YearMonthDay => {
  if (typeof date === "string") {
    // 이미 YYYY-MM-DD 형식의 문자열인 경우 그대로 반환
    return date as YearMonthDay;
  }
  return date.toISOString().split("T")[0] as YearMonthDay;
};

export const getDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};
