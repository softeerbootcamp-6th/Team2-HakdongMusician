import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendReport, reviewReport } from ".";
import { reportKeys } from "./useReportQuery";

/**
 * 리포트 전송 뮤테이션
 * @author 홍규진
 */
export const useSendReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reportId: number) => sendReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reportKeys.all,
      });
    },
  });
};

/**
 * 리포트 검토 뮤테이션
 * @author 홍규진
 */
export const useReviewReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reportId: number) => reviewReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reportKeys.all,
      });
    },
  });
};
