import { useState, useRef, useEffect } from "react";
import { processImageFile } from "@/utils";
import { useToast } from "@daycan/ui";

interface UseImageControllerProps {
  profileImage?: string | null;
  onImageChange?: (file: File[] | null) => void;
}

export const useImageController = ({
  profileImage,
  onImageChange,
}: UseImageControllerProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    profileImage || ""
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { showToast } = useToast();

  // profileImage prop이 변경될 때 selectedImage 상태 동기화
  useEffect(() => {
    if (profileImage !== undefined) {
      setSelectedImage(profileImage || null);
    }
  }, [profileImage]);

  // 이미지 변경 처리 함수
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 로컬에서 미리보기용으로 처리
      processImageFile(
        file,
        (imageUrl) => {
          setSelectedImage(imageUrl);
        },
        (errorMessage) => {
          showToast({
            data: {
              message: errorMessage,
              type: "error",
              variant: "pc",
            },
          });
        }
      );
      console.log("file", file);
      if (onImageChange) {
        onImageChange([file]); // File 객체를 폼에 전달
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // 드래그앤드롭으로도 동일하게 처리
      processImageFile(
        file,
        (imageUrl) => {
          setSelectedImage(imageUrl);
          if (onImageChange) {
            onImageChange([file]); // File 객체를 폼에 전달
          }
        },
        (errorMessage) => {
          showToast({
            data: {
              message: errorMessage,
              type: "error",
              variant: "pc",
            },
            autoClose: 1500,
            hideProgressBar: true,
          });
        }
      );
    }
  };

  const handleChangeButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    setSelectedImage("");
    if (onImageChange) {
      onImageChange(null);
    }
  };

  return {
    selectedImage,
    isDragOver,
    fileInputRef,
    handleImageChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleChangeButtonClick,
    handleDeleteImage,
  };
};
