import { useState, useCallback } from "react";

interface UseImageDragAndDropProps {
  onImageChange: (file: File | null) => void;
}

/*
 * useImageDragAndDrop 커스텀 훅은
 * 프로필 이미지를 드래그앤드롭으로 변경하는 기능을 관리하는 훅입니다.
 *
 * 이미지 변경을 드래그앤 드롭으로 하는 기능
 *
 * @author 소보길
 */

export const useImageDragAndDrop = ({
  onImageChange,
}: UseImageDragAndDropProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        onImageChange(file);
      } else {
        alert("이미지 파일만 선택 가능합니다.");
      }
    },
    [onImageChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  return {
    isDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
  };
};
