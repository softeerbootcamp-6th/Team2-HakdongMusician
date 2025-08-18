import { useSuspenseQuery } from "@tanstack/react-query";
import type { YearMonthDay } from "@/types/date";
import { getMainData } from "./index";
import { TODAY_DATE } from "@/utils/dateUtils";

const MAIN_QUERY_KEY = {
  all: ["main"],
  detail: (yyyymmdd: YearMonthDay) => [...MAIN_QUERY_KEY.all, yyyymmdd],
};

/**
 * 리포트 단건 조회 쿼리
 * @author 홍규진
 */
export const useSuspenseGetMainDataQuery = (
  yyyymmdd: YearMonthDay = TODAY_DATE
) => {
  return useSuspenseQuery({
    queryKey: MAIN_QUERY_KEY.detail(yyyymmdd),
    queryFn: () => getMainData(yyyymmdd),
  });
};
