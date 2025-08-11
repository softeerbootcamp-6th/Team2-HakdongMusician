import { InfoSectionLayout } from "../InfoSectionLayout/InfoSectionLayout";
import { guardianInfoSectionContainer } from "./GuardianInfoSection.css";
import { InfoSectionRow } from "../InfoSectionRow";

interface GuardianInfoSectionProps {
  form: {
    guardianName: string;
    guardianBirthDate: string;
    guardianPhoneNumber: string;
    guardianRelationship: string;
    guardianPassword: string;
    guardianPasswordConfirm: string;
    guardianAvatarUrl?: string;
  };
  onUpdate: (field: string, value: string) => void;
  errors: Record<string, string>;
  showErrors: boolean;
}

export const GuardianInfoSection = ({
  form,
  onUpdate,
  errors,
  showErrors,
}: GuardianInfoSectionProps) => {
  const handleImageChange = (file: File | null) => {
    if (file) {
      // 이미지 파일을 form에 저장하거나 처리
      console.log("Selected profile image:", file);

      // 로컬 URL 생성하여 미리보기
      const imageUrl = URL.createObjectURL(file);

      // form에 이미지 URL 저장
      onUpdate("guardianAvatarUrl", imageUrl);
    } else {
      // 이미지 제거
      onUpdate("guardianAvatarUrl", "");
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
          value={form.guardianRelationship}
          name="guardianRelationship"
          maxLength={10}
          onChange={(e) => onUpdate("guardianRelationship", e.target.value)}
          errorMessage={showErrors ? errors.guardianRelationship : ""}
          showError={showErrors && !!errors.guardianRelationship}
        />
        <InfoSectionRow
          label="비밀번호 설정"
          placeholder="비밀번호 입력"
          value={form.guardianPassword}
          name="guardianPassword"
          maxLength={20}
          onChange={(e) => onUpdate("guardianPassword", e.target.value)}
          errorMessage={showErrors ? errors.guardianPassword : ""}
          showError={showErrors && !!errors.guardianPassword}
        />
        <InfoSectionRow
          label="비밀번호 확인"
          placeholder="비밀번호 재입력"
          value={form.guardianPasswordConfirm}
          name="guardianPasswordConfirm"
          maxLength={20}
          onChange={(e) => onUpdate("guardianPasswordConfirm", e.target.value)}
          errorMessage={showErrors ? errors.guardianPasswordConfirm : ""}
          showError={showErrors && !!errors.guardianPasswordConfirm}
        />
      </div>
    </InfoSectionLayout>
  );
};
