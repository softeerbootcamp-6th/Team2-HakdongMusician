import { useQuery } from "@tanstack/react-query";
import { getReport, getReportList } from ".";
import type { TReportStatus } from "./types";
import type { YearMonthDay } from "@/types/date";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";

/**
 * 리포트 Query Keys
 * @author 홍규진
 */
export const reportKeys = {
  all: ["reports"] as const,
  list: (yyyymmdd: YearMonthDay, statuses?: TReportStatus[]) =>
    [...reportKeys.all, "list", yyyymmdd, statuses] as const,
  detail: (yyyymmdd: YearMonthDay, memberId: number) =>
    [...reportKeys.all, "detail", yyyymmdd, memberId] as const,
};

/**
 * 리포트 리스트 조회 쿼리
 * List 의 경우엔 추후에 Suspense 쿼리로 변환 후 사용할 예정
 * @param yyyymm 월
 * @author 홍규진
 */
export const useGetReportListQuery = (
  yyyymmdd: YearMonthDay,
  statuses?: TReportStatus[]
) => {
  return useQuery({
    queryKey: reportKeys.list(yyyymmdd, statuses),
    queryFn: () => getReportList(yyyymmdd, statuses),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

/**
 * 리포트 상세 조회 쿼리
 * @param yyyymmdd 날짜
 * @param memberId 수급자 ID
 * @author 홍규진
 */
export const useGetReportDetailQuery = (
  yyyymmdd: YearMonthDay,
  memberId: number,
  enabled: boolean
) => {
  return useQuery({
    queryKey: reportKeys.detail(yyyymmdd, memberId),
    queryFn: () => getReport(yyyymmdd, memberId),
    enabled,
    ...DEFAULT_QUERY_OPTIONS,
  });
};
