import type { TStaff } from "@/services/staff/types";
import { validateBirthDate, validatePhoneNumber } from "@/utils/dateFormatter";

// 폼 초기 상태 함수로 선언
export const getInitialFormData = (): TStaff => ({
  staffId: 0,
  centerId: 0,
  name: "",
  gender: "MALE",
  staffRole: "UNKNOWN", // 등록 모드에서 초기값이 선택되지 않은 것처럼 보이도록 UNKNOWN으로 설정
  birthDate: "",
  phoneNumber: "",
  avatarUrl: "",
});

// form 검증
export const getStaffFormErrors = (data: TStaff) => {
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "이름을 입력해주세요.";
  if (!data.birthDate) errors.birthDate = "생년월일을 입력해주세요.";
  if (!data.phoneNumber) errors.phoneNumber = "연락처를 입력해주세요.";

  const phoneValidation = validatePhoneNumber(data.phoneNumber);
  if (!phoneValidation.isValid)
    errors.phoneNumber = phoneValidation.errorMessage;

  const birthValidation = validateBirthDate(data.birthDate);
  if (!birthValidation.isValid) errors.birthDate = birthValidation.errorMessage;

  return errors;
};
