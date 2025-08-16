import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  TCareSheetAttendanceRequest,
  TCareSheetWriteRequest,
} from "./types";
import { updateCareSheetAttendance, writeCareSheet } from ".";
import { careSheetKeys } from "./useCareSheetQuery";

/**
 * 케어시트를 작성하는 훅
 * @author 홍규진
 */
export const useWriteCareSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: TCareSheetWriteRequest) =>
      await writeCareSheet(request),
    onSuccess: (_, request) => {
      // 해당 날짜와 수급자의 케어시트 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: careSheetKeys.detail(request.date, request.memberId),
      });
      queryClient.invalidateQueries({
        queryKey: careSheetKeys.list(request.date, request.memberId),
      });
    },
  });
};

/**
 * 케어시트 출결을 업데이트하는 훅
 * @author 홍규진
 */
export const useUpdateCareSheetAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: TCareSheetAttendanceRequest) =>
      await updateCareSheetAttendance(request),
    onSuccess: (_, request) => {
      // 해당 날짜의 모든 관련 수급자 케어시트 캐시 무효화
      request.memberIds.forEach((memberId) => {
        queryClient.invalidateQueries({
          queryKey: careSheetKeys.detail(request.date, memberId),
        });
        queryClient.invalidateQueries({
          queryKey: careSheetKeys.list(request.date, memberId),
        });
      });
    },
  });
};
