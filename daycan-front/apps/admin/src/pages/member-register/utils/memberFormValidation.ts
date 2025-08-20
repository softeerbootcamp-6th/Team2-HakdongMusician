import {
  validateBirthDate,
  validatePhoneNumber,
  validateLongTermCareNumber,
  validatePassword,
} from "@/utils";
import type { TMemberCreateRequest } from "@/services/member/types";

export const getMemberFormFieldErrors = (
  form: TMemberCreateRequest,
  mode: "register" | "edit",
  isPasswordEditMode: boolean
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // 수급자 정보 검증
  if (form.name.trim() === "") {
    errors.name = "이름을 입력해주세요";
  }
  if (form.gender !== "MALE" && form.gender !== "FEMALE") {
    errors.gender = "성별을 선택해주세요";
  }
  if (form.birthDate.trim() === "") {
    errors.birthDate = "생년월일을 입력해주세요";
  } else if (!validateBirthDate(form.birthDate).isValid) {
    errors.birthDate = validateBirthDate(form.birthDate).errorMessage;
  }
  if (form.careLevel === 0) {
    errors.careLevel = "장기요양등급을 입력해주세요";
  }
  if (form.careNumber.trim() === "") {
    errors.careNumber = "장기요양인정번호를 입력해주세요";
  } else if (!validateLongTermCareNumber(form.careNumber).isValid) {
    errors.careNumber = validateLongTermCareNumber(
      form.careNumber
    ).errorMessage;
  }

  // 보호자 정보 검증
  if (form.guardianName.trim() === "") {
    errors.guardianName = "보호자 이름을 입력해주세요";
  }
  if (form.guardianRelation.trim() === "") {
    errors.guardianRelation = "수급자와의 관계를 입력해주세요";
  }
  if (form.guardianBirthDate.trim() === "") {
    errors.guardianBirthDate = "보호자 생년월일을 입력해주세요";
  } else if (!validateBirthDate(form.guardianBirthDate).isValid) {
    errors.guardianBirthDate = validateBirthDate(
      form.guardianBirthDate
    ).errorMessage;
  }
  if (form.guardianPhoneNumber.trim() === "") {
    errors.guardianPhoneNumber = "보호자 연락처를 입력해주세요";
  } else if (!validatePhoneNumber(form.guardianPhoneNumber).isValid) {
    errors.guardianPhoneNumber = validatePhoneNumber(
      form.guardianPhoneNumber
    ).errorMessage;
  }

  // 수정 모드이고 비밀번호 수정 모드가 비활성화된 경우 비밀번호 관련 필드 검증 제외
  if (mode === "edit") {
    if (!isPasswordEditMode) {
      return errors;
    }
  }

  if (form.passwordEntry.guardianPassword?.trim() === "") {
    errors.guardianPassword = "비밀번호를 입력해주세요";
  } else if (
    form.passwordEntry.guardianPassword &&
    !validatePassword(form.passwordEntry.guardianPassword).isValid
  ) {
    errors.guardianPassword = validatePassword(
      form.passwordEntry.guardianPassword
    ).errorMessage;
  }
  if (
    form.passwordEntry.guardianPasswordConfirm &&
    form.passwordEntry.guardianPasswordConfirm.trim() === ""
  ) {
    errors.guardianPasswordConfirm = "비밀번호 확인을 입력해주세요";
  } else if (
    form.passwordEntry.guardianPassword !==
    form.passwordEntry.guardianPasswordConfirm
  ) {
    errors.guardianPasswordConfirm = "비밀번호가 일치하지 않아요";
  }

  return errors;
};
