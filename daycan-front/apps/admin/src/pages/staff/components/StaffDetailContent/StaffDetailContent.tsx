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
import { EditAuthModal } from "@/components/EditAuthModal/EditAuthModal";
import type { StaffListResponse } from "@/pages/staff-register/constants/staff";
import { useStaffModal } from "@/pages/staff/hooks/useStaffModal";

interface StaffDetailContentProps {
  staff: StaffListResponse;
}

export const StaffDetailContent = ({ staff }: StaffDetailContentProps) => {
  const {
    isDeleteModalOpen,
    isEditModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleCloseEditModal,
    handleOpenEditModal,
    handleDeleteConfirm,
    handleEditAccessConfirm,
  } = useStaffModal(staff);

  return (
    <div className={staffListItemExpandedContainer}>
      <div className={staffListItemExpandedInfoContainer}>
        <div className={staffListItemExpandedInfoHeader}>
          <Body type="small" weight={600} color={COLORS.gray[800]}>
            종사자 정보
          </Body>
          <div className={staffListItemExpandedInfoContent}>
            <img
              src={elder}
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
            onClick={handleOpenEditModal}
          >
            수정
          </Button>
          <Button
            variant="error"
            size="small"
            style={{ width: "58px", height: "32px" }}
            onClick={handleOpenDeleteModal}
          >
            삭제
          </Button>
        </div>
      </div>

      <EditAuthModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEditAccessConfirm={handleEditAccessConfirm}
        unitId={staff.staffId.toString()}
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
