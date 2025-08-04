import { useSuspenseQuery } from "@tanstack/react-query";

/**
 * 커스텀 Suspense 쿼리 훅 입니다.
 * 커스텀 Suspense 쿼리 훅은 쿼리 키와 쿼리 함수를 인자로 받아서 쿼리를 실행합니다.
 * T 타입을 반환합니다.
 * @author 홍규진
 */
export const useCustomSuspenseQuery = <T>(
  queryKey: unknown[],
  queryFn: () => Promise<T>
) => {
  const { data, error, refetch } = useSuspenseQuery<T>({
    queryKey: queryKey,
    queryFn: queryFn,
  });

  return { data, error, refetch };
};
