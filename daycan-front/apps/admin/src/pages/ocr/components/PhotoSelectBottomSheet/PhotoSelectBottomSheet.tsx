import { BottomSheet, Button, COLORS, Icon, Body } from "@daycan/ui";
import { bottomSheetContent, methodCard } from "./PhotoSelectBottomSheet.css";
import { usePhotoSelect } from "./usePhotoSelect";

interface PhotoSelectBottomSheetProps {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (isBottomSheetOpen: boolean) => void;
}

export const PhotoSelectBottomSheet = ({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}: PhotoSelectBottomSheetProps) => {
  const {
    // isProcessing,
    // selectedImage,
    fileInputRef,
    // videoRef,
    // canvasRef,
    handlePhotoMethodSelect,
    handleFileSelect,
    // removeImage,
    // handleImageConfirm,
  } = usePhotoSelect();

  return (
    <>
      {/* 사진 등록 방법 선택 바텀시트 */}
      {isBottomSheetOpen && (
        <BottomSheet
          title="사진 등록"
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        >
          <div className={bottomSheetContent}>
            {/* 카메라 촬영 영역 */}
            <div
              className={methodCard}
              onClick={() => handlePhotoMethodSelect("camera")}
            >
              <Icon
                name="addPhotoByCamera"
                width={40}
                height={40}
                color={COLORS.gray[400]}
              />
              <Body type="medium" weight={600} color={COLORS.gray[600]}>
                카메라로 촬영
              </Body>
            </div>

            {/* 앨범에서 선택 영역 */}
            <div
              className={methodCard}
              onClick={() => handlePhotoMethodSelect("album")}
            >
              <Icon
                name="addPhoto"
                width={40}
                height={40}
                color={COLORS.gray[400]}
              />
              <Body type="medium" weight={600} color={COLORS.gray[600]}>
                앨범에서 선택
              </Body>
            </div>

            {/* 숨겨진 파일 입력 */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />

            {/* 카메라 영역 */}
            {/*
            {!selectedImage && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <video
                  ref={videoRef}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    display: "none",
                  }}
                  autoPlay
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />
                {videoRef.current?.srcObject && (
                  <Button
                    variant="primary"
                    onClick={capturePhoto}
                    style={{ marginTop: "10px" }}
                  >
                    사진 촬영
                  </Button>
                )}
              </div>
            )}*/}
          </div>
          {/* 선택된 이미지 표시 */}
          {/*selectedImage && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Body type="medium" weight={600} color={COLORS.gray[800]}>
                선택된 이미지
              </Body>
              <img
                src={selectedImage}
                alt="선택된 이미지"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                }}
              />
              <Button
                variant="unEmphasized"
                size="small"
                onClick={removeImage}
                style={{ marginRight: "10px" }}
              >
                다시 선택
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={handleImageConfirm}
                disabled={isProcessing}
              >
                {isProcessing ? "처리 중..." : "확인"}
              </Button>
            </div>
          )}*/}
          <Button
            variant="unEmphasized"
            onClick={() => setIsBottomSheetOpen(false)}
          >
            취소
          </Button>
        </BottomSheet>
      )}
    </>
  );
};
