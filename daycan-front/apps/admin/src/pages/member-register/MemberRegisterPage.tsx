import { Body, Button, COLORS, Heading, Icon } from "@daycan/ui";
import {
  MemberInfoSection,
  GuardianInfoSection,
  ReportConsentModal,
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

export const MemberRegisterPage = () => {
  const {
    form,
    updateMemberInfo,
    updateGuardianInfo,
    updateReportConsent,
    getFieldErrors,
    isFormFilled,
    handleSubmit,
  } = useMemberRegisterForm();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
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
  const handleReportConsentToggle = () => {
    updateReportConsent(!form.reportConsent);
  };

  // 폼 제출 시 에러 검증
  const handleFormSubmit = () => {
    const fieldErrors = getFieldErrors();
    setErrors(fieldErrors);
    setShowErrors(true);

    if (Object.keys(fieldErrors).length === 0) {
      handleSubmit();
    }
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
          <Heading>수급자 등록</Heading>
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
            guardianBirthDate: form.guardianBirthDate,
            guardianPhoneNumber: form.guardianPhoneNumber,
            guardianRelationship: form.guardianRelationship,
            guardianPassword: form.guardianPassword,
            guardianPasswordConfirm: form.guardianPasswordConfirm,
            guardianAvatarUrl: form.guardianAvatarUrl,
          }}
          onUpdate={handleGuardianInfoUpdate}
          errors={errors}
          showErrors={showErrors}
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
              onClick={handleReportConsentToggle}
              style={{ cursor: "pointer" }}
              color={
                form.reportConsent ? COLORS.primary[300] : COLORS.gray[200]
              }
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
          disabled={!isFormFilled()}
          onClick={handleFormSubmit}
          style={{
            backgroundColor: isFormFilled()
              ? COLORS.primary[300]
              : COLORS.gray[400],
            cursor: isFormFilled() ? "pointer" : "not-allowed",
            opacity: isFormFilled() ? 1 : 0.6,
          }}
        >
          <Body type="medium" weight={600} color={COLORS.gray[600]}>
            등록
          </Body>
        </Button>
      </div>

      <ReportConsentModal
        isOpen={isReportConsentModalOpen}
        onClose={() => {
          setIsReportConsentModalOpen(false);
        }}
      />
    </div>
  );
};
