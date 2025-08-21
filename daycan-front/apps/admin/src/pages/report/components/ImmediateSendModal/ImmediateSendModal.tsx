import { Body, Button, COLORS, Heading, Modal } from "@daycan/ui";
import {
  immediateSendModalContainer,
  immediateSendModalButtonContainer,
} from "./ImmediateSendModal.css";

interface ImmediateSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
}

export const ImmediateSendModal = ({
  isOpen,
  onClose,
  onSend,
}: ImmediateSendModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={immediateSendModalContainer}>
        <Heading type="xsmall">검토 완료한 리포트를 전송할까요?</Heading>
        <Body type="medium" weight={400} color={COLORS.gray[600]}>
          검토하지 않은 리포트는 전송되지 않아요.
        </Body>
        <div className={immediateSendModalButtonContainer}>
          <Button
            variant="unEmphasized"
            size="small"
            style={{
              width: 160,
              height: 52,
            }}
            onClick={onClose}
          >
            마저 검토하기
          </Button>
          <Button
            variant="primary"
            size="small"
            style={{
              width: 160,
              height: 52,
            }}
            onClick={onSend}
          >
            전송
          </Button>
        </div>
      </div>
    </Modal>
  );
};
