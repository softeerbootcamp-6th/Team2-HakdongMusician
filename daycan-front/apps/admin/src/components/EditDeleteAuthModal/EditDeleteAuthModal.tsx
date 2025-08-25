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
import { useReAuthMutation } from "@/services/auth/useAdminAuthMutation";

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
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const reAuthMutation = useReAuthMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password.trim()) {
      setIsError(true);
      return;
    }

    try {
      // TODO: 실제 인증 API 호출
      // const response = await authenticateUser(centerId, password);
      await reAuthMutation.mutateAsync(password);

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
    setPassword("");
    setIsError(false);
    onClose();
  };

  const handleCancel = () => {
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
      title="센터 비밀번호를 입력해 주세요."
    >
      <div className={editAuthModalContent}>
        <form
          className={editAuthModalForm}
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && password.trim()) {
              e.preventDefault();
              handleSubmit(e as any);
            }
          }}
        >
          <div className={editAuthModalFormHeader}>
            <Heading type="xsmall" weight={600}>
              센터 비밀번호를 입력해 주세요.
            </Heading>
            <Body type="medium" weight={400} color={COLORS.gray[600]}>
              정보를 수정하거나 삭제할 때는 계정 확인이 필요해요
            </Body>
          </div>
          <div className={editAuthModalFormBody}>
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
                message="비밀번호가 잘못되었어요. 다시 입력해 주세요."
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
            <Button disabled={!password.trim()} size="fullWidth" type="submit">
              {"확인"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
