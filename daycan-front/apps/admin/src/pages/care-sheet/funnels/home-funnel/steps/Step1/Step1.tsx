import { Body, COLORS, HighlightingHeading, Icon } from "@daycan/ui";
import {
  careSheetPageContainer,
  careSheetPageContent,
  careSheetPageContentTitleContainer,
} from "../Step0/Step0.css";
import { Header, WritingMethodCard } from "../../components";
import { StepButtons } from "../../../../components/StepButtons";
import pictureMethod from "@/assets/png/picture-method.png";
import selectMethod from "@/assets/png/select-method.png";
import { useFunnel } from "@daycan/hooks";
import { getStaffName } from "../../utils/parseData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  todayWritedCareSheetContainer,
  todayWritedCareSheetTitle,
} from "./Step1.css";

import { useGetCareSheetListQuery } from "@/services/careSheet/useCareSheetQuery";
import { CareSheetListItem } from "@/pages/care-sheet-today/components/CareSheetListItem";
import { TODAY_DATE } from "@/utils/dateFormatter";
import { useAtomValue } from "jotai";
import { homeFunnelDataAtom } from "../../atoms/homeAtom";

// localStorage 키 상수
const RECENT_METHOD_KEY = "careSheet:recentMethod";

export const Step1 = () => {
  const navigate = useNavigate();
  const { toPrev, toNext, funnelState } = useFunnel();
  const [recentMethod, setRecentMethod] = useState<string | null>(null);
  const homeFunnelData = useAtomValue(homeFunnelDataAtom);
  // 작성자 이름 가져오기
  const staffName = getStaffName(funnelState);

  const { data: careSheetList } = useGetCareSheetListQuery(
    TODAY_DATE,
    funnelState?.STEP_0?.selectedStaff?.staffId || funnelState?.STEP_0?.writerId
  );
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
    toNext();

    if (method === "direct") {
      navigate("/care-sheet/new/info");
    } else {
      navigate("/care-sheet/new/ocr");
    }
  };

  return (
    <>
      <div className={careSheetPageContainer}>
        <Header />
        <div className={careSheetPageContent}>
          <div className={careSheetPageContentTitleContainer}>
            <HighlightingHeading text={`${staffName}님!`} />
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
          <div className={todayWritedCareSheetContainer}>
            <div
              className={todayWritedCareSheetTitle}
              onClick={() => {
                if (funnelState?.STEP_0?.writerId) {
                  navigate(
                    `/care-sheet/new/today/${funnelState?.STEP_0?.writerId}`
                  );
                } else {
                  `/care-sheet/new/today/${homeFunnelData?.writerId}`;
                }
              }}
            >
              <Body type="medium" weight={600} color={COLORS.gray[600]}>
                오늘 작성한 기록지
              </Body>
              <Icon
                name="chevronRight"
                width={24}
                height={24}
                color={COLORS.gray[50]}
                stroke={COLORS.gray[600]}
              />
            </div>
            {careSheetList?.map((careSheet) => (
              <CareSheetListItem careSheet={careSheet} />
            ))}
          </div>
        </div>
      </div>
      <StepButtons onPrev={toPrev} />
    </>
  );
};
