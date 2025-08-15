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
import { EditAuthModal, DeleteConfirmModal } from "@/components/index";
import type { MemberData } from "@/pages/member/constants/member";
import { useNavigate } from "react-router-dom";

interface MemberDataItemDetailProps {
  children?: React.ReactNode;
  renderContent?: (member: MemberData) => React.ReactNode;
  memberId: string;
  member: MemberData;
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
  const [isMemberEditAuthModalOpen, setIsMemberEditAuthModalOpen] =
    useState(false);
  const [isMemberDeleteConfirmModalOpen, setIsMemberDeleteConfirmModalOpen] =
    useState(false);

  // 수정 버튼 클릭 시 모달 열기
  const handleEditButtonClick = () => {
    setIsMemberEditAuthModalOpen(true);
  };

  // 삭제 버튼 클릭 시 모달 열기
  const handleDeleteButtonClick = () => {
    setIsMemberDeleteConfirmModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsMemberDeleteConfirmModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsMemberEditAuthModalOpen(false);
  };

  // 삭제 확인 시 처리
  const handleDeleteConfirm = () => {
    setIsMemberDeleteConfirmModalOpen(false);
    // TODO: 삭제 API 호출
    console.log("delete member", memberId);
  };

  const handleEditAccessConfirm = () => {
    setIsMemberEditAuthModalOpen(false);

    navigate(`/member/edit/${memberId}`);
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
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />

      <EditAuthModal
        isOpen={isMemberEditAuthModalOpen}
        onClose={handleCloseEditModal}
        onEditAccessConfirm={handleEditAccessConfirm}
        unitId={memberId}
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
