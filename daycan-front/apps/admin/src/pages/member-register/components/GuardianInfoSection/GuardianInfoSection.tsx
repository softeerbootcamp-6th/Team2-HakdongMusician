import { InfoSectionLayout } from "../InfoSectionLayout/InfoSectionLayout";
import { guardianInfoSectionContainer } from "./GuardianInfoSection.css";
import { InfoSectionRow } from "../InfoSectionRow";

interface GuardianInfoSectionProps {
  form: {
    guardianName: string;
    guardianBirthDate: string;
    guardianPhoneNumber: string;
    guardianRelation: string;
    guardianPassword: string;
    guardianPasswordConfirm: string;
    guardianAvatarUrl?: string;
  };
  onUpdate: (field: string, value: string) => void;
  onImageFileUpdate: (file: File | null) => void;
  errors: Record<string, string>;
  showErrors: boolean;
  mode?: "register" | "edit";
  isPasswordEditMode: boolean;
  setIsPasswordEditMode: (isPasswordEditMode: boolean) => void;
  onPasswordFieldUpdate: (field: string, value: string | boolean) => void;
}

export const GuardianInfoSection = ({
  form,
  onUpdate,
  onImageFileUpdate,
  errors,
  showErrors,
  mode = "register",
  isPasswordEditMode,
  setIsPasswordEditMode,
  onPasswordFieldUpdate,
}: GuardianInfoSectionProps) => {
  // 비밀번호 수정 모드 활성화
  const handlePasswordEditTrigger = () => {
    if (mode === "edit" && !isPasswordEditMode) {
      setIsPasswordEditMode(true);
      // 비밀번호 관련 필드들을 모두 초기화 (한 번만 실행)
      onUpdate("guardianPassword", "");
      onUpdate("guardianPasswordConfirm", "");
    }
  };

  // 이미지 변경 처리 (로컬 미리보기용)
  const handleImageChange = (file: File[] | null) => {
    if (file) {
      // 로컬 URL 생성하여 미리보기만
      const imageUrl = URL.createObjectURL(file[0]);
      onUpdate("guardianAvatarUrl", imageUrl);
      // File 객체를 별도로 저장 (S3 업로드는 나중에)
      onImageFileUpdate(file[0]);
    } else {
      // 이미지 제거
      onUpdate("guardianAvatarUrl", "");
      onImageFileUpdate(null);
    }
  };

  return (
    <InfoSectionLayout
      title="보호자 정보"
      profileImage={form.guardianAvatarUrl}
      onImageChange={handleImageChange}
    >
      <div className={guardianInfoSectionContainer}>
        <InfoSectionRow
          label="성함"
          placeholder="이름 입력"
          value={form.guardianName}
          name="guardianName"
          maxLength={10}
          onChange={(e) => onUpdate("guardianName", e.target.value)}
          errorMessage={showErrors ? errors.guardianName : ""}
          showError={showErrors && !!errors.guardianName}
        />
        <InfoSectionRow
          label="생년월일"
          placeholder="YYYY-MM-DD"
          value={form.guardianBirthDate}
          name="guardianBirthDate"
          maxLength={10}
          onChange={(e) => onUpdate("guardianBirthDate", e.target.value)}
          errorMessage={showErrors ? errors.guardianBirthDate : ""}
          showError={showErrors && !!errors.guardianBirthDate}
        />
        <InfoSectionRow
          label="연락처"
          placeholder="XXX-XXXX-XXXX"
          value={form.guardianPhoneNumber}
          name="guardianPhoneNumber"
          onChange={(e) => onUpdate("guardianPhoneNumber", e.target.value)}
          errorMessage={showErrors ? errors.guardianPhoneNumber : ""}
          showError={showErrors && !!errors.guardianPhoneNumber}
        />
        <InfoSectionRow
          label="수급자와의 관계"
          placeholder="예) 자녀"
          value={form.guardianRelation}
          name="guardianRelation"
          maxLength={10}
          onChange={(e) => onUpdate("guardianRelation", e.target.value)}
          errorMessage={showErrors ? errors.guardianRelation : ""}
          showError={showErrors && !!errors.guardianRelation}
        />
        <InfoSectionRow
          label="비밀번호 설정"
          placeholder={
            mode === "edit" && !isPasswordEditMode ? "****" : "비밀번호 입력"
          }
          value={
            mode === "edit" && !isPasswordEditMode
              ? "****"
              : form.guardianPassword
          }
          name="guardianPassword"
          maxLength={20}
          disabled={mode === "edit" && !isPasswordEditMode}
          onChange={(e) =>
            onPasswordFieldUpdate("guardianPassword", e.target.value)
          }
          errorMessage={showErrors ? errors.guardianPassword : ""}
          showError={showErrors && !!errors.guardianPassword}
        />
        <InfoSectionRow
          label="비밀번호 확인"
          placeholder="비밀번호 재입력"
          value={form.guardianPasswordConfirm}
          name="guardianPasswordConfirm"
          maxLength={20}
          onPasswordEditTrigger={handlePasswordEditTrigger}
          onChange={(e) =>
            onPasswordFieldUpdate("guardianPasswordConfirm", e.target.value)
          }
          errorMessage={showErrors ? errors.guardianPasswordConfirm : ""}
          showError={showErrors && !!errors.guardianPasswordConfirm}
        />
      </div>
    </InfoSectionLayout>
  );
};
