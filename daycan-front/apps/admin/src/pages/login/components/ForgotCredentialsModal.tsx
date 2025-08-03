import { Modal, Button, Heading, COLORS } from "@daycan/ui";

interface ForgotCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotCredentialsModal = ({
  isOpen,
  onClose,
}: ForgotCredentialsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} position="top">
      <div style={{ textAlign: "center" }}>
        <Heading
          type="xsmall"
          weight={600}
          style={{ color: COLORS.gray[900], marginBottom: "24px" }}
        >
          아이디・비밀번호 찾기를 원하신다면 02-1111-1111로 문의해 주세요
        </Heading>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" size="small" onClick={onClose}>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};
