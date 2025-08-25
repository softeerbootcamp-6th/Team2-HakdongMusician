import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@daycan/ui";
import { useGetMemberDetailQuery } from "@/services/member/useMemberQuery";
import type { TMemberCreateRequest } from "@/services/member/types";
import {
  useCreateMemberMutation,
  useUpdateMemberMutation,
} from "@/services/member/useMemberMutation";
import { useUploadImageSingleMutation } from "@/services/image/useUploadImageMutation";
import { getMemberFormFieldErrors } from "../utils/memberFormValidation";

/*
 * useMemberRegisterForm 커스텀 훅은 수급자 등록, 수정 페이지의 폼 상태 관리와 제출 처리를 담당합니다.
 * 폼 상태 관리, 폼 제출 데이터 준비, 폼 제출 처리, 폼 제출 시 에러 검증, 폼 제출 버튼 활성화 여부를 담당합니다.
 *
 * 이미지를 file을 저장하고 있다가 수정, 등록 요청을 보낼때 s3에 업로드 합니다.
 * @author 소보길
 */

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
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );
  const [showErrorMessages, setShowErrorMessages] = useState(false);
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

  // 이미지 파일 상태 추가
  const [imageFiles, setImageFiles] = useState<{
    memberAvatar: File | null;
    guardianAvatar: File | null;
  }>({
    memberAvatar: null,
    guardianAvatar: null,
  });

  // 수정 모드에서 초기 데이터와 비교하기 위한 ref
  const initialFormDataRef = useRef<TMemberCreateRequest | null>(null);

  // 데이터 로딩 상태 관리 개선
  const { data: memberExistData } = useGetMemberDetailQuery(memberId);

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

      setForm(updatedForm);
      // 초기 데이터 ref 업데이트
      initialFormDataRef.current = updatedForm;
    }
  }, [mode, memberId, memberExistData]);

  // useEffect 의존성 배열 수정
  useEffect(() => {
    if (mode === "edit" && memberExistData) {
      getInitialData();
    }
  }, [mode, memberExistData, getInitialData]);

  // 통합된 필드 업데이트 핸들러
  const handleFieldUpdate = (
    field: string,
    value: string | number | boolean,
    section?: "passwordEntry" | "root"
  ) => {
    if (section === "passwordEntry") {
      setForm((prev) => ({
        ...prev,
        passwordEntry: {
          ...prev.passwordEntry,
          [field]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  // 이미지 파일 업데이트 함수들
  const updateMemberAvatarFile = (file: File | null) => {
    setImageFiles((prev) => ({ ...prev, memberAvatar: file }));
  };

  const updateGuardianAvatarFile = (file: File | null) => {
    setImageFiles((prev) => ({ ...prev, guardianAvatar: file }));
  };

  // 수정 모드에서 폼 데이터가 변경되었는지 확인
  const hasFormChanged = useCallback(() => {
    if (mode !== "edit" || !initialFormDataRef.current) return false;
    const initial = initialFormDataRef.current;
    const current = form;

    const fieldsToCompare = [
      "name",
      "gender",
      "birthDate",
      "careLevel",
      "careNumber",
      "avatarUrl",
      "guardianName",
      "guardianRelation",
      "guardianBirthDate",
      "guardianPhoneNumber",
      "guardianAvatarUrl",
      "reportConsent",
      "passwordEntry",
    ];

    return fieldsToCompare.some((field) => {
      const fieldKey = field as keyof TMemberCreateRequest;
      if (fieldKey === "passwordEntry") {
        // passwordEntry는 별도 처리
        return (
          initial.passwordEntry.guardianPassword !==
            current.passwordEntry.guardianPassword ||
          initial.passwordEntry.guardianPasswordConfirm !==
            current.passwordEntry.guardianPasswordConfirm
        );
      }
      return initial[fieldKey] !== current[fieldKey];
    });
  }, [mode, form]);

  // 폼 제출 데이터를 API 요청용으로 변환하는 함수
  const prepareFormDataForSubmission = useCallback(async () => {
    let finalForm = { ...form };

    // 수급자 이미지 처리
    if (imageFiles.memberAvatar) {
      try {
        const result = await uploadSingleImage(imageFiles.memberAvatar);
        finalForm.avatarUrl = result.objectKey;
      } catch (error) {
        console.error("수급자 이미지 업로드 실패:", error);
        throw new Error("수급자 이미지 업로드에 실패했습니다.");
      }
    } else if (
      mode === "edit" &&
      initialFormDataRef.current &&
      form.avatarUrl === initialFormDataRef.current.avatarUrl
    ) {
      // 수정 모드이고 기존 이미지와 동일한 경우 avatarUrl 삭제
      delete (finalForm as any).avatarUrl;
    }

    // 보호자 이미지 처리
    if (imageFiles.guardianAvatar) {
      try {
        const result = await uploadSingleImage(imageFiles.guardianAvatar);
        finalForm.guardianAvatarUrl = result.objectKey;
      } catch (error) {
        console.error("보호자 이미지 업로드 실패:", error);
        throw new Error("보호자 이미지 업로드에 실패했습니다.");
      }
    } else if (
      mode === "edit" &&
      initialFormDataRef.current &&
      form.guardianAvatarUrl === initialFormDataRef.current.guardianAvatarUrl
    ) {
      // 수정 모드이고 기존 이미지와 동일한 경우 guardianAvatarUrl 삭제
      delete (finalForm as any).guardianAvatarUrl;
    }

    // passwordEntry의 모든 값이 빈 문자열이면 passwordEntry 자체를 제거
    if (
      finalForm.passwordEntry.guardianPassword === "" &&
      finalForm.passwordEntry.guardianPasswordConfirm === ""
    ) {
      (finalForm as any).passwordEntry = undefined;
    }

    return finalForm;
  }, [form, imageFiles, mode, uploadSingleImage]);

  // 폼 제출 버튼 활성화 여부
  const handleIsFormFilled = useCallback(() => {
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
    };

    // 등록 모드에서만 passwordEntry 검증
    if (mode === "register") {
      (requiredFields as any).passwordEntry =
        form.passwordEntry.guardianPassword !== "" &&
        form.passwordEntry.guardianPasswordConfirm !== "";
    }

    const isFilled = Object.values(requiredFields).every(Boolean);

    // 수정 모드의 경우 변경사항이 있는지도 확인
    return mode === "register" ? isFilled : isFilled && hasFormChanged();
  }, [form, mode, hasFormChanged]);

  // 폼 제출 시 에러 검증
  const handleFormErrorCheck = () => {
    const fieldErrors = getMemberFormFieldErrors(
      form,
      mode,
      isPasswordEditMode
    );
    setErrorMessages(fieldErrors);
    setShowErrorMessages(true);

    if (Object.keys(fieldErrors).length === 0) {
      handleSubmit();
    }
  };

  // 마지막 제출 함수 개선
  const handleSubmit = async () => {
    form.passwordEntry.passwordConfirmed = true;
    const submissionData = await prepareFormDataForSubmission();

    console.log("finalForm", submissionData);

    if (mode === "register") {
      await handleMemberRegistration(submissionData);
    } else if (mode === "edit") {
      await handleMemberUpdate(submissionData);
    }
  };

  // 수급자 등록 처리
  const handleMemberRegistration = async (
    submissionData: TMemberCreateRequest
  ) => {
    createMember(submissionData, {
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
  };

  // 수급자 수정 처리
  const handleMemberUpdate = async (submissionData: TMemberCreateRequest) => {
    console.log("edit form", submissionData);

    updateMember(
      { id: memberId, data: submissionData },
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

    // 통합된 필드 업데이트 핸들러
    handleFieldUpdate,

    // 이미지 파일 업데이트 함수들
    updateMemberAvatarFile,
    updateGuardianAvatarFile,

    // 에러 메시지
    errorMessages,
    showErrorMessages,

    // 비밀번호 수정 모드 여부
    isPasswordEditMode,
    setIsPasswordEditMode,
  };
};
