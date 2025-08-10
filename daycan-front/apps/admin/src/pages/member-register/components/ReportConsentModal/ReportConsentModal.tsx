import { Heading, Modal } from "@daycan/ui";

interface ReportConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportConsentModal = ({
  isOpen,
  onClose,
}: ReportConsentModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading type="large" weight={600} style={{ marginBottom: 24 }}>
        리포트 수신 동의 관련 약관 어쩌구 저쩌구~~
      </Heading>
    </Modal>
  );
};
