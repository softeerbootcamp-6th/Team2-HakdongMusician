import { Body, Button, COLORS, Modal } from "@daycan/ui";
import { dailyReportModalContent } from "./DailyReportModal.css";

interface DailyReportModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onAgain?: () => void;
}

export const DailyReportModal = ({
  isOpen,
  title,
  content,
  onClose,
  onAgain,
}: DailyReportModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={dailyReportModalContent}>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          {title}
        </Body>
        <Body
          type="small"
          weight={400}
          style={{ color: COLORS.gray[600], whiteSpace: "pre-line" }}
        >
          {content}
        </Body>

        {onAgain && (
          <Button size="fullWidth" variant="unEmphasized" onClick={onAgain}>
            다시 보기
          </Button>
        )}

        <Button size="fullWidth" variant="primary" onClick={onClose}>
          확인
        </Button>
      </div>
    </Modal>
  );
};
