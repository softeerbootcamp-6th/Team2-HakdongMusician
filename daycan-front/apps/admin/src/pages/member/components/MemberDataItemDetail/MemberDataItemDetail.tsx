import { Button, COLORS, Icon } from "@daycan/ui";
import {
  memberDataItemDetailContainer,
  memberDataItemDetailContent,
  memberDataItemDetailCardContainer,
  memberDataItemDetailButtonContainer,
  memberDataItemDetailTopButton,
  memberDataItemDetailBottomButton,
  editButton,
} from "./MemberDataItemDetail.css";
import { useState } from "react";
import { HistoryModal } from "../HistoryModal/HistoryModal";

interface MemberDataItemDetailProps {
  detailCard?: React.ReactNode;
  memberId: string;
  onEditButtonClick: (memberId: string) => void;
  onDeleteButtonClick: (memberId: string) => void;
}

export const MemberDataItemDetail = ({
  detailCard,
  memberId,
  onEditButtonClick,
  onDeleteButtonClick,
}: MemberDataItemDetailProps) => {
  // 수정 버튼 클릭 시 부모 컴포넌트로 이벤트 전달
  const handleEditClick = () => {
    onEditButtonClick(memberId);
  };

  // 삭제 버튼 클릭 시 부모 컴포넌트로 이벤트 전달
  const handleDeleteClick = () => {
    onDeleteButtonClick(memberId);
  };
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  return (
    <div className={memberDataItemDetailContainer}>
      <div className={memberDataItemDetailContent}>
        <div className={memberDataItemDetailCardContainer}>{detailCard}</div>

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
              onClick={handleEditClick}
              className={editButton}
            >
              수정
            </Button>
            <Button
              variant="error"
              size="small"
              style={{ width: "58px", height: "32px" }}
              onClick={handleDeleteClick}
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
    </div>
  );
};
