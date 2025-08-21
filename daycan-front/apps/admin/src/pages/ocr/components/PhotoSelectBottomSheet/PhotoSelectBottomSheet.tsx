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
  const { fileInputRef, handlePhotoMethodSelect, handleFileSelect } =
    usePhotoSelect();

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
          </div>
          <Button
            variant="unEmphasized"
            onClick={() => setIsBottomSheetOpen(false)}
            size="fullWidth"
          >
            취소
          </Button>
        </BottomSheet>
      )}
    </>
  );
};
