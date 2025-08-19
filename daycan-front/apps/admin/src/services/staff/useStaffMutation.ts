import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStaff, deleteStaff, updateStaff } from ".";
import { STAFF_QUERY_KEY } from "./useStaffQuery";
import type { TStaffPatchRequest } from "./types";

/**
 * 직원 생성 뮤테이션
 * @returns 직원 생성 뮤테이션
 * @author 홍규진
 */
export const useStaffCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STAFF_QUERY_KEY.list() });
    },
  });
};

/**
 * 직원 정보 수정 뮤테이션
 * @returns 직원 수정 뮤테이션
 * @author 홍규진
 */
export const useStaffUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      staffId,
      staff,
    }: {
      staffId: number;
      staff: TStaffPatchRequest;
    }) => updateStaff(staffId, staff),
    onSuccess: (_, { staffId }) => {
      queryClient.invalidateQueries({ queryKey: STAFF_QUERY_KEY.list() });
      queryClient.invalidateQueries({
        queryKey: STAFF_QUERY_KEY.detail(staffId),
      });
    },
  });
};

export const useStaffDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (staffId: number) => deleteStaff(staffId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STAFF_QUERY_KEY.list() });
    },
  });
};
