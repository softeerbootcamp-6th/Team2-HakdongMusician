import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StaffRegisterLayout,
  StaffInfoSection,
  ProfileImageSection,
  StaffFormFields,
} from "./components";
import { useStaffForm } from "./hooks/useStaffForm";
import { useImageController } from "./hooks/useImageController";
import { useGetStaffDetailQuery } from "@/services/staff/useStaffQuery";
import { EditDeleteAuthModal } from "@/components";

interface StaffRegisterPageProps {
  mode: "register" | "edit";
}

export const StaffRegisterPage = ({ mode }: StaffRegisterPageProps) => {
  const { staffId } = useParams<{ staffId: string }>();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 수정 페이지에서 데이터가 있으면 데이터 반환, useMemo로 [mode, staffId]가 변하지 않으면 작동하지 않게함
  const { data: staffData } = useGetStaffDetailQuery(Number(staffId));

  // edit 모드일 때 인증 모달 표시
  useEffect(() => {
    if (mode === "edit") {
      setIsAuthModalOpen(true);
    }
  }, [mode]);

  // 폼 데이터 관리 커스텀 훅 - mode와 initialData 전달
  const {
    staffFormData,
    setStaffFormData,
    setStaffAvatarFile,
    handleInputChange,
    handleGenderSelect,
    handleStaffRoleSelect,
    isFormReadyForSubmission,
    handleFormSubmit,
    errorMessages,
    showErrorMessages,
  } = useStaffForm(mode, staffData || undefined);

  // 이미지 상태관리 커스텀 훅
  const {
    selectedProfileImage,
    setSelectedProfileImage,
    profileImageUrl,
    setProfileImageUrl,
    handleImageChange,
  } = useImageController(setStaffFormData, setStaffAvatarFile);

  // 인증 성공 시 처리
  const handleEditAccessConfirm = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  // 인증 취소 시 /staff로 리다이렉팅
  const handleAuthCancel = () => {
    navigate("/staff");
  };

  // useEffect 수정 데이터 있으면 데이터 상태 변화
  useEffect(() => {
    if (!staffData) return;
    setStaffFormData(staffData);
    setProfileImageUrl(staffData.avatarUrl);
    setSelectedProfileImage(true);
  }, [
    staffData,
    setStaffFormData,
    setProfileImageUrl,
    setSelectedProfileImage,
  ]);

  // 폼 필드 데이터 - useMemo를 조건부 return 이전에 호출
  const staffFormFields = useMemo(
    () => [
      {
        label: "성함",
        name: "name",
        placeholder: "이름 입력",
        required: true,
        value: staffFormData.name,
        onChange: handleInputChange,
        maxLength: 10,
      },
      {
        label: "생년월일",
        name: "birthDate",
        placeholder: "YYYY-MM-DD",
        type: "text" as const,
        required: true,
        value: staffFormData.birthDate,
        onChange: handleInputChange,
        maxLength: 10,
      },
      {
        label: "성별",
        name: "gender",
        placeholder: "성별을 입력하세요",
        required: true,
        value: staffFormData.gender,
        onChange: handleInputChange,
      },
      {
        label: "연락처",
        name: "phoneNumber",
        placeholder: "XXX-XXXX-XXXX",
        type: "tel" as const,
        required: true,
        value: staffFormData.phoneNumber,
        onChange: handleInputChange,
        maxLength: 13,
      },
      {
        label: "직무",
        name: "staffRole",
        placeholder: "직무를 선택해 주세요",
        required: true,
        value:
          staffFormData.staffRole === "UNKNOWN" ? "" : staffFormData.staffRole,
        onChange: handleInputChange,
      },
    ],
    [staffFormData, handleInputChange]
  );

  // edit 모드이고 인증되지 않은 경우 인증 모달 표시
  if (mode === "edit" && !isAuthenticated) {
    return (
      <EditDeleteAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onEditAccessConfirm={handleEditAccessConfirm}
        onCancel={handleAuthCancel}
        unitId={Number(staffId)}
        actionType="edit"
      />
    );
  }

  return (
    // 레이아웃 컴포넌트, 헤더랑, 등록or수정 버튼 있음
    <StaffRegisterLayout
      mode={mode}
      isFormReadyForSubmission={isFormReadyForSubmission}
      handleFormSubmit={handleFormSubmit}
    >
      {/* 종사자 정보 */}
      <StaffInfoSection>
        {/* 이미지 */}
        <ProfileImageSection
          selectedProfileImage={selectedProfileImage}
          profileImageUrl={profileImageUrl}
          onImageChange={handleImageChange}
        />
        {/* 폼 */}
        <StaffFormFields
          fields={staffFormFields}
          onGenderSelect={handleGenderSelect}
          onStaffRoleSelect={handleStaffRoleSelect}
          errorMessages={errorMessages}
          showErrorMessages={showErrorMessages}
        />
      </StaffInfoSection>
      {/* 후에 아래로 추가 가능 */}
    </StaffRegisterLayout>
  );
};
