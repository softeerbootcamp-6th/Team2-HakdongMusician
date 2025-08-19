import { Button, COLORS, Icon } from "@daycan/ui";
import {
  memberDataItemDetailContent,
  memberDataItemDetailCardContainer,
  memberDataItemDetailButtonContainer,
  memberDataItemDetailTopButton,
  memberDataItemDetailBottomButton,
  editButton,
  memberDataItemDetailContainer,
} from "./MemberDataItemDetail.css";
import { useState } from "react";
import { HistoryModal } from "../HistoryModal/HistoryModal";
import { EditDeleteAuthModal, DeleteConfirmModal } from "@/components/index";
import type { TMember } from "@/services/member/types";
import { useNavigate } from "react-router-dom";
import { useDeleteMemberMutation } from "@/services/member/useMemberMutation";

interface MemberDataItemDetailProps {
  children?: React.ReactNode;
  renderContent?: (member: TMember) => React.ReactNode;
  memberId: number;
  member: TMember;
}

export const MemberDataItemDetail = ({
  children,
  renderContent,
  memberId,
  member,
}: MemberDataItemDetailProps) => {
  const navigate = useNavigate();
  //모달 상태
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isDeleteAuthModalOpen, setIsDeleteAuthModalOpen] = useState(false);
  const [isMemberDeleteConfirmModalOpen, setIsMemberDeleteConfirmModalOpen] =
    useState(false);

  const { mutate: deleteMember } = useDeleteMemberMutation();

  // 수정 버튼 클릭 시 바로 수정 페이지로 이동
  const handleEditButtonClick = () => {
    navigate(`/member/edit/${memberId}`);
  };

  // 삭제 버튼 클릭 시 인증 모달 열기
  const handleDeleteButtonClick = () => {
    setIsDeleteAuthModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsMemberDeleteConfirmModalOpen(false);
  };

  const handleCloseDeleteAuthModal = () => {
    setIsDeleteAuthModalOpen(false);
  };

  // 삭제 확인 시 처리
  const handleDeleteConfirm = () => {
    setIsMemberDeleteConfirmModalOpen(false);
    deleteMember(memberId);
  };

  // 삭제 인증 성공 시 처리
  const handleDeleteAccessConfirm = () => {
    setIsDeleteAuthModalOpen(false);
    setIsMemberDeleteConfirmModalOpen(true);
  };

  return (
    <div className={memberDataItemDetailContent}>
      <div className={memberDataItemDetailContainer}>
        <div className={memberDataItemDetailCardContainer}>
          {children || (renderContent && renderContent(member))}
        </div>

        <div className={memberDataItemDetailButtonContainer}>
          <div className={memberDataItemDetailTopButton}>
            <Button
              size="fullWidth"
              style={{ backgroundColor: COLORS.gray[600], color: COLORS.white }}
              onClick={() => setIsHistoryModalOpen(true)}
            >
              기록지 및 리포트 내역
              <Icon
                name="arrowRight"
                stroke="currentColor"
                color={COLORS.gray[600]}
              />
            </Button>
          </div>
          <div className={memberDataItemDetailBottomButton}>
            <Button
              size="small"
              onClick={handleEditButtonClick}
              className={editButton}
            >
              수정
            </Button>
            <Button
              variant="error"
              size="small"
              style={{ width: "58px", height: "32px" }}
              onClick={handleDeleteButtonClick}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>

      <HistoryModal
        memberId={memberId}
        memberName={member.name}
        memberProfileImage={member.avatarUrl}
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />

      {/* 삭제 인증 모달 */}
      <EditDeleteAuthModal
        isOpen={isDeleteAuthModalOpen}
        onClose={handleCloseDeleteAuthModal}
        onDeleteAccessConfirm={handleDeleteAccessConfirm}
        unitId={memberId}
        actionType="delete"
      />

      <DeleteConfirmModal
        isOpen={isMemberDeleteConfirmModalOpen}
        onClose={handleCloseDeleteModal}
        onDeleteConfirm={handleDeleteConfirm}
        unitName={member.name}
      />
    </div>
  );
};
