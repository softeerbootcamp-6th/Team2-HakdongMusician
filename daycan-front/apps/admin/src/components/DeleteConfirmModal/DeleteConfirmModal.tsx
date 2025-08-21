import { Body, Button, Heading, Modal } from "@daycan/ui";
import {
  deleteConfirmModalContainer,
  deleteConfirmModalTitle,
  deleteConfirmModalContent,
  deleteConfirmModalButton,
} from "./DeleteConfirmModal.css";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteConfirm: () => void;
  unitName: string;
}

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onDeleteConfirm,
  unitName,
}: DeleteConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={deleteConfirmModalContainer}>
        <div className={deleteConfirmModalTitle}>
          <Heading type="xsmall" weight={600}>
            정말 {unitName}님의 정보를 삭제하시겠어요?
          </Heading>
          <Body type="medium" weight={400}>
            삭제하면 모든 기록이 사라지며 복구할 수 없어요.
          </Body>
        </div>
        <div className={deleteConfirmModalContent}>
          <div className={deleteConfirmModalButton}>
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
