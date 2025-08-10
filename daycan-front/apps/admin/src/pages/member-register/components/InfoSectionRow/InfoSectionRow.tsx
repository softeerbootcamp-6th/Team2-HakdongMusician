import { Body, COLORS, Input } from "@daycan/ui";
import {
  memberInfoSectionContent,
  labelContainer,
  inputContainer,
} from "./InfoSectionRow.css";
import { formatBirthDateOnInput, formatPhoneNumberOnInput } from "@/utils";
import { ErrorMessage } from "@/components";

interface InfoSectionRowProps {
  label: string;
  placeholder: string;
  maxLength?: number;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  showError?: boolean;
}

export const InfoSectionRow = ({
  label,
  placeholder,
  maxLength,
  value = "",
  name,
  onChange,
  errorMessage = "",
  showError = false,
}: InfoSectionRowProps) => {
  //width 고정 때문에 넣어 둔 코드
  const isLongTermCareLabel =
    label === "장기요양등급" ||
    label === "장기요양인정번호" ||
    label === "수급자와의 관계";
  const isPasswordLabel =
    label === "비밀번호 설정" || label === "비밀번호 확인";
  const isBirthDateLabel = label === "생년월일";
  const isPhoneNumberLabel = label === "연락처";

  // 유저가 입력할 때 포멧 저절로 변환, 근데 onChange면 리렌더링 된다 알고 있는데 이게 과연 좋은 함수일까?
  // 근데 포멧 변환하려면 계속 리렌더링이 되야하는게 맞지 않을까?
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      if (isBirthDateLabel) {
        // 생년월일인 경우 자동 포맷팅 적용
        const formattedValue = formatBirthDateOnInput(e.target.value);
        e.target.value = formattedValue;
        onChange(e);
      } else if (isPhoneNumberLabel) {
        // 연락처인 경우 자동 포맷팅 적용
        const formattedValue = formatPhoneNumberOnInput(e.target.value);
        e.target.value = formattedValue;
        onChange(e);
      } else {
        onChange(e);
      }
    }
  };

  return (
    <div className={memberInfoSectionContent}>
      <div className={labelContainer}>
        <Body
          weight={600}
          type="large"
          style={{
            width: isLongTermCareLabel
              ? "133px"
              : isPasswordLabel
                ? "104px"
                : "68px",
            height: "29px",
            color: COLORS.gray[700],
          }}
        >
          {label}
        </Body>
      </div>
      <div className={inputContainer}>
        <Input
          inputSize="full"
          fontSize="large"
          placeholder={placeholder}
          variant="grayLight"
          inputMaxLength={maxLength}
          value={value === undefined ? "" : value}
          name={name}
          onChange={handleChange}
          style={{
            height: "64px",
            outline: "none",
            border: "none",
          }}
        />
        <ErrorMessage message={errorMessage} isVisible={showError} />
      </div>
    </div>
  );
};
