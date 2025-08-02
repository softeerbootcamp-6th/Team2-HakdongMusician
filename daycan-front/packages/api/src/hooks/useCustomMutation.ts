import { QueryClient, useMutation } from "@tanstack/react-query";

/**
 * 커스텀 Mutation 훅 입니다.
 * 커스텀 Mutation 훅은 Mutation 키와 Mutation 함수를 인자로 받아서 Mutation을 실행합니다.
 * @author 홍규진
 */
export const queryClient = new QueryClient();

export const useCustomMutation = (
  mutationKey: unknown[],
  invalidateQueries: unknown[],
  mutationFn: () => Promise<any>,
) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: mutationKey,
    mutationFn: mutationFn,
    onSuccess: () => {
      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
    },
  });

  return { mutate, isPending, error };
};
