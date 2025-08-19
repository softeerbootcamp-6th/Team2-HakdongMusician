import { Body, Button, COLORS, Heading, Icon } from "@daycan/ui";
import {
  MemberInfoSection,
  GuardianInfoSection,
  AcceptReportInfoModal,
} from "./components";
import {
  memberRegisterPageContent,
  memberRegisterPageHeader,
  memberRegisterPageContainer,
  memberRegisterPageHeaderTitle,
  memberRegisterPageHeaderDescription,
  memberRegisterPageReportContainer,
  memberRegisterPageReportContent,
  memberRegisterPageReportLeftContent,
  memberRegisterPageButtonContainer,
} from "./MemberRegisterPage.css";
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

  const {
    form,
    updateMemberInfo,
    updateGuardianInfo,
    updateAcceptReport,
    updatePasswordField,
    updateMemberAvatarFile,
    updateGuardianAvatarFile,
    handleIsFormFilled,
    handleFormErrorCheck,
    errors,
    showErrors,
    isPasswordEditMode,
    setIsPasswordEditMode,
  } = useMemberRegisterForm(mode, Number(memberId));

  const [isReportConsentModalOpen, setIsReportConsentModalOpen] =
    useState(false);

  // 인증 성공 시 처리
  const handleEditAccessConfirm = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  // 인증 취소 시 /member로 리다이렉팅
  const handleAuthCancel = () => {
    navigate("/member");
  };

  // 수급자 정보 업데이트
  const handleMemberInfoUpdate = (field: string, value: string | number) => {
    updateMemberInfo(field as keyof typeof form, value);
  };

  // 보호자 정보 업데이트
  const handleGuardianInfoUpdate = (field: string, value: string) => {
    updateGuardianInfo(field as keyof typeof form, value);
  };

  // 수급자 이미지 파일 업데이트
  const handleMemberImageUpdate = (file: File | null) => {
    updateMemberAvatarFile(file);
  };

  // 보호자 이미지 파일 업데이트
  const handleGuardianImageUpdate = (file: File | null) => {
    updateGuardianAvatarFile(file);
  };

  // 보호자 비밀번호 업데이트
  const handlePasswordFieldUpdate = (
    field: string,
    value: string | boolean
  ) => {
    updatePasswordField(field as keyof typeof form.passwordEntry, value);
  };

  // 리포트 수신 동의 토글
  const handleAcceptReportToggle = () => {
    updateAcceptReport(!form.reportConsent);
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
    <div className={memberRegisterPageContainer}>
      {/* 헤더 */}
      <div className={memberRegisterPageHeader}>
        <div className={memberRegisterPageHeaderTitle}>
          <Heading>수급자 관리</Heading>
          <Icon
            name="arrowRight"
            width={24}
            height={24}
            color={COLORS.gray[50]}
            stroke={COLORS.gray[700]}
          />
          <Heading>
            {mode === "register" ? "수급자 등록" : "수급자 수정"}
          </Heading>
        </div>

        <div className={memberRegisterPageHeaderDescription}>
          <Body>빠짐없이 작성해 주세요.</Body>
        </div>
      </div>

      {/* 수급자, 보호자 정보 입력 폼 */}
      <div className={memberRegisterPageContent}>
        <MemberInfoSection
          form={{
            name: form.name,
            gender: form.gender,
            birthDate: form.birthDate,
            careLevel: form.careLevel,
            careNumber: form.careNumber,
            avatarUrl: form.avatarUrl,
          }}
          onUpdate={handleMemberInfoUpdate}
          onImageFileUpdate={handleMemberImageUpdate}
          errors={errors}
          showErrors={showErrors}
        />
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
          onUpdate={handleGuardianInfoUpdate}
          onImageFileUpdate={handleGuardianImageUpdate}
          errors={errors}
          showErrors={showErrors}
          mode={mode}
          isPasswordEditMode={isPasswordEditMode}
          setIsPasswordEditMode={setIsPasswordEditMode}
          onPasswordFieldUpdate={handlePasswordFieldUpdate}
        />
      </div>

      {/* 리포트 수신 여부 입력 */}
      <div className={memberRegisterPageReportContainer}>
        <Heading>리포트 수신 여부</Heading>
        <div className={memberRegisterPageReportContent}>
          <div className={memberRegisterPageReportLeftContent}>
            <Icon
              name="circleCheck"
              stroke={form.reportConsent ? COLORS.gray[700] : COLORS.gray[400]}
              width={48}
              height={48}
              onClick={handleAcceptReportToggle}
              style={{ cursor: "pointer" }}
              color={
                form.reportConsent ? COLORS.primary[300] : COLORS.gray[200]
              }
            />
            <Body type="small" weight={600}>
              수급자 정보 리포트 수신 동의 (선택)
            </Body>
          </div>
          <Icon
            name="arrowRight"
            width={24}
            height={24}
            onClick={() => setIsReportConsentModalOpen(true)}
            color={COLORS.white}
            stroke={COLORS.gray[700]}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className={memberRegisterPageButtonContainer}>
        <Button
          size="large"
          disabled={!handleIsFormFilled()}
          onClick={handleFormErrorCheck}
          style={{
            backgroundColor: handleIsFormFilled()
              ? COLORS.primary[300]
              : COLORS.gray[400],
            cursor: handleIsFormFilled() ? "pointer" : "not-allowed",
            opacity: handleIsFormFilled() ? 1 : 0.6,
          }}
        >
          <Body type="medium" weight={600} color={COLORS.gray[600]}>
            {mode === "register" ? "등록" : "수정"}
          </Body>
        </Button>
      </div>

      <AcceptReportInfoModal
        isOpen={isReportConsentModalOpen}
        onClose={() => {
          setIsReportConsentModalOpen(false);
        }}
      />
    </div>
  );
};
