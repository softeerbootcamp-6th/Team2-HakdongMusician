import { useCallback, useState } from "react";
import type { TStaff } from "@/services/staff/types";

/*
 * useImageController 커스텀 훅은
 * 프로필 이미지를 관리하는 훅입니다.
 * 이미지 선택 상태, 이미지 주소, 이미지 변경 핸들러를 관리합니다.
 *
 * 이미지 변경 버튼을 눌렀을 때 변경기능 제공
 *
 * @author 소보길
 */

export const useImageController = (
  setStaffFormData: (prev: TStaff | ((prev: TStaff) => TStaff)) => void,
  setStaffAvatarFile: (file: File | null) => void
) => {
  /*
   * 이미지 상태관리 커스텀 훅을 안만들었음
   * 후에 통합하는 과정에 만들면 좋을거 같지만 일단 상태관리를 쉽게 하려고 이렇게 함
   * selectedProfileImage: 이미지 선택 상태(true면 이미지 뜸)
   * profileImageUrl: 이미지 주소(실제 이미지 데이터)
   */
  const [selectedProfileImage, setSelectedProfileImage] =
    useState<boolean>(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  /*
   * 이미지 변경 핸들러
   * 이미지 변경 로직 구현
   * useCallback으로 메모이제이션 처리
   * ProfileImageSection는 React.memo로 메모이제이션 처리
   * 콘솔찍어서 확인
   */
  const handleImageChange = useCallback((file: File | null) => {
    if (file) {
      // 파일 유효성 검사
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 제한 (3MB)
      if (file.size > 3 * 1024 * 1024) {
        alert("파일 크기는 3MB 이하여야 합니다.");
        return;
      }

      // 이미지 URL 생성 및 상태 업데이트
      const imageUrl = URL.createObjectURL(file);
      setProfileImageUrl(imageUrl);
      setSelectedProfileImage(true);

      // formData도 함께 업데이트
      setStaffAvatarFile(file);
      setStaffFormData((prev) => ({
        ...prev,
        avatarUrl: imageUrl,
      }));
    } else {
      // 이미지 삭제 시 상태 초기화
      setProfileImageUrl("");
      setSelectedProfileImage(false);

      // formData에서도 이미지 URL 제거
      setStaffAvatarFile(null);
    }
  }, []);
  return {
    selectedProfileImage,
    setSelectedProfileImage,
    profileImageUrl,
    setProfileImageUrl,
    handleImageChange,
  };
};
