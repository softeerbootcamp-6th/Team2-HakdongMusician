/**
 * 이미지 파일 유효성 검사 및 처리 유틸리티
 */

export interface ImageValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * 이미지 파일 유효성 검사
 * @param file - 검사할 이미지 파일
 * @returns 유효성 검사 결과
 */
export const validateImageFile = (file: File): ImageValidationResult => {
  // 허용된 이미지 형식 검사
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      errorMessage: "JPG, JPEG, PNG 파일만 선택할 수 있습니다.",
    };
  }

  // 파일 크기 제한 (3MB)
  if (file.size > 3 * 1024 * 1024) {
    return {
      isValid: false,
      errorMessage: "파일 크기는 3MB 이하여야 합니다.",
    };
  }

  return { isValid: true };
};

/**
 * 이미지 파일을 로컬 URL로 변환
 * @param file - 변환할 이미지 파일
 * @returns 로컬 URL 문자열
 */
export const createImagePreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * 이미지 파일 처리 (검증 + URL 생성)
 * @param file - 처리할 이미지 파일
 * @param onSuccess - 성공 시 콜백 (URL 전달)
 * @param onError - 에러 시 콜백 (에러 메시지 전달)
 */
export const processImageFile = (
  file: File,
  onSuccess: (url: string) => void,
  onError: (message: string) => void
): void => {
  const validation = validateImageFile(file);

  if (!validation.isValid) {
    onError(validation.errorMessage!);
    return;
  }

  const imageUrl = createImagePreviewUrl(file);
  onSuccess(imageUrl);
};
