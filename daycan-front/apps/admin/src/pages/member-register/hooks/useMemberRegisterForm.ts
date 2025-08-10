import { useState } from "react";
import {
  validateBirthDate,
  validatePhoneNumber,
  validateLongTermCareNumber,
  validatePassword,
} from "@/utils";
import { useNavigate } from "react-router-dom";

interface MemberRegisterForm {
  name: string;
  gender: string;
  birthDate: string;
  careLevel: number;
  careNumber: string;
  avatarUrl: string;
  guardianName: string;
  guardianRelationship: string;
  guardianBirthDate: string;
  guardianPhoneNumber: string;
  guardianAvatarUrl: string;
  reportConsent: boolean;
  guardianPassword: string;
  guardianPasswordConfirm: string;
  passwordConfirmed: boolean;
}

export const useMemberRegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MemberRegisterForm>({
    name: "",
    gender: "",
    birthDate: "",
    careLevel: 0,
    careNumber: "",
    avatarUrl: "",
    guardianName: "",
    guardianRelationship: "",
    guardianBirthDate: "",
    guardianPhoneNumber: "",
    guardianAvatarUrl: "",
    reportConsent: false,
    guardianPassword: "",
    guardianPasswordConfirm: "",
    passwordConfirmed: false,
  });

  // 개별 필드 업데이트 함수들 (즉, 여기서 각각 하나씩 값이 바뀌게 하는 거)
  const updateField = (
    field: keyof MemberRegisterForm,
    value: string | boolean | number
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 수급자 정보 업데이트(수급자 정보 form에서 값이 변하면 이 함수를 감싼 handle이 실행되면서 위의 updateField가 실행)
  const updateMemberInfo = (
    field: keyof MemberRegisterForm,
    value: string | number
  ) => {
    updateField(field, value);
  };

  // 보호자 정보 업데이트(위 설명과 마찬가지)
  const updateGuardianInfo = (
    field: keyof MemberRegisterForm,
    value: string
  ) => {
    updateField(field, value);
  };

  // 리포트 수신 동의 업데이트
  const updateReportConsent = (consent: boolean) => {
    updateField("reportConsent", consent);
  };

  //에러 메시지 Record로 반환
  const getFieldErrors = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    // 수급자 정보 검증
    if (form.name.trim() === "") {
      errors.name = "이름을 입력해주세요";
    }
    if (form.gender === "") {
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
    if (form.guardianRelationship.trim() === "") {
      errors.guardianRelationship = "수급자와의 관계를 입력해주세요";
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
    if (form.guardianPassword.trim() === "") {
      errors.guardianPassword = "비밀번호를 입력해주세요";
    } else if (!validatePassword(form.guardianPassword).isValid) {
      errors.guardianPassword = validatePassword(
        form.guardianPassword
      ).errorMessage;
    }
    if (form.guardianPasswordConfirm.trim() === "") {
      errors.guardianPasswordConfirm = "비밀번호 확인을 입력해주세요";
    } else if (form.guardianPassword !== form.guardianPasswordConfirm) {
      errors.guardianPasswordConfirm = "비밀번호가 일치하지 않아요";
    }

    return errors;
  };

  //등록 버튼 활성화
  const isFormFilled = (): boolean => {
    // 필수 필드들만 확인 (선택적 필드 제외)
    const requiredFields = {
      name: form.name.trim() !== "",
      gender: form.gender !== "",
      birthDate: form.birthDate.trim() !== "",
      careLevel: form.careLevel !== 0,
      careNumber: form.careNumber.trim() !== "",
      guardianName: form.guardianName.trim() !== "",
      guardianRelationship: form.guardianRelationship.trim() !== "",
      guardianBirthDate: form.guardianBirthDate.trim() !== "",
      guardianPhoneNumber: form.guardianPhoneNumber.trim() !== "",
      guardianPassword: form.guardianPassword.trim() !== "",
      guardianPasswordConfirm: form.guardianPasswordConfirm.trim() !== "",
    };

    return Object.values(requiredFields).every(Boolean);
  };

  // yyyy.mm.dd 에서 yyyy-mm-dd 로 변경하는 함수임
  const changeBirthDate = (birthDate: string) => {
    const [year, month, day] = birthDate.split(".");
    return `${year}-${month}-${day}`;
  };

  //마지막 제출 함수
  const handleSubmit = () => {
    //바뀐 상태를 backend형식에 맞게 변환
    form.passwordConfirmed = true;
    form.birthDate = changeBirthDate(form.birthDate);
    form.guardianBirthDate = changeBirthDate(form.guardianBirthDate);

    //여기서 API 호출
    console.log("폼 제출:", form);

    // 폼 초기화
    setForm({
      ...form,
      passwordConfirmed: false,
    });
    navigate("/member");
  };

  return {
    form,
    isFormFilled,
    handleSubmit,
    updateMemberInfo,
    updateGuardianInfo,
    updateReportConsent,
    getFieldErrors,
  };
};
