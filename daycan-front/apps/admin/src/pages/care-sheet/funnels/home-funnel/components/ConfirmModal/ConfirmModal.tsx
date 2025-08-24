import { Modal, Button, Body, Heading, COLORS } from "@daycan/ui";
import {
  confirmModalContainer,
  confirmModalContent,
  confirmModalActions,
  confirmModalInfo,
  confirmModalInfoItem,
  confirmModalInfoLabel,
  confirmModalInfoValue,
} from "./ConfirmModal.css";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCloseClick: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  infoItems?: Array<{ label: string; value: string | number }>;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onCloseClick,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  infoItems = [],
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={confirmModalContainer}>
        <div className={confirmModalContent}>
          <Heading type="small" weight={600} color={COLORS.gray[800]}>
            {title}
          </Heading>
          <Body type="medium" color={COLORS.gray[600]}>
            {message}
          </Body>

          {/* 정보 아이템들 */}
          {infoItems.length > 0 && (
            <div className={confirmModalInfo}>
              {infoItems.map((item, index) => (
                <div key={index} className={confirmModalInfoItem}>
                  <span className={confirmModalInfoLabel}>{item.label}</span>
                  <span className={confirmModalInfoValue}>{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={confirmModalActions}>
          <Button
            variant="unEmphasized"
            size="fullWidth"
            onClick={onCloseClick}
          >
            {cancelText}
          </Button>
          <Button variant="primary" size="fullWidth" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
