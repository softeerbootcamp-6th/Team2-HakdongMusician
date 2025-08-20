import {
  MemberInfoSection,
  GuardianInfoSection,
  MemberRegisterLayout,
  ReportConsentSection,
} from "./components";
import { useMemberRegisterForm } from "./hooks";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditDeleteAuthModal } from "@/components";

interface MemberRegisterPageProps {
  mode: "register" | "edit";
}

export const MemberRegisterPage = ({ mode }: MemberRegisterPageProps) => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //후에 memberId없을 때는 그냥 register 모드
  if (!memberId) {
    mode = "register";
  }

  // edit 모드일 때 인증 모달 표시
  useEffect(() => {
    if (mode === "edit") {
      setIsAuthModalOpen(true);
    }
  }, [mode]);

  // 인증 성공 시 처리
  const handleEditAccessConfirm = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  // 인증 취소 시 /member로 리다이렉팅
  const handleAuthCancel = () => {
    navigate("/member");
  };

  const {
    form,
    handleFieldUpdate,
    updateMemberAvatarFile,
    updateGuardianAvatarFile,
    handleIsFormFilled,
    handleFormErrorCheck,
    errorMessages,
    showErrorMessages,
    isPasswordEditMode,
    setIsPasswordEditMode,
  } = useMemberRegisterForm(mode, Number(memberId));

  // 통합된 업데이트 핸들러
  const update = (
    type: "field" | "image" | "password" | "toggle",
    field: string,
    value: string | number | boolean | File | null,
    section?: "passwordEntry" | "root"
  ) => {
    switch (type) {
      case "field":
        handleFieldUpdate(field, value as string | number | boolean);
        break;
      case "image":
        if (field === "memberAvatar") {
          updateMemberAvatarFile(value as File | null);
        } else if (field === "guardianAvatar") {
          updateGuardianAvatarFile(value as File | null);
        }
        break;
      case "password":
        handleFieldUpdate(field, value as string | boolean, section);
        break;
      case "toggle":
        handleFieldUpdate(field, value as boolean);
        break;
    }
  };

  // edit 모드이고 인증되지 않은 경우 로딩 표시
  if (mode === "edit" && !isAuthenticated) {
    return (
      <EditDeleteAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onEditAccessConfirm={handleEditAccessConfirm}
        onCancel={handleAuthCancel}
        unitId={Number(memberId)}
        actionType="edit"
      />
    );
  }

  return (
    <MemberRegisterLayout
      mode={mode}
      isFormReadyForSubmission={handleIsFormFilled()}
      handleFormSubmit={handleFormErrorCheck}
    >
      {/* 수급자 정보 입력 폼 */}
      <MemberInfoSection
        form={{
          name: form.name,
          gender: form.gender,
          birthDate: form.birthDate,
          careLevel: form.careLevel,
          careNumber: form.careNumber,
          avatarUrl: form.avatarUrl,
        }}
        onUpdate={(field, value) => update("field", field, value)}
        onImageFileUpdate={(file) => update("image", "memberAvatar", file)}
        errors={errorMessages}
        showErrors={showErrorMessages}
      />

      {/* 보호자 정보 입력 폼 */}
      <GuardianInfoSection
        form={{
          guardianName: form.guardianName,
          guardianBirthDate: form.guardianBirthDate,
          guardianPhoneNumber: form.guardianPhoneNumber,
          guardianRelation: form.guardianRelation,
          guardianPassword: form.passwordEntry.guardianPassword || "",
          guardianPasswordConfirm:
            form.passwordEntry.guardianPasswordConfirm || "",
          guardianAvatarUrl: form.guardianAvatarUrl,
        }}
        onUpdate={(field, value) => update("field", field, value)}
        onImageFileUpdate={(file) => update("image", "guardianAvatar", file)}
        errors={errorMessages}
        showErrors={showErrorMessages}
        mode={mode}
        isPasswordEditMode={isPasswordEditMode}
        setIsPasswordEditMode={setIsPasswordEditMode}
        onPasswordFieldUpdate={(field, value) =>
          update("password", field, value, "passwordEntry")
        }
      />

      {/* 리포트 수신 여부 입력 */}
      <ReportConsentSection
        isConsented={form.reportConsent}
        onConsentToggle={() =>
          update("toggle", "reportConsent", !form.reportConsent)
        }
      />
    </MemberRegisterLayout>
  );
};
