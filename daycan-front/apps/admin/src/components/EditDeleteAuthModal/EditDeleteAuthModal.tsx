import { Modal, Input, Button, Heading, Body, COLORS } from "@daycan/ui";
import { useState } from "react";
import {
  editAuthModalContent,
  editAuthModalForm,
  editAuthModalButton,
  editAuthModalFormHeader,
  editAuthModalFormBody,
  editAuthModalErrorMessage,
} from "./EditDeleteAuthModal.css";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useAdminLoginMutation } from "@/services/auth/useAdminAuthMutation";
import { showToast } from "@/utils/toastUtils";

/* 
  unitId: memberId, staffId를 포괄적으로 사용하기 위한 Id
  actionType: 'edit' | 'delete' - 수정인지 삭제인지 구분
*/

interface EditDeleteAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditAccessConfirm?: (unitId: number) => void;
  onDeleteAccessConfirm?: (unitId: number) => void;
  onCancel?: () => void; // 취소 시 리다이렉팅을 위한 콜백
  unitId: number;
  actionType: "edit" | "delete";
}

export const EditDeleteAuthModal = ({
  isOpen,
  onClose,
  onEditAccessConfirm,
  onDeleteAccessConfirm,
  onCancel,
  unitId,
  actionType,
}: EditDeleteAuthModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const loginMutation = useAdminLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setIsError(true);
      return;
    }

    try {
      // TODO: 실제 인증 API 호출
      // const response = await authenticateUser(centerId, password);
      await loginMutation.mutateAsync(
        {
          username,
          password,
        },
        {
          onSuccess: () => {
            showToast({
              message: "인증이 완료되었습니다.",
              type: "success",
            });
          },
        }
      );

      // 인증 성공 후 actionType에 따라 다른 콜백 호출
      if (actionType === "edit" && onEditAccessConfirm) {
        onEditAccessConfirm(unitId);
      } else if (actionType === "delete" && onDeleteAccessConfirm) {
        onDeleteAccessConfirm(unitId);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setIsError(false);
    onClose();
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setIsError(false);
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="센터 아이디와 비밀번호를 입력해 주세요."
    >
      <div className={editAuthModalContent}>
        <form className={editAuthModalForm} onSubmit={handleSubmit}>
          <div className={editAuthModalFormHeader}>
            <Heading type="xsmall" weight={600}>
              센터 아이디와 비밀번호를 입력해 주세요.
            </Heading>
            <Body type="medium" weight={400} color={COLORS.gray[600]}>
              정보를 수정하거나 삭제할 때는 계정 확인이 필요해요
            </Body>
          </div>
          <div className={editAuthModalFormBody}>
            <Input
              type="text"
              inputSize="pcTextFieldLarge"
              placeholder="아이디"
              variant="grayLight"
              value={username}
              fontSize="large"
              color={COLORS.gray[500]}
              onChange={(e) => setUsername(e.target.value)}
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
            <div className={editAuthModalErrorMessage}>
              <ErrorMessage
                message="아이디 또는 비밀번호가 잘못되었어요. 다시 입력해 주세요."
                isVisible={isError}
              />
            </div>
          </div>

          <div className={editAuthModalButton}>
            <Button
              variant="unEmphasized"
              onClick={handleCancel}
              size="fullWidth"
            >
              취소
            </Button>
            <Button
              disabled={!username.trim() || !password.trim()}
              size="fullWidth"
              type="submit"
            >
              {"확인"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
