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
  memberRegisterPageHeaderDescription,
  memberRegisterPageHeaderTitle,
  memberRegisterPageReportContainer,
  memberRegisterPageReportContent,
  memberRegisterPageReportLeftContent,
  memberRegisterPageButtonContainer,
} from "./MemberRegisterPage.css";
import { useMemberRegisterForm } from "./hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface MemberRegisterPageProps {
  mode: "register" | "edit";
}

export const MemberRegisterPage = ({ mode }: MemberRegisterPageProps) => {
  const { memberId } = useParams();

  //후에 memberId없을 때 예외처리
  if (!memberId) {
    console.error("memberId is required");
  }

  const {
    form,
    updateMemberInfo,
    updateGuardianInfo,
    updateAcceptReport,

    handleIsFormFilled,
    handleFormErrorCheck,
    errors,
    showErrors,
    isPasswordEditMode,
    setIsPasswordEditMode,
  } = useMemberRegisterForm(mode, memberId as string);

  const [isReportConsentModalOpen, setIsReportConsentModalOpen] =
    useState(false);
  // 수급자 정보 업데이트
  const handleMemberInfoUpdate = (field: string, value: string | number) => {
    updateMemberInfo(field as keyof typeof form, value);
  };

  // 보호자 정보 업데이트
  const handleGuardianInfoUpdate = (field: string, value: string) => {
    updateGuardianInfo(field as keyof typeof form, value);
  };

  // 리포트 수신 동의 토글
  const handleAcceptReportToggle = () => {
    updateAcceptReport(!form.acceptReport);
  };

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
          errors={errors}
          showErrors={showErrors}
        />
        <GuardianInfoSection
          form={{
            guardianName: form.guardianName,
            guardianRelationBirthDate: form.guardianRelationBirthDate,
            guardianPhoneNumber: form.guardianPhoneNumber,
            guardianRelation: form.guardianRelation,
            guardianPassword: form.guardianPassword,
            guardianPasswordConfirm: form.guardianPasswordConfirm,
            guardianAvatarUrl: form.guardianAvatarUrl,
          }}
          onUpdate={handleGuardianInfoUpdate}
          errors={errors}
          showErrors={showErrors}
          mode={mode}
          isPasswordEditMode={isPasswordEditMode}
          setIsPasswordEditMode={setIsPasswordEditMode}
        />
      </div>

      {/* 리포트 수신 여부 입력 */}
      <div className={memberRegisterPageReportContainer}>
        <Heading>리포트 수신 여부</Heading>
        <div className={memberRegisterPageReportContent}>
          <div className={memberRegisterPageReportLeftContent}>
            <Icon
              name="circleCheck"
              stroke={form.acceptReport ? COLORS.gray[700] : COLORS.gray[400]}
              width={48}
              height={48}
              onClick={handleAcceptReportToggle}
              style={{ cursor: "pointer" }}
              color={form.acceptReport ? COLORS.primary[300] : COLORS.gray[200]}
            />
            <Body type="small" weight={600}>
              수급자 정보 리포트 수신 동의
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
