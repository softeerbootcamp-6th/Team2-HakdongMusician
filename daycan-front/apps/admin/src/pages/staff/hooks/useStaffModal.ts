import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { StaffListResponse } from "@/pages/staff-register/constants/staff";

/*
 * useStaffModal 커스텀 훅은
 * 종사자 상세보기 버튼을 눌렀을때 나오는 내용에서
 * 수정과 삭제버튼을 눌렀을때 모달 상태와 핸들러를 관리하는 훅입니다.
 * @author 소보길
 */
export const useStaffModal = (staff: StaffListResponse) => {
  const navigate = useNavigate();

  //모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //모달 핸들러
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  //모달 핸들러
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  //모달 핸들러
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  //모달 핸들러
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  //모달 핸들러
  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);

    //TODO: 삭제 로직 추가
    console.log("delete staff", staff.staffId);
  };
  //모달 핸들러
  const handleEditAccessConfirm = () => {
    setIsEditModalOpen(false);

    //TODO: 수정 로직 추가
    navigate(`/staff/edit/${staff.staffId}`);
  };

  return {
    isDeleteModalOpen,
    isEditModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleCloseEditModal,
    handleOpenEditModal,
    handleDeleteConfirm,
    handleEditAccessConfirm,
  };
};
