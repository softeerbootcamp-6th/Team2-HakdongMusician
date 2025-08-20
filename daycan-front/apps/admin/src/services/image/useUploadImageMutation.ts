import { useMutation } from "@tanstack/react-query";
import { uploadImages, uploadSingleImage } from ".";

/**
 * 이미지 업로드 뮤테이션 훅
 * @author 홍규진
 */
export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      await uploadImages(files);
    },
    meta: { successMessage: "이미지 업로드 완료" },
  });
};

/**
 * 단일 이미지 업로드 뮤테이션 훅
 * @author 소보길
 */
export const useUploadImageSingleMutation = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      return await uploadSingleImage(file);
    },
  });
};
