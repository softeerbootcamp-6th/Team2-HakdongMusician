import { Body, Button, Heading, Modal } from "@daycan/ui";
import {
  memberDeleteConfirmModalContainer,
  memberDeleteConfirmModalTitle,
  memberDeleteConfirmModalContent,
  memberDeleteConfirmModalButton,
} from "./MemberDeleteConfirmModal.css";

interface MemberDeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteConfirm: () => void;
}

export const MemberDeleteConfirmModal = ({
  isOpen,
  onClose,
  onDeleteConfirm,
}: MemberDeleteConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={memberDeleteConfirmModalContainer}>
        <div className={memberDeleteConfirmModalTitle}>
          <Heading type="xsmall" weight={600}>
            정말 김노인 님의 정보를 삭제하시겠어요?
          </Heading>
          <Body type="medium" weight={400}>
            삭제하면 모든 기록이 사라지며 복구할 수 없어요.
          </Body>
        </div>
        <div className={memberDeleteConfirmModalContent}>
          <div className={memberDeleteConfirmModalButton}>
            <Button variant="unEmphasized" onClick={onClose} size="fullWidth">
              닫기
            </Button>
            <Button size="fullWidth" variant="error" onClick={onDeleteConfirm}>
              삭제
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
