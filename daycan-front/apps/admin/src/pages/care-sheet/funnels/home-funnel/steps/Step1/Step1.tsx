import { Body, COLORS, HighlightingHeading } from "@daycan/ui";
import {
  careSheetPageContainer,
  careSheetPageContent,
  careSheetPageContentTitleContainer,
} from "../Step0/Step0.css";
import { Header, WritingMethodCard } from "../../components";
import { PhotoSelectBottomSheet } from "../../components/PhotoSelectBottomSheet/PhotoSelectBottomSheet";
import { StepButtons } from "../../../../components/StepButtons";
import pictureMethod from "@/assets/png/picture-method.png";
import selectMethod from "@/assets/png/select-method.png";
import { useFunnel } from "@daycan/hooks";
import { getWriterName } from "../../utils/parseData";
import { useEffect, useState } from "react";

// localStorage 키 상수
const RECENT_METHOD_KEY = "careSheet:recentMethod";

export const Step1 = () => {
  const { toPrev, toNext, funnelState } = useFunnel();
  const [recentMethod, setRecentMethod] = useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 작성자 이름 가져오기
  const writerName = getWriterName(funnelState);

  // 컴포넌트 마운트 시 localStorage에서 최근 사용한 방법 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_METHOD_KEY);
    if (stored) {
      setRecentMethod(stored);
    }
  }, []);

  const handleMethodSelect = (method: string) => {
    // localStorage에 선택된 방법 저장
    localStorage.setItem(RECENT_METHOD_KEY, method);
    setRecentMethod(method);

    if (method === "direct") {
      toNext();
    } else {
      setIsBottomSheetOpen(true);
    }
  };

  return (
    <div className={careSheetPageContainer}>
      <Header />
      <div className={careSheetPageContent}>
        <div className={careSheetPageContentTitleContainer}>
          <HighlightingHeading text={`${writerName}님!`} />
        </div>
        <Body type="large" weight={600} color={COLORS.gray[800]}>
          어떻게 기록지를 작성할까요?
        </Body>
        <WritingMethodCard
          title="직접 입력"
          description="온라인으로 바로 활동 일지를 작성해요"
          image={selectMethod}
          isSelected={recentMethod === "direct"}
          onClick={() => {
            handleMethodSelect("direct");
          }}
        />
        <WritingMethodCard
          title="사진 등록"
          description="손으로 직접 쓴 활동일지를 찍고 업로드해요."
          image={pictureMethod}
          isSelected={recentMethod === "photo"}
          onClick={() => {
            handleMethodSelect("photo");
          }}
        />
        <PhotoSelectBottomSheet
          isBottomSheetOpen={isBottomSheetOpen}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
        />
        <StepButtons onPrev={toPrev} />
      </div>
    </div>
  );
};
