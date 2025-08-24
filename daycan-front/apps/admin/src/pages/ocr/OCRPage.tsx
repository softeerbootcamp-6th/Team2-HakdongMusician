import {
  ocrPageButtonContainer,
  ocrPageContainer,
  ocrPageContentContainer,
} from "./OCRPage.css";
import { PhotoSelectBottomSheet } from "./components/PhotoSelectBottomSheet/PhotoSelectBottomSheet";
import { useState } from "react";
import { Button } from "@daycan/ui";
import { CareSheetListItem } from "./components/CareSheetListItem";
import { emptyCareSheetList } from "./constants/dummy";
import { MobileFunnelHeader } from "@/components/MobileFunnelHeader";
import { useNavigate } from "react-router-dom";
import { MobileEmptyState } from "@/components/MobileEmptyState";
// import { emptyCareSheetList } from "./constants/dummy"; // 빈 상태 테스트 시 사용

export const OCRPage = () => {
  const navigate = useNavigate();
  const [isPhotoSelectBottomSheetOpen, setIsPhotoSelectBottomSheetOpen] =
    useState(false);

  // 개발용 더미 데이터 사용 (실제 데이터가 없을 때)
  // 빈 상태를 테스트하려면 위에서 emptyCareSheetList를 import하고 mockCareSheetList 대신 사용하세요
  const displayData = emptyCareSheetList;

  return (
    <>
      <div className={ocrPageContainer}>
        <MobileFunnelHeader
          title="OCR 등록 기록지"
          onPrev={() => {
            navigate("/care-sheet/new");
          }}
        />
        <div className={ocrPageContentContainer}>
          {displayData.length === 0 ? (
            <MobileEmptyState
              title="OCR 기록지가 없습니다"
              description="OCR 기록지가 없거나 아직 등록되지 않았습니다."
              icon="📸"
            />
          ) : (
            displayData.map((careSheet) => {
              return (
                <CareSheetListItem
                  key={careSheet.careSheetId}
                  careSheet={careSheet}
                />
              );
            })
          )}
        </div>

        <PhotoSelectBottomSheet
          isBottomSheetOpen={isPhotoSelectBottomSheetOpen}
          setIsBottomSheetOpen={setIsPhotoSelectBottomSheetOpen}
        />
      </div>
      <div className={ocrPageButtonContainer}>
        <Button
          variant="primary"
          size="fullWidth"
          onClick={() => setIsPhotoSelectBottomSheetOpen(true)}
        >
          사진 등록
        </Button>
      </div>
    </>
  );
};
