import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";
import { getStaff, getStaffList } from ".";

export const STAFF_QUERY_KEY = {
  all: ["staff"],
  list: () => [...STAFF_QUERY_KEY.all, "list"],
  detail: (staffId: number) => [...STAFF_QUERY_KEY.all, "detail", staffId],
};

/**
 * 직원 목록 조회 쿼리 (Suspense)
 * Suspense를 사용하여 로딩 상태를 자동으로 처리합니다.
 * @returns 직원 목록
 * @author 소보길
 */
export const useGetStaffListSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: STAFF_QUERY_KEY.list(),
    queryFn: () => getStaffList(),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

/**
 * 직원 목록 조회 쿼리 (기존 방식)
 * List 의 경우엔 추후에 Suspense 쿼리로 변환 후 사용할 예정
 * @returns 직원 목록
 * @author 홍규진
 */
export const useGetStaffListQuery = () => {
  return useQuery({
    queryKey: STAFF_QUERY_KEY.list(),
    queryFn: () => getStaffList(),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

/**
 * 직원 상세 조회 쿼리
 * @param staffId 직원 ID
 * @returns 직원 상세
 * @author 홍규진
 */
export const useGetStaffDetailQuery = (staffId: number) => {
  return useQuery({
    queryKey: STAFF_QUERY_KEY.detail(staffId),
    queryFn: () => getStaff(staffId),
    ...DEFAULT_QUERY_OPTIONS,
    enabled: !!staffId,
  });
};
