import { useState, useRef } from "react";
import { processImageFile } from "@/utils";
import { useToast } from "@daycan/ui";

interface UseImageControllerProps {
  initialImage?: string;
  onImageChange?: (file: File | null) => void;
}

export const useImageController = ({
  initialImage = "",
  onImageChange,
}: UseImageControllerProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(initialImage);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { showToast } = useToast();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(
        file,
        (imageUrl) => {
          setSelectedImage(imageUrl);
          if (onImageChange) {
            onImageChange(file);
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
      processImageFile(
        file,
        (imageUrl) => {
          setSelectedImage(imageUrl);
          if (onImageChange) {
            onImageChange(file);
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
