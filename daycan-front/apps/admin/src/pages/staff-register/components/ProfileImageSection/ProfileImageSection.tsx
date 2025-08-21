import { Body, Button, Icon } from "@daycan/ui";
import { ImagePlaceholder } from "../ImagePlaceholder";
import {
  profileImageSectionContainer,
  profileImageSectionHeader,
  profileImageSectionImage,
  profileImageSectionDeleteButton,
  dragDropArea,
  dragOverArea,
  dragDropText,
} from "./ProfileImageSection.css";
import { useRef, useCallback } from "react";
import React from "react";
import { useImageDragAndDrop } from "../../hooks/useImageDragAndDrop";

interface ProfileImageSectionProps {
  selectedProfileImage: boolean;
  profileImageUrl?: string;
  onImageChange: (file: File | null) => void;
}

/*
 * ProfileImageSection은 이미지를 불러오기 때문에
 * 무분별한 리렌더링은 좋지 않다 판단.
 * 따라서 React.memo로 메모이제이션 처리
 * 근데 후에 tanstack query 사용할때 서버상태를 저장하면
 * 바뀔 수도 있다 생각
 */
export const ProfileImageSection = React.memo(
  ({
    selectedProfileImage,
    profileImageUrl,
    onImageChange,
  }: ProfileImageSectionProps) => {
    const handleImageDelete = () => {
      onImageChange(null);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    // 드래그 앤 드롭 훅 사용
    const {
      isDragOver,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleFileSelect,
    } = useImageDragAndDrop({ onImageChange });

    const handleFileInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          handleFileSelect(file);
        }
      },
      [handleFileSelect]
    );

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className={profileImageSectionContainer}>
        <div className={profileImageSectionHeader}>
          <Body>프로필 이미지</Body>
          {selectedProfileImage && profileImageUrl && (
            <Button size="small" variant="primary" onClick={handleButtonClick}>
              변경
            </Button>
          )}
        </div>

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: "none" }}
        />

        {selectedProfileImage && profileImageUrl ? (
          <div style={{ position: "relative" }}>
            <img
              src={profileImageUrl || "/src/assets/images/emptyProfile.png"}
              alt="profile"
              className={profileImageSectionImage}
            />
            <div className={profileImageSectionDeleteButton}>
              <Icon
                onClick={handleImageDelete}
                name="photoDeleteButton"
                width={20}
                height={20}
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className={`${dragDropArea} ${isDragOver ? dragOverArea : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleButtonClick}
          >
            <ImagePlaceholder />
            {isDragOver && (
              <div className={dragDropText}>이미지를 여기에 놓으세요</div>
            )}
          </div>
        )}
      </div>
    );
  }
);
