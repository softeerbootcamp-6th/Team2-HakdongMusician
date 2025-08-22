import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendReport, reviewReport } from ".";
import type { TReportEditRequest, TSendReportParams } from "./types";
import { reportKeys } from "./useReportQuery";

/**
 * 리포트 전송 뮤테이션
 * @author 홍규진
 */
export const useSendReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberIds, sendDate, sendTime }: TSendReportParams) =>
      sendReport(memberIds, sendDate, sendTime),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reportKeys.all,
      });
    },
    meta: { successMessage: "리포트 전송 완료" },
  });
};

/**
 * 리포트 검토 뮤테이션
 * @author 홍규진
 */
export const useReviewReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reportId,
      editRequest,
    }: {
      reportId: number;
      editRequest: TReportEditRequest;
    }) => reviewReport(reportId, editRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reportKeys.all,
      });
    },
    meta: { successMessage: "리포트 검토 완료" },
  });
};
