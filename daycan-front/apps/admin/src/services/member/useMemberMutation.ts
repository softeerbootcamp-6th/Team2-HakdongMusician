import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMember, deleteMember, updateMember } from ".";
import type { TMemberCreateRequest, TmemberPatchRequest } from "./types";
import { memberKeys } from "./useMemberQuery";

/**
 * 수급자 생성 뮤테이션
 * @author 홍규진
 */
export const useCreateMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TMemberCreateRequest) => await createMember(data),
    onSuccess: () => {
      // 수급자 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
    },
  });
};

/**
 * 수급자 수정 뮤테이션
 * @author 홍규진
 */
export const useUpdateMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: TmemberPatchRequest;
    }) => {
      return await updateMember(id, data);
    },
    onSuccess: (_, { id }) => {
      // 해당 수급자와 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: memberKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
    },
  });
};

/**
 * 수급자 정보를 삭제하는 훅
 * @author 홍규진
 */
export const useDeleteMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await deleteMember(id),
    onSuccess: () => {
      // 수급자 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
    },
  });
};
