import { Modal } from "@daycan/ui";
import { fullScreenCardModal } from "./FullScreenCardModal.css";

interface FullScreenCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const FullScreenCardModal = ({
  isOpen,
  onClose,
  children,
}: FullScreenCardModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={fullScreenCardModal}>{children}</div>
    </Modal>
  );
};
