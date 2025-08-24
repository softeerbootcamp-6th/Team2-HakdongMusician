import { useQuery } from "@tanstack/react-query";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";
import { getMemberList, getMember, getUnwrittenMemberList } from "./index";
import type { YearMonthDay } from "@/types/date";

/**
 * 수급자 Query Keys
 * @author 홍규진
 */
export const memberKeys = {
  all: ["members"] as const,
  lists: () => [...memberKeys.all, "list"] as const,
  unwrittenLists: () => [...memberKeys.all, "unwrittenList"] as const,
  detail: (id: number) => [...memberKeys.all, "detail", id] as const,
};

/**
 * 수급자 목록 조회 쿼리 (기존 방식)
 * List 의 경우엔 추후에 Suspense 쿼리로 변환 후 사용할 예정
 * @author 홍규진
 */
export const useGetMemberListQuery = () => {
  return useQuery({
    queryKey: memberKeys.lists(),
    queryFn: getMemberList,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

/**
 * 수급자 목록 조회 쿼리 (바뀐 방식)
 * 해당 Query List 의 경우에 작성되지 않은 리포트만 조회
 * @author 홍규진
 */
export const useGetUnwrittenMemberListQuery = (date: YearMonthDay) => {
  return useQuery({
    queryKey: memberKeys.unwrittenLists(),
    queryFn: () => getUnwrittenMemberList(date),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

/**
 * 수급자 상세 조회 쿼리
 * @author 홍규진
 */
export const useGetMemberDetailQuery = (memberId: number) => {
  return useQuery({
    queryKey: memberKeys.detail(memberId),
    queryFn: () => getMember(memberId),
    enabled: !!memberId,
    ...DEFAULT_QUERY_OPTIONS,
  });
};
