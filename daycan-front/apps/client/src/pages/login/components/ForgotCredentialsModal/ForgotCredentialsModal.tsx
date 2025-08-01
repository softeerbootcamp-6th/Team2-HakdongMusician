import { Body, Button, COLORS, Modal } from "@daycan/ui";
import { modalContent } from "./ForgotCredentialsModal.css";

export const ForgotCredentialsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      title="장기요양인정번호・비밀번호 찾기를 원하신다면 센터로 문의해 주세요"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={modalContent}>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          장기요양인정번호・비밀번호 찾기를 원하신다면 센터로 문의해 주세요
        </Body>
        <Button size="fullWidth" variant="primary" onClick={onClose}>
          확인
        </Button>
      </div>
    </Modal>
  );
};
