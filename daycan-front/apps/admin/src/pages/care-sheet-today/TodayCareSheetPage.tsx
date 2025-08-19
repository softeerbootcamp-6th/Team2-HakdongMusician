import { MobileFunnelHeader } from "@/components/MobileFunnelHeader";
import {
  todayCareSheetPageContainer,
  todayCareSheetPageContentContainer,
} from "./TodayCareSheetPage.css";
import { CareSheetListItem } from "./components/CareSheetListItem";
import { MobileEmptyState } from "@/components/MobileEmptyState";
import { emptyCareSheetList } from "./constants/dummy";
import { useNavigate, useParams } from "react-router-dom";
import { StepButtons } from "../care-sheet/components/StepButtons";
import { TODAY_DATE } from "@/utils/dateFormatter";
import { useGetCareSheetListQuery } from "@/services/careSheet/useCareSheetQuery";

export const TodayCareSheetPage = () => {
  const navigate = useNavigate();
  const { writerId } = useParams();

  // URL 파라미터에서 writerId 가져오기
  console.log("URL에서 가져온 writerId:", writerId);

  const { data: careSheetList } = useGetCareSheetListQuery(
    TODAY_DATE,
    writerId ? parseInt(writerId) : undefined
  );

  // 개발용 더미 데이터 사용 (실제 데이터가 없을 때)
  // 빈 상태를 테스트하려면 위에서 emptyCareSheetList를 import하고 mockCareSheetList 대신 사용하세요
  const displayData = careSheetList || emptyCareSheetList;

  return (
    <>
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
      </div>
      <StepButtons
        onPrev={() => {
          navigate("/care-sheet/new");
        }}
      />
    </>
  );
};
