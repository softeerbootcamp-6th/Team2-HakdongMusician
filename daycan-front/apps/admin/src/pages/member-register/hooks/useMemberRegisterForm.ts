import { useEffect, useState, useCallback } from "react";
import {
  validateBirthDate,
  validatePhoneNumber,
  validateLongTermCareNumber,
  validatePassword,
} from "@/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@daycan/ui";
import { useGetMemberQuery } from "@/services/member/useMemberQuery";
import type { TMemberCreateRequest } from "@/services/member/types";
import {
  useCreateMemberMutation,
  useUpdateMemberMutation,
} from "@/services/member/useMemberMutation";
import { useUploadImageSingleMutation } from "@/services/image/useUploadImageMutation";

export const useMemberRegisterForm = (
  mode: "register" | "edit",
  memberId: number
) => {
  const { mutate: createMember } = useCreateMemberMutation();
  const { mutate: updateMember } = useUpdateMemberMutation();
  const { mutateAsync: uploadSingleImage } = useUploadImageSingleMutation();

  const navigate = useNavigate();
  const { showToast } = useToast();

  // 상태 관리 개선
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
  const [form, setForm] = useState<TMemberCreateRequest>({
    name: "",
    gender: "MALE",
    birthDate: "",
    careLevel: 0,
    careNumber: "",
    avatarUrl: "",
    guardianName: "",
    guardianRelation: "",
    guardianBirthDate: "",
    guardianPhoneNumber: "",
    guardianAvatarUrl: "",
    reportConsent: false,
    passwordEntry: {
      guardianPassword: "",
      guardianPasswordConfirm: "",
      passwordConfirmed: false,
    },
  });
  const [copyForm, setCopyForm] = useState<TMemberCreateRequest>(form);

  // 이미지 파일 상태 추가
  const [imageFiles, setImageFiles] = useState<{
    memberAvatar: File | null;
    guardianAvatar: File | null;
  }>({
    memberAvatar: null,
    guardianAvatar: null,
  });

  // 기존 이미지 URL 상태 추가
  const [originalImages, setOriginalImages] = useState<{
    memberAvatarUrl: string;
    guardianAvatarUrl: string;
  }>({
    memberAvatarUrl: "",
    guardianAvatarUrl: "",
  });

  // 데이터 로딩 상태 관리 개선
  const { data: memberExistData } = useGetMemberQuery(memberId);

  // getInitialData를 useCallback으로 최적화
  const getInitialData = useCallback(() => {
    if (mode === "edit" && memberId && memberExistData) {
      // response를 form에 덮어씌우기
      const updatedForm = {
        ...form,
        name: memberExistData?.name || "",
        gender: memberExistData?.gender || "",
        birthDate: memberExistData?.birthDate || "",
        careLevel: memberExistData?.careLevel || 0,
        careNumber: memberExistData?.careNumber || "",
        avatarUrl: memberExistData?.avatarUrl || "",
        guardianName: memberExistData?.guardianName || "",
        guardianRelation: memberExistData?.guardianRelation || "",
        guardianBirthDate: memberExistData?.guardianBirthDate || "",
        guardianPhoneNumber: memberExistData?.guardianPhoneNumber || "",
        guardianAvatarUrl: memberExistData?.guardianAvatarUrl || "",
        reportConsent: memberExistData?.acceptReport || false,
      };

      // 기존 이미지 URL 저장
      setOriginalImages({
        memberAvatarUrl: memberExistData?.avatarUrl || "",
        guardianAvatarUrl: memberExistData?.guardianAvatarUrl || "",
      });

      setForm(updatedForm);
      setCopyForm(updatedForm);
    }
  }, [mode, memberId, memberExistData]);

  // useEffect 의존성 배열 수정
  useEffect(() => {
    if (mode === "edit" && memberExistData) {
      getInitialData();
    }
  }, [mode, memberExistData, getInitialData]);

  // 개별 필드 업데이트 함수들
  const updateField = (
    field: keyof TMemberCreateRequest,
    value: string | boolean | number | null
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateMemberInfo = (
    field: keyof TMemberCreateRequest,
    value: string | number
  ) => {
    updateField(field, value);
  };

  const updateGuardianInfo = (
    field: keyof TMemberCreateRequest,
    value: string
  ) => {
    updateField(field, value);
  };

  // 이미지 파일 업데이트 함수들
  const updateMemberAvatarFile = (file: File | null) => {
    setImageFiles((prev) => ({ ...prev, memberAvatar: file }));
  };

  const updateGuardianAvatarFile = (file: File | null) => {
    setImageFiles((prev) => ({ ...prev, guardianAvatar: file }));
  };

  // 리포트 수신 동의 업데이트
  const updateAcceptReport = (consent: boolean) => {
    updateField("reportConsent", consent);
  };

  const updatePasswordField = (
    field: keyof typeof form.passwordEntry,
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      passwordEntry: {
        ...prev.passwordEntry,
        [field]: value,
      },
    }));
  };

  //에러 메시지 Record로 반환
  const getFieldErrors = (): Record<string, string> => {
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

  //등록 버튼 활성화
  const isRegisterPageFormChangedOrFilled = (): boolean => {
    // 필수 필드들만 확인 (선택적 필드 제외)
    const requiredFields = {
      name: form.name.trim() !== "",
      gender: form.gender === "MALE" || form.gender === "FEMALE",
      birthDate: form.birthDate.trim() !== "",
      careLevel: form.careLevel !== 0,
      careNumber: form.careNumber.trim() !== "",
      guardianName: form.guardianName.trim() !== "",
      guardianRelation: form.guardianRelation.trim() !== "",
      guardianBirthDate: form.guardianBirthDate.trim() !== "",
      guardianPhoneNumber: form.guardianPhoneNumber.trim() !== "",
      passwordEntry: {
        guardianPassword: form.passwordEntry.guardianPassword,
        guardianPasswordConfirm: form.passwordEntry.guardianPasswordConfirm,
      },
    };

    return Object.values(requiredFields).every(Boolean);
  };

  //수정 버튼 활성화
  const isEditPageFormChangedOrFilled = (): boolean => {
    // 수정 모드이고 변경사항이 없는 경우 false 반환
    if (mode === "edit") {
      const hasChanges = Object.keys(form).some((key) => {
        const fieldKey = key as keyof TMemberCreateRequest;
        return form[fieldKey] !== copyForm[fieldKey];
      });

      return hasChanges;
    }
    const requiredFields = {
      name: form.name.trim() !== "",
      gender: form.gender === "MALE" || form.gender === "FEMALE",
      birthDate: form.birthDate.trim() !== "",
      careLevel: form.careLevel !== 0,
      careNumber: form.careNumber.trim() !== "",
      guardianName: form.guardianName.trim() !== "",
      guardianRelation: form.guardianRelation.trim() !== "",
      guardianBirthDate: form.guardianBirthDate.trim() !== "",
      guardianPhoneNumber: form.guardianPhoneNumber.trim() !== "",
    };
    return Object.values(requiredFields).every(Boolean);
  };

  // 폼 제출 버튼 활성화 여부
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

  // 마지막 제출 함수 개선
  const handleSubmit = async () => {
    form.passwordEntry.passwordConfirmed = true;

    try {
      // 이미지 업로드 처리
      let finalForm = { ...form };

      // 수급자 이미지 처리
      if (imageFiles.memberAvatar) {
        // 새로운 이미지가 선택된 경우 업로드
        try {
          const result = await uploadSingleImage(imageFiles.memberAvatar);
          finalForm.avatarUrl = result.objectKey;
        } catch (error) {
          console.error("수급자 이미지 업로드 실패:", error);
          showToast({
            data: {
              message: "수급자 이미지 업로드에 실패했습니다.",
              type: "error",
              variant: "pc",
            },
          });
          return;
        }
      } else if (
        mode === "edit" &&
        form.avatarUrl === originalImages.memberAvatarUrl
      ) {
        // 수정 모드이고 기존 이미지와 동일한 경우 avatarUrl 삭제
        delete (finalForm as any).avatarUrl;
      }

      // 보호자 이미지 처리
      if (imageFiles.guardianAvatar) {
        // 새로운 이미지가 선택된 경우 업로드
        try {
          const result = await uploadSingleImage(imageFiles.guardianAvatar);
          finalForm.guardianAvatarUrl = result.objectKey;
        } catch (error) {
          console.error("보호자 이미지 업로드 실패:", error);
          showToast({
            data: {
              message: "보호자 이미지 업로드에 실패했습니다.",
              type: "error",
              variant: "pc",
            },
          });
          return;
        }
      } else if (
        mode === "edit" &&
        form.guardianAvatarUrl === originalImages.guardianAvatarUrl
      ) {
        // 수정 모드이고 기존 이미지와 동일한 경우 guardianAvatarUrl 삭제
        delete (finalForm as any).guardianAvatarUrl;
      }

      // passwordEntry의 모든 값이 null이면 passwordEntry 자체를 제거
      if (
        finalForm.passwordEntry.guardianPassword === "" &&
        finalForm.passwordEntry.guardianPasswordConfirm === ""
      ) {
        (finalForm as any).passwordEntry = undefined;
      }

      console.log("finalForm", finalForm);

      if (mode === "register") {
        // 등록 로직
        createMember(finalForm, {
          onSuccess: () => {
            showToast({
              data: {
                message: `${form.name} 님의 정보가 등록되었어요`,
                type: "success",
                variant: "pc",
              },
              autoClose: 1500,
              hideProgressBar: true,
            });
            navigate("/member");
          },
        });
      } else if (mode === "edit") {
        console.log("edit form", finalForm);

        updateMember(
          { id: memberId, data: finalForm },
          {
            onSuccess: () => {
              showToast({
                data: {
                  message: `${form.name} 님의 정보가 수정되었어요`,
                  type: "success",
                  variant: "pc",
                },
                autoClose: 1500,
                hideProgressBar: true,
              });
              navigate("/member");
            },
          }
        );
      }
    } catch (error) {
      showToast({
        data: {
          message: "처리 중 오류가 발생했습니다.",
          type: "error",
          variant: "pc",
        },
      });
    }
  };

  return {
    // 폼
    form,
    imageFiles,

    // 버튼 활성화 여부
    handleIsFormFilled,

    // 폼 제출 시 에러 검증
    handleFormErrorCheck,

    // 마지막 제출 함수
    handleSubmit,

    // 개별 필드 업데이트 함수들
    updateMemberInfo,
    updateGuardianInfo,
    updateAcceptReport,
    updatePasswordField,

    // 이미지 파일 업데이트 함수들
    updateMemberAvatarFile,
    updateGuardianAvatarFile,

    // 에러 메시지
    errors,
    showErrors,

    // 비밀번호 수정 모드 여부
    isPasswordEditMode,
    setIsPasswordEditMode,
  };
};
