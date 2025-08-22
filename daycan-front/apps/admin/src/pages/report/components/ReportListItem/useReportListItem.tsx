import { useToast } from "@daycan/ui";
import type { TReportStatus } from "@/services/report/types";

interface UseReportListItemProps {
  onReviewRequest?: (memberId: number, reportId: number) => void;
}

export const useReportListItem = ({
  onReviewRequest,
}: UseReportListItemProps = {}) => {
  const { showToast } = useToast();

  /**
   * 리포트 상태 버튼 클릭 시 토스트 메시지 출력
   * 리포트 상태마다 토스트 메시지 출력 내용이 다름
   * @author 홍규진
   */
  const handleReportStatusButtonClick = (
    status: TReportStatus,
    memberId: number,
    reportId: number
  ) => {
    switch (status) {
      case "NOT_APPLICABLE":
        showToast({
          data: {
            message: "출석을 안 하셔서, 검토 불가능한 리포트입니다.",
            type: "error",
            variant: "pc",
          },
          autoClose: 1000,
        });
        break;
      case "PENDING":
        showToast({
          data: {
            message: "AI 가 리포트를 생성중이예요. 잠시 후 다시 시도해주세요.",
            type: "error",
            variant: "pc",
          },
          autoClose: 1000,
        });
        break;
      case "CREATED":
        // 검토 로직
        if (onReviewRequest) {
          onReviewRequest(memberId, reportId);
        }
        break;
      case "REVIEWED":
        showToast({
          data: {
            message: "검토 완료, 체크 후 전송을 눌러 보호자분께 전송해보세요!",
            type: "success",
            variant: "pc",
          },
          autoClose: 1000,
        });
        break;
      case "SENDING":
        showToast({
          data: {
            message: "이미 보호자분께 전송된 리포트입니다!",
            type: "success",
            variant: "pc",
          },
          autoClose: 1000,
        });
        break;
      case "RESERVED":
        showToast({
          data: {
            message: "이미 전송이 예약된 리포트입니다!",
            type: "success",
            variant: "pc",
          },
          autoClose: 1000,
        });
        break;
      case "DONE":
        showToast({
          data: {
            message: "전송 완료됐습니다!",
            type: "success",
            variant: "mobile",
          },
          autoClose: 1000,
        });
        break;
      default:
        break;
    }
  };

  return {
    handleReportStatusButtonClick,
  };
};
