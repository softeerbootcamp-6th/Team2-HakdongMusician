import { useQuery } from "@tanstack/react-query";
import { getReport, getReportList } from "./index";
import type { YearMonthDay } from "@/types/date";
import type { YearMonth } from "@/types/date";

const REPORT_QUERY_KEY = {
  all: ["report"],
  list: (yyyymm: YearMonth) => [...REPORT_QUERY_KEY.all, "list", yyyymm],
  detail: (yyyymmdd: YearMonthDay) => [...REPORT_QUERY_KEY.all, yyyymmdd],
};

/**
 * 리포트 단건 조회 쿼리
 * @author 홍규진
 */
export const useGetReportQuery = (yyyymmdd: YearMonthDay) => {
  return useQuery({
    queryKey: REPORT_QUERY_KEY.detail(yyyymmdd),
    queryFn: () => getReport(yyyymmdd),
    enabled: !!yyyymmdd,
  });
};

/**
 * 리포트 YYYYMM 조회 쿼리
 * @author 홍규진
 */
export const useGetReportListQuery = (yyyymm: YearMonth) => {
  return useQuery({
    queryKey: REPORT_QUERY_KEY.list(yyyymm),
    queryFn: () => getReportList(yyyymm),
  });
};
