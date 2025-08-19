import { InfoSectionLayout } from "../InfoSectionLayout/InfoSectionLayout";
import { memberInfoSectionContainer } from "./MemberInfoSection.css";
import { InfoSectionRow } from "../InfoSectionRow";
import { GenderSelector, CareLevelRoleDropDownSelector } from "@/components";
import { CARE_LEVEL_OPTIONS } from "@/pages/member/constants/memberRegister";
import { Body, COLORS } from "@daycan/ui";
import { labelContainer } from "../InfoSectionRow/InfoSectionRow.css";

interface MemberInfoSectionProps {
  form: {
    name: string;
    gender: string;
    birthDate: string;
    careLevel: number;
    careNumber: string;
    avatarUrl?: string | null;
  };
  onUpdate: (field: string, value: string | number) => void;
  onImageFileUpdate: (file: File | null) => void;
  errors: Record<string, string>;
  showErrors: boolean;
}

export const MemberInfoSection = ({
  form,
  onUpdate,
  onImageFileUpdate,
  errors,
  showErrors,
}: MemberInfoSectionProps) => {
  // 이미지 변경 처리 (로컬 미리보기용)
  const handleImageChange = (file: File[] | null) => {
    if (file) {
      // 로컬 URL 생성하여 미리보기만
      const imageUrl = URL.createObjectURL(file[0]);
      onUpdate("avatarUrl", imageUrl);
      // File 객체를 별도로 저장 (S3 업로드는 나중에)
      onImageFileUpdate(file[0]);
    } else {
      // 이미지 제거
      onUpdate("avatarUrl", "");
      onImageFileUpdate(null);
    }
  };

  const handleGenderSelect = (gender: string) => {
    onUpdate("gender", gender);
  };

  return (
    <InfoSectionLayout
      title="수급자 정보"
      profileImage={form.avatarUrl}
      onImageChange={handleImageChange}
    >
      <div className={memberInfoSectionContainer}>
        <InfoSectionRow
          label="성함"
          placeholder="이름 입력"
          value={form.name}
          name="name"
          maxLength={10}
          onChange={(e) => onUpdate("name", e.target.value)}
          errorMessage={showErrors ? errors.name : ""}
          showError={showErrors && !!errors.name}
        />
        <InfoSectionRow
          label="생년월일"
          placeholder="YYYY-MM-DD"
          value={form.birthDate}
          name="birthDate"
          onChange={(e) => onUpdate("birthDate", e.target.value)}
          errorMessage={showErrors ? errors.birthDate : ""}
          showError={showErrors && !!errors.birthDate}
        />
        <GenderSelector
          selectedGender={form.gender}
          onGenderSelect={handleGenderSelect}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 24,
            width: "100%",
          }}
        >
          <div className={labelContainer}>
            <div
              style={{
                width: "133px",
                height: "29px",
              }}
            >
              <Body
                weight={600}
                type="large"
                style={{
                  color: COLORS.gray[700],
                }}
              >
                장기요양등급
              </Body>
            </div>
          </div>
          <CareLevelRoleDropDownSelector
            options={CARE_LEVEL_OPTIONS}
            value={form.careLevel}
            placeholder="장기요양등급 선택"
            onChange={(value) => onUpdate("careLevel", value as number)}
          />
        </div>
        <InfoSectionRow
          label="장기요양인정번호"
          placeholder="장기요양인정번호 입력"
          value={form.careNumber}
          name="careNumber"
          maxLength={11}
          onChange={(e) => onUpdate("careNumber", e.target.value)}
          errorMessage={showErrors ? errors.careNumber : ""}
          showError={showErrors && !!errors.careNumber}
        />
      </div>
    </InfoSectionLayout>
  );
};
