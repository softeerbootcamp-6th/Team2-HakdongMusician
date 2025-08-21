import { useQuery } from "@tanstack/react-query";
import { getDocumentCount, getDocumentByMonth } from "./index";
import type { YearMonth, YearMonthDay } from "@/types/date";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";

/**
 * 문서 조회 쿼리 키
 * @author 홍규진
 */
export const documentKeys = {
  all: ["document"] as const,
  count: (yyyymmdd: YearMonthDay) =>
    [...documentKeys.all, "count", yyyymmdd] as const,
  list: (memberId: number, yyyymm: YearMonth) =>
    [...documentKeys.all, "list", memberId, yyyymm] as const,
};

/**
 * 날짜별 문서 조회 쿼리
 * @author 홍규진
 */
export const useGetDocumentCountQuery = (yyyymmdd: YearMonthDay) => {
  return useQuery({
    queryKey: documentKeys.count(yyyymmdd),
    queryFn: () => getDocumentCount(yyyymmdd),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

/**
 * 수급자 별 월별 문서 리스트 조회 쿼리(기록지, 리포트 둘의 리스트를 조회합니다.)
 * @author 홍규진
 */
export const useGetDocumentListQuery = (
  memberId: number,
  yyyymm: YearMonth
) => {
  return useQuery({
    queryKey: documentKeys.list(memberId, yyyymm),
    queryFn: () => getDocumentByMonth(memberId, yyyymm),
    ...DEFAULT_QUERY_OPTIONS,
  });
};
