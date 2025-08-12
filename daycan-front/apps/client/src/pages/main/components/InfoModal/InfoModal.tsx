import { Body, Button, Chip, COLORS, Modal } from "@daycan/ui";
import {
  infoModalContent,
  pointCalculateContainer,
  pointCalculateItem,
} from "./InfoModal.css";
interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={infoModalContent}>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          이번 주 평균 건강 지수란?
        </Body>
        <Body
          type="small"
          weight={400}
          style={{ color: COLORS.gray[600], whiteSpace: "pre-line" }}
        >
          {`이번 주 건강 지수의 평균값을 보여줘요.\n\n월요일에는 월요일의 건강 지수만 표시되고, 금요일에는 월요일부터 금요일까지의 건강 지수를 모두 평균내어 표시돼요.`}
        </Body>
        <div className={pointCalculateContainer}>
          <div className={pointCalculateItem}>
            <Body type="xsmall" weight={400} color={COLORS.gray[600]}>
              80점 이상
            </Body>
            <Chip
              style={{
                backgroundColor: COLORS.green[200],
                padding: "8px 4px",
                color: COLORS.green[500],
              }}
            >
              안정
            </Chip>
          </div>
          <div className={pointCalculateItem}>
            <Body type="xsmall" weight={400} color={COLORS.gray[600]}>
              50~79점
            </Body>
            <Chip
              style={{
                backgroundColor: COLORS.yellow[200],
                padding: "8px 4px",
                color: COLORS.yellow[500],
              }}
            >
              보통
            </Chip>
          </div>
          <div className={pointCalculateItem}>
            <Body type="xsmall" weight={400} color={COLORS.gray[600]}>
              49점 이하
            </Body>
            <Chip
              style={{
                backgroundColor: COLORS.red[200],
                padding: "8px 4px",
                color: COLORS.red[500],
              }}
            >
              주의
            </Chip>
          </div>
        </div>

        <Button size="fullWidth" variant="primary" onClick={onClose}>
          확인
        </Button>
      </div>
    </Modal>
  );
};
