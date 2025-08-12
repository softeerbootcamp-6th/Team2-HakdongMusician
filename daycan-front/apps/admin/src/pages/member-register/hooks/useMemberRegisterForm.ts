import { useEffect, useState } from "react";
import {
  validateBirthDate,
  validatePhoneNumber,
  validateLongTermCareNumber,
  validatePassword,
} from "@/utils";
import { useNavigate } from "react-router-dom";
import { API_ELDER_DUMMY_DATA } from "@/constants/memberDummyData";
import { useToast } from "@daycan/ui";

interface MemberRegisterForm {
  name: string;
  gender: string;
  birthDate: string;
  careLevel: number;
  careNumber: string;
  avatarUrl: string;
  guardianName: string;
  guardianRelation: string;
  guardianRelationBirthDate: string;
  guardianPhoneNumber: string;
  guardianAvatarUrl: string;
  acceptReport: boolean;
  guardianPassword: string;
  guardianPasswordConfirm: string;
  passwordConfirmed: boolean;
}

export const useMemberRegisterForm = (
  mode: "register" | "edit",
  memberId: string
) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
  const [form, setForm] = useState<MemberRegisterForm>({
    name: "",
    gender: "",
    birthDate: "",
    careLevel: 0,
    careNumber: "",
    avatarUrl: "",
    guardianName: "",
    guardianRelation: "",
    guardianRelationBirthDate: "",
    guardianPhoneNumber: "",
    guardianAvatarUrl: "",
    acceptReport: false,
    guardianPassword: "",
    guardianPasswordConfirm: "",
    passwordConfirmed: false,
  });
  const [copyForm, setCopyForm] = useState<MemberRegisterForm>(form);

  const getInitialData = async () => {
    if (mode === "edit") {
      // 더미파일 가져와서 response에 저장
      const response = API_ELDER_DUMMY_DATA.result.find(
        (item) => item.memberId === memberId
      );
      if (!response) {
        showToast({
          data: {
            message: "회원 정보를 찾을 수 없어요.",
            type: "error",
            variant: "pc",
          },
        });
        navigate("/member");
        return;
      }

      // response를 form에 덮어씌우기
      const updatedForm = {
        ...form,
        name: response?.name || "",
        gender: response?.gender || "",
        birthDate: response?.birthDate || "",
        careLevel: response?.careLevel || 0,
        careNumber: response?.careNumber || "",
        avatarUrl: response?.avatarUrl || "",
        guardianName: response?.guardianName || "",
        guardianRelation: response?.guardianRelation || "",
        guardianRelationBirthDate: response?.guardianRelationBirthDate || "",
        guardianPhoneNumber: response?.guardianPhoneNumber || "",
        guardianAvatarUrl: response?.guardianAvatarUrl || "",
        acceptReport: response?.acceptReport || false,
        // guardianPassword: response?.guardianPassword || "",
        // guardianPasswordConfirm: response?.guardianPasswordConfirm || "",
      };
      console.log("updatedForm", updatedForm);

      setForm(updatedForm);
      // 원본 데이터를 copyForm에 저장하여 변경사항 비교에 사용
      setCopyForm(updatedForm);
    }
  };

  useEffect(() => {
    getInitialData();
  }, [mode, memberId]);

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
  const updateAcceptReport = (consent: boolean) => {
    updateField("acceptReport", consent);
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
    if (form.guardianRelation.trim() === "") {
      errors.guardianRelation = "수급자와의 관계를 입력해주세요";
    }
    if (form.guardianRelationBirthDate.trim() === "") {
      errors.guardianBirthDate = "보호자 생년월일을 입력해주세요";
    } else if (!validateBirthDate(form.guardianRelationBirthDate).isValid) {
      errors.guardianRelationBirthDate = validateBirthDate(
        form.guardianRelationBirthDate
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
  const isRegisterPageFormChangedOrFilled = (): boolean => {
    // 필수 필드들만 확인 (선택적 필드 제외)
    const requiredFields = {
      name: form.name.trim() !== "",
      gender: form.gender !== "",
      birthDate: form.birthDate.trim() !== "",
      careLevel: form.careLevel !== 0,
      careNumber: form.careNumber.trim() !== "",
      guardianName: form.guardianName.trim() !== "",
      guardianRelation: form.guardianRelation.trim() !== "",
      guardianRelationBirthDate: form.guardianRelationBirthDate.trim() !== "",
      guardianPhoneNumber: form.guardianPhoneNumber.trim() !== "",
      guardianPassword: form.guardianPassword.trim() !== "",
      guardianPasswordConfirm: form.guardianPasswordConfirm.trim() !== "",
    };

    return Object.values(requiredFields).every(Boolean);
  };

  //수정 버튼 활성화
  const isEditPageFormChangedOrFilled = (): boolean => {
    // 수정 모드이고 변경사항이 없는 경우 false 반환
    if (mode === "edit") {
      const hasChanges = Object.keys(form).some((key) => {
        const fieldKey = key as keyof MemberRegisterForm;
        return form[fieldKey] !== copyForm[fieldKey];
      });

      return hasChanges;
    }
    const requiredFields = {
      name: form.name.trim() !== "",
      gender: form.gender !== "",
      birthDate: form.birthDate.trim() !== "",
      careLevel: form.careLevel !== 0,
      careNumber: form.careNumber.trim() !== "",
      guardianName: form.guardianName.trim() !== "",
      guardianRelation: form.guardianRelation.trim() !== "",
      guardianRelationBirthDate: form.guardianRelationBirthDate.trim() !== "",
      guardianPhoneNumber: form.guardianPhoneNumber.trim() !== "",
    };
    return Object.values(requiredFields).every(Boolean);
  };

  // 폼 제출 버튼 활성화 여부(수정 , 등록페이지 구분),,
  // 다만 활성화 여부만 판단하고 제출해도 폼 형식에 맞지 않으면 handleFormErrorCheck에서 검출
  const handleIsFormFilled = () => {
    if (mode === "register") {
      return isRegisterPageFormChangedOrFilled();
    } else {
      return isEditPageFormChangedOrFilled();
    }
  };

  // 폼 제출 시 에러 검증
  const handleFormErrorCheck = () => {
    const fieldErrors = getFieldErrors();
    setErrors(fieldErrors);
    setShowErrors(true);

    if (Object.keys(fieldErrors).length === 0) {
      handleSubmit();
    }
  };

  //마지막 제출 함수
  const handleSubmit = () => {
    form.passwordConfirmed = true;

    //여기서 API 호출
    console.log("폼 제출:", form);
    if (mode === "register") {
      // 등록 로직
      console.log("등록 로직");

      showToast({
        data: {
          message: `${form.name} 님의 정보가 등록되었어요`,
          type: "success",
          variant: "pc",
        },
        autoClose: 1500,
        hideProgressBar: true,
      });
    } else if (mode === "edit") {
      // 수정 로직
      console.log("수정 로직");

      showToast({
        data: {
          message: `${form.name} 님의 정보가 수정되었어요`,
          type: "success",
          variant: "pc",
        },
        autoClose: 1500,
        hideProgressBar: true,
      });
    }

    // 폼 초기화
    setForm({
      ...form,
      passwordConfirmed: false,
    });

    navigate("/member");
  };

  return {
    //폼
    form,

    //버튼 활성화 여부
    handleIsFormFilled,
    //폼 제출 시 에러 검증
    handleFormErrorCheck,

    //마지막 제출 함수
    handleSubmit,

    //개별 필드 업데이트 함수들
    updateMemberInfo,
    updateGuardianInfo,
    updateAcceptReport,

    //에러 메시지
    errors,
    showErrors,

    //비밀번호 수정 모드 여부(수정 페이지에서 비밀번호 수정시 비밀번호 수정 모드 활성화)
    isPasswordEditMode,
    setIsPasswordEditMode,
  };
};
