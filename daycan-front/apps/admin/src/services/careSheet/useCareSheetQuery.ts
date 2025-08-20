import { useQuery } from "@tanstack/react-query";
import { getCareSheetList, getCareSheet, getCareSheetDetail } from "./index";

import type { YearMonthDay } from "@/types/date";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";

/**
 * 케어시트를 위한 Query Keys
 * @author 홍규진
 */
export const careSheetKeys = {
  all: ["careSheets"] as const,
  lists: () => [...careSheetKeys.all, "list"] as const,
  listByDate: (date: YearMonthDay, writerId?: number) =>
    [...careSheetKeys.lists(), date, writerId] as const,
  details: () => [...careSheetKeys.all, "detail"] as const,
  detail: (careSheetId: number) =>
    [...careSheetKeys.details(), careSheetId] as const,
  detailByDate: (date: YearMonthDay) =>
    [...careSheetKeys.details(), date] as const,
  detailByMemberId: (memberId: number) =>
    [...careSheetKeys.details(), memberId] as const,
};

/**
 * 특정 날짜와 수급자의 케어시트 목록을 조회하는 훅
 * List 의 경우엔 추후에 Suspense 쿼리로 변환 후 사용할 예정
 * @author 홍규진
 */
export const useGetCareSheetListQuery = (
  date: YearMonthDay,
  writerId?: number
) => {
  return useQuery({
    queryKey: careSheetKeys.listByDate(date, writerId),
    queryFn: () => getCareSheetList(date, writerId),
    enabled: !!date,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

/**
 * 특정 날짜와 수급자의 케어시트 상세 정보를 조회하는 훅
 * @author 홍규진
 */
export const useGetCareSheetQuery = (date: YearMonthDay, memberId: number) => {
  return useQuery({
    queryKey: careSheetKeys.detailByDate(date),
    queryFn: () => getCareSheet(date, String(memberId)),
    enabled: !!date && !!memberId,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

/**
 * 특정 기록지의 단건 조회
 * @author 홍규진
 */
export const useGetCareSheetDetailQuery = (
  careSheetId: number,
  enabled = true
) => {
  return useQuery({
    queryKey: careSheetKeys.detail(careSheetId),
    queryFn: () => getCareSheetDetail(careSheetId),
    enabled: !!careSheetId && enabled,
    ...DEFAULT_QUERY_OPTIONS,
  });
};
