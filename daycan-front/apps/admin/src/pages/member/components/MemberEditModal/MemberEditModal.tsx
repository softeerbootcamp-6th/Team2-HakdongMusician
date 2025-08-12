import { Modal, Input, Button, Heading, Body, COLORS } from "@daycan/ui";
import { useState } from "react";
import {
  memberEditModalContent,
  memberEditModalForm,
  memberEditModalButton,
  memberEditModalFormHeader,
  memberEditModalFormBody,
  memberEditModalErrorMessage,
} from "./MemberEditModal.css";
import { ErrorMessage } from "@/components/ErrorMessage";

interface MemberEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditSuccess: (memberId: string) => void;
  memberId: string;
}

export const MemberEditModal = ({
  isOpen,
  onClose,
  onEditSuccess,
  memberId,
}: MemberEditModalProps) => {
  const [centerId, setCenterId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!centerId.trim() || !password.trim()) {
      console.log("센터 아이디와 비밀번호를 모두 입력해주세요.");
      setIsError(true);
      return;
    }

    setIsLoading(true);

    try {
      // TODO: 실제 인증 API 호출
      // const response = await authenticateUser(centerId, password);
      if (centerId === "test" && password === "test") {
        setIsLoading(false);
        onEditSuccess(memberId);
      } else {
        throw new Error(
          "인증에 실패했습니다. 아이디와 비밀번호를 확인해주세요."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const handleClose = () => {
    setCenterId("");
    setPassword("");
    setIsError(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="센터 아이디와 비밀번호를 입력해 주세요."
    >
      <div className={memberEditModalContent}>
        <form className={memberEditModalForm} onSubmit={handleSubmit}>
          <div className={memberEditModalFormHeader}>
            <Heading type="xsmall" weight={600}>
              센터 아이디와 비밀번호를 입력해 주세요.
            </Heading>
            <Body type="medium" weight={400} color={COLORS.gray[600]}>
              정보를 수정하거나 삭제할 때는 계정 확인이 필요해요
            </Body>
          </div>
          <div className={memberEditModalFormBody}>
            <Input
              inputSize="pcTextFieldLarge"
              placeholder="아이디"
              variant="grayLight"
              value={centerId}
              fontSize="large"
              color={COLORS.gray[500]}
              onChange={(e) => setCenterId(e.target.value)}
            />

            <Input
              inputSize="pcTextFieldLarge"
              type="password"
              variant="grayLight"
              placeholder="비밀번호"
              value={password}
              fontSize="large"
              color={COLORS.gray[500]}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={memberEditModalErrorMessage}>
              <ErrorMessage
                message="아이디 또는 비밀번호가 잘못되었어요. 다시 입력해 주세요."
                isVisible={isError}
              />
            </div>
          </div>

          <div className={memberEditModalButton}>
            <Button
              variant="unEmphasized"
              onClick={handleClose}
              size="fullWidth"
            >
              취소
            </Button>
            <Button
              disabled={isLoading || !centerId.trim() || !password.trim()}
              size="fullWidth"
            >
              {isLoading ? "인증 중..." : "확인"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
