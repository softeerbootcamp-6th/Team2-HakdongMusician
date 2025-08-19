import { useMutation } from "@tanstack/react-query";
import { uploadImages } from ".";

/**
 * 이미지 업로드 뮤테이션 훅
 * @author 홍규진
 */
export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      return await uploadImages(files);
    },
    meta: { successMessage: "이미지 업로드 완료" },
  });
};
