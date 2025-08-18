import { useGetCareSheetList } from "@/services/careSheet/useCareSheetQuery";
import { MobileFunnelHeader } from "@/components/MobileFunnelHeader";
import {
  todayCareSheetPageContainer,
  todayCareSheetPageContentContainer,
} from "./TodayCareSheetPage.css";
import { useAtomValue } from "jotai";
import { homeFunnelDataAtom } from "../care-sheet/funnels/home-funnel/atoms/homeAtom";
import { CareSheetListItem } from "./components/CareSheetListItem";
import { MobileEmptyState } from "@/components/MobileEmptyState";
import { mockCareSheetList } from "./constants/dummy";
import { useNavigate } from "react-router-dom";
import { StepButtons } from "../care-sheet/components/StepButtons";
import { TODAY_DATE } from "@/utils/dateFormatter";

export const TodayCareSheetPage = () => {
  const navigate = useNavigate();
  const homeFunnelData = useAtomValue(homeFunnelDataAtom);

  const { data: careSheetList } = useGetCareSheetList(
    TODAY_DATE,
    homeFunnelData?.writerId
  );

  // 개발용 더미 데이터 사용 (실제 데이터가 없을 때)
  // 빈 상태를 테스트하려면 위에서 emptyCareSheetList를 import하고 mockCareSheetList 대신 사용하세요
  const displayData = careSheetList || mockCareSheetList;

  return (
    <div className={todayCareSheetPageContainer}>
      <MobileFunnelHeader
        title="오늘 작성한 기록지"
        onPrev={() => {
          navigate("/care-sheet/new");
        }}
      />
      <div className={todayCareSheetPageContentContainer}>
        {displayData.length === 0 ? (
          <MobileEmptyState
            title="등록된 기록지가 없습니다"
            description="오늘 작성된 기록지가 없거나 아직 등록되지 않았습니다."
            icon="📝"
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
      <StepButtons
        onPrev={() => {
          navigate("/care-sheet/new");
        }}
      />
    </div>
  );
};
