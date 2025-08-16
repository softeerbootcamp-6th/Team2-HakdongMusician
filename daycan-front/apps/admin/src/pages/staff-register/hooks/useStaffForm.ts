import type { StaffListResponse } from "@/pages/staff-register/constants/staff";
import { useMemo, useState, useCallback, useRef } from "react";
import {
  formatBirthDateOnInput,
  formatPhoneNumberOnInput,
} from "@/utils/dateFormatter";
import { useNavigate } from "react-router-dom";
import {
  getInitialFormData,
  getStaffFormErrors,
} from "@/pages/staff-register/utils/staffForm";
import { useToast } from "@daycan/ui";

/*
 * 종사자 등록, 수정페이지에서 데이터 관리 커스텀 훅
 * 종사자 폼을 만들어서 폼이 변경돼는 input 핸들러 함수 구현후 리턴
 *
 * 종사자 정보가 수정될 때 혹은 등록될때 에러 메시지 검증 기능도 들어가 있습니다.
 *
 * 마지막 form 제출 검증 기능도 들어가 있습니다.
 * @author 소보길
 */

export const useStaffForm = (
  mode: "register" | "edit",
  initialData?: StaffListResponse | null
) => {
  // staff폼 데이터 StaffListResponse 타입
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [staffFormData, setStaffFormData] = useState<StaffListResponse>(
    initialData || getInitialFormData
  );

  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );
  const [showErrorMessages, setShowErrorMessages] = useState(false);

  // 수정 모드에서 초기 데이터와 비교하기 위한 ref
  const initialFormDataRef = useRef<StaffListResponse | null>(
    mode === "edit" ? initialData || null : null
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let formattedValue = value;

      // 생년월일, 전화번호 포맷팅
      if (name === "birthDate") formattedValue = formatBirthDateOnInput(value);
      if (name === "phoneNumber")
        formattedValue = formatPhoneNumberOnInput(value);

      setStaffFormData((prev) => ({ ...prev, [name]: formattedValue }));
    },
    []
  );

  const handleGenderSelect = useCallback((gender: "MALE" | "FEMALE") => {
    setStaffFormData((prev) => ({
      ...prev,
      gender,
    }));
  }, []);

  const handleStaffRoleSelect = useCallback((role: string) => {
    setStaffFormData((prev) => ({
      ...prev,
      staffRole: role,
    }));
  }, []);

  // 수정 모드에서 폼 데이터가 변경되었는지 확인
  const hasFormChanged = useCallback(() => {
    if (mode !== "edit" || !initialFormDataRef.current) return false;
    const initial = initialFormDataRef.current;
    return Object.keys(initial).some(
      (key) => (initial as any)[key] !== (staffFormData as any)[key]
    );
  }, [mode, staffFormData]);

  // 폼 제출 여부 확인, 수정모드의 경우 hasFormChanged또한 실행해서 확인
  // avatarUrl은 선택사항이므로 검증에서 제외
  const isFormReadyForSubmission = useMemo(() => {
    const requiredFields = [
      "name",
      "gender",
      "staffRole",
      "birthDate",
      "phoneNumber",
    ];
    const isFilled = requiredFields.every(
      (field) => staffFormData[field as keyof StaffListResponse] !== ""
    );
    return mode === "register" ? isFilled : isFilled && hasFormChanged();
  }, [staffFormData, mode, hasFormChanged]);

  // 폼 제출 핸들러
  const handleFormSubmit = () => {
    const fieldErrors = getStaffFormErrors(staffFormData);
    setErrorMessages(fieldErrors);
    setShowErrorMessages(true);
    if (Object.keys(fieldErrors).length) return;

    console.log(mode === "register" ? "등록" : "수정", staffFormData);
    setStaffFormData(getInitialFormData());
    showToast({
      data: {
        message: `${staffFormData.name} 님의 정보가 ${
          mode === "register" ? "등록" : "수정"
        }되었어요`,
        type: "success",
        variant: "pc",
      },
      autoClose: 1500,
      hideProgressBar: true,
    });

    navigate("/staff");
  };

  return {
    //staff form data 배열
    staffFormData,

    //staff form data 상태 변경
    setStaffFormData,

    //staff form data 변경 핸들러
    handleInputChange,
    handleGenderSelect,
    handleStaffRoleSelect,

    // 폼 제출 가능 여부 확인
    isFormReadyForSubmission,

    // 폼 제출 핸들러
    handleFormSubmit,

    // 에러 메시지
    errorMessages,
    showErrorMessages,
  };
};
