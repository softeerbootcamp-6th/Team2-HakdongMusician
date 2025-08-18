import { Body, Button, COLORS, Modal } from "@daycan/ui";
import { dailyReportModalContent } from "./DailyReportModal.css";

interface DailyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const DailyReportModal = ({
  isOpen,
  onClose,
}: DailyReportModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={dailyReportModalContent}>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          이미 데일리 리포트를 확인했어요!
        </Body>
        <Body
          type="small"
          weight={400}
          style={{ color: COLORS.gray[600], whiteSpace: "pre-line" }}
        >
          {`\n오늘 데일리 리포트를 확인하셨다면, 그 날의 리포트는 하단의, 리포트 모아보기 버튼을 통해 확인할 수 있어요.`}
        </Body>

        <Button size="fullWidth" variant="primary" onClick={onClose}>
          확인
        </Button>
      </div>
    </Modal>
  );
};
