import { Body, COLORS } from "@daycan/ui";
import { GENDER_OPTIONS } from "@/constants/memberRegister";
import {
  chipContainer,
  genderButton,
  labelContainer,
  memberInfoSectionContent,
} from "./GenderSelector.css";

type Gender = "male" | "female";

interface GenderSelectorProps {
  selectedGender: string;
  onGenderSelect: (gender: string) => void;
}

export const GenderSelector = ({
  selectedGender,
  onGenderSelect,
}: GenderSelectorProps) => {
  const handleGenderSelect = (gender: Gender) => {
    onGenderSelect(gender);
  };

  return (
    <div className={memberInfoSectionContent}>
      <div className={labelContainer}>
        <Body
          weight={600}
          type="large"
          style={{
            width: "68px",
            height: "29px",
            color: COLORS.gray[700],
          }}
        >
          성별
        </Body>
      </div>
      <div className={chipContainer}>
        {GENDER_OPTIONS.map((option: { value: string; label: string }) => (
          <div
            key={option.value}
            className={genderButton({
              isSelected: selectedGender === option.value,
            })}
            onClick={() => handleGenderSelect(option.value as Gender)}
          >
            <Body
              type="large"
              color={
                selectedGender === option.value
                  ? COLORS.gray[100]
                  : COLORS.gray[500]
              }
            >
              {option.label}
            </Body>
          </div>
        ))}
      </div>
    </div>
  );
};
