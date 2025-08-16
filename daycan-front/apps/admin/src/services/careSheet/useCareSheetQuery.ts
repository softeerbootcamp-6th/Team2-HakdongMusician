import { useQuery } from "@tanstack/react-query";
import { getCareSheetList, getCareSheet } from "./index";

import type { YearMonthDay } from "@/types/date";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";

/**
 * 케어시트를 위한 Query Keys
 * @author 홍규진
 */
export const careSheetKeys = {
  all: ["careSheets"] as const,
  lists: () => [...careSheetKeys.all, "list"] as const,
  list: (date: YearMonthDay, memberId: number) =>
    [...careSheetKeys.lists(), date, memberId] as const,
  details: () => [...careSheetKeys.all, "detail"] as const,
  detail: (date: YearMonthDay, memberId: number) =>
    [...careSheetKeys.details(), date, memberId] as const,
};

/**
 * 특정 날짜와 수급자의 케어시트 목록을 조회하는 훅
 * List 의 경우엔 추후에 Suspense 쿼리로 변환 후 사용할 예정
 * @author 홍규진
 */
export const useGetCareSheetList = (date: YearMonthDay, memberId: number) => {
  return useQuery({
    queryKey: careSheetKeys.list(date, memberId),
    queryFn: () => getCareSheetList(date, String(memberId)),
    enabled: !!date && !!memberId,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

/**
 * 특정 날짜와 수급자의 케어시트 상세 정보를 조회하는 훅
 * @author 홍규진
 */
export const useGetCareSheet = (date: YearMonthDay, memberId: number) => {
  return useQuery({
    queryKey: careSheetKeys.detail(date, memberId),
    queryFn: () => getCareSheet(date, String(memberId)),
    enabled: !!date && !!memberId,
    ...DEFAULT_QUERY_OPTIONS,
  });
};
