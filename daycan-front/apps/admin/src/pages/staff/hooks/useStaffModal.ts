import { useState } from "react";
import type { TStaff } from "@/services/staff/types";
import { useStaffDeleteMutation } from "@/services/staff/useStaffMutation";

/*
 * useStaffModal 커스텀 훅은
 * 종사자 상세보기 버튼을 눌렀을때 나오는 내용에서
 * 수정과 삭제버튼을 눌렀을때 모달 상태와 핸들러를 관리하는 훅입니다.
 * @author 소보길
 */
export const useStaffModal = (staff: TStaff) => {
  //모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteAuthModalOpen, setIsDeleteAuthModalOpen] = useState(false);
  const { mutate: deleteStaff } = useStaffDeleteMutation();
  //모달 핸들러
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteAuthModal = () => {
    setIsDeleteAuthModalOpen(true);
  };

  const handleCloseDeleteAuthModal = () => {
    setIsDeleteAuthModalOpen(false);
  };

  const handleDeleteAccessConfirm = () => {
    setIsDeleteAuthModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);

    //TODO: 삭제 로직 추가
    deleteStaff(staff.staffId);
  };

  return {
    isDeleteModalOpen,
    isDeleteAuthModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteAuthModal,
    handleCloseDeleteAuthModal,
    handleDeleteConfirm,
    handleDeleteAccessConfirm,
  };
};
