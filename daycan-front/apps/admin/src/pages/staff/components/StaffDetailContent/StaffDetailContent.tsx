import { Body, Button, Heading, COLORS } from "@daycan/ui";
import {
  staffListItemExpandedContainer,
  editButton,
  staffListItemExpandedInfoHeader,
  staffListItemExpandedInfoContainer,
  staffListItemExpandedButtonContainer,
  staffListItemExpandedInfoAvatar,
  staffListItemExpandedInfoContent,
  staffListItemExpandedInfoContentDetail,
  staffInfoGrid,
} from "./StaffDetailContent.css";
import elder from "@/assets/images/elder.png";
import { formatBirthDate, formatGender, formatStaffRole } from "@/utils";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal/index.ts";
import { EditDeleteAuthModal } from "@/components/EditDeleteAuthModal/EditDeleteAuthModal";
import { useStaffModal } from "@/pages/staff/hooks/useStaffModal";
import type { TStaff } from "@/services/staff/types";
import { useNavigate } from "react-router-dom";

interface StaffDetailContentProps {
  staff: TStaff;
}

export const StaffDetailContent = ({ staff }: StaffDetailContentProps) => {
  const navigate = useNavigate();
  const {
    isDeleteModalOpen,
    isDeleteAuthModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteAuthModal,
    handleCloseDeleteAuthModal,
    handleDeleteConfirm,
    handleDeleteAccessConfirm,
  } = useStaffModal(staff);

  // 수정 버튼 클릭 시 바로 수정 페이지로 이동
  const handleEditButtonClick = () => {
    navigate(`/staff/edit/${staff.staffId}`);
  };

  return (
    <div className={staffListItemExpandedContainer}>
      <div className={staffListItemExpandedInfoContainer}>
        <div className={staffListItemExpandedInfoHeader}>
          <Body type="small" weight={600} color={COLORS.gray[800]}>
            종사자 정보
          </Body>
          <div className={staffListItemExpandedInfoContent}>
            <img
              src={staff.avatarUrl || elder}
              alt="avatar"
              className={staffListItemExpandedInfoAvatar}
            />
            <div className={staffListItemExpandedInfoContentDetail}>
              <Heading type="xsmall" weight={600} color={COLORS.gray[800]}>
                {staff.name}
              </Heading>
              <div className={staffInfoGrid}>
                <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
                  성별
                </Body>
                <Body type="xsmall" weight={500} color={COLORS.gray[800]}>
                  {formatGender(staff.gender)}
                </Body>
                <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
                  생년월일
                </Body>
                <Body type="xsmall" weight={500} color={COLORS.gray[800]}>
                  {formatBirthDate(staff.birthDate)}
                </Body>

                <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
                  연락처
                </Body>
                <Body type="xsmall" weight={500} color={COLORS.gray[800]}>
                  {staff.phoneNumber}
                </Body>
                <Body type="xsmall" weight={500} color={COLORS.gray[500]}>
                  직무
                </Body>
                <Body type="xsmall" weight={500} color={COLORS.gray[800]}>
                  {formatStaffRole(staff.staffRole)}
                </Body>
              </div>
            </div>
          </div>
        </div>
        <div className={staffListItemExpandedButtonContainer}>
          <Button
            size="small"
            className={editButton}
            onClick={handleEditButtonClick}
          >
            수정
          </Button>
          <Button
            variant="error"
            size="small"
            style={{ width: "58px", height: "32px" }}
            onClick={handleOpenDeleteAuthModal}
          >
            삭제
          </Button>
        </div>
      </div>

      {/* 삭제 인증 모달 */}
      <EditDeleteAuthModal
        isOpen={isDeleteAuthModalOpen}
        onClose={handleCloseDeleteAuthModal}
        onDeleteAccessConfirm={handleDeleteAccessConfirm}
        unitId={staff.staffId}
        actionType="delete"
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDeleteConfirm={handleDeleteConfirm}
        unitName={staff.name}
      />
    </div>
  );
};
