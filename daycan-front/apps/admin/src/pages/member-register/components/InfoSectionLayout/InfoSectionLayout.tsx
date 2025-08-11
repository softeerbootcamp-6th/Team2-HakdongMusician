import { Body, Heading, Icon, COLORS } from "@daycan/ui";
import { Button } from "@daycan/ui";
import {
  infoSectionLayoutContainer,
  infoSectionLayoutContent,
  infoSectionLayoutProfile,
  infoSectionLayoutProfileHeader,
  infoSectionLayoutProfileImage,
  infoSectionLayoutProfilePlaceholder,
  infoSectionLayoutDeleteButton,
} from "./InfoSectionLayout.css";
import { useImageController } from "../../hooks/useImageController";

/*
 * InfoSectionLayoutProps 타입
 * title: 정보 입력 컴포넌트 제목
 * profileImage: 프로필 이미지
 * children: 보호자 혹은 수급자 정보 입력 컴포넌트
 * onImageChange: 이벤트 발생시 부모의 함수 호출
 */

interface InfoSectionLayoutProps {
  title: string;
  profileImage?: string;
  children: React.ReactNode;
  onImageChange?: (file: File | null) => void;
}

export const InfoSectionLayout = ({
  title,
  profileImage,
  children,
  onImageChange,
}: InfoSectionLayoutProps) => {
  const {
    selectedImage,
    isDragOver,
    fileInputRef,
    handleImageChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleChangeButtonClick,
    handleDeleteImage,
  } = useImageController({
    initialImage: profileImage,
    onImageChange,
  });

  return (
    <div className={infoSectionLayoutContainer}>
      <Heading type="large" weight={600}>
        {title}
      </Heading>
      <div className={infoSectionLayoutContent}>
        <div className={infoSectionLayoutProfile}>
          <div className={infoSectionLayoutProfileHeader}>
            <Body>프로필 이미지</Body>
            {selectedImage && (
              <Button
                size="small"
                variant="primary"
                onClick={handleChangeButtonClick}
              >
                변경
              </Button>
            )}
          </div>

          {selectedImage ? (
            <div style={{ position: "relative" }}>
              <img
                src={selectedImage}
                alt="profile"
                className={infoSectionLayoutProfileImage}
                onClick={handleChangeButtonClick}
                style={{ cursor: "pointer" }}
              />
              <div className={infoSectionLayoutDeleteButton}>
                <Icon
                  onClick={handleDeleteImage}
                  name="photoDeleteButton"
                  width={20}
                  height={20}
                  color="white"
                />
              </div>
            </div>
          ) : (
            <div
              className={infoSectionLayoutProfilePlaceholder}
              onClick={handleChangeButtonClick}
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Icon name="photoAlternate" width={48} height={48} />
              <Body
                type="xsmall"
                weight={400}
                style={{
                  color: isDragOver ? COLORS.blue[500] : COLORS.gray[500],
                  textAlign: "center",
                  marginTop: "7px",
                }}
              >
                {isDragOver
                  ? "여기에 파일을 놓으세요"
                  : "파일을 선택 또는 드래그앤드롭"}
              </Body>
            </div>
          )}

          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
