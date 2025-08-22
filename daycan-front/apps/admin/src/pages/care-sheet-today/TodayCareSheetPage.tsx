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
import {
  useGetCareSheetListQuery,
  useGetCareSheetDetailQuery,
} from "@/services/careSheet/useCareSheetQuery";
import { useSetAtom } from "jotai";
import { homeFunnelDataAtom } from "../care-sheet/funnels/home-funnel/atoms/homeAtom";
import { infoFunnelDataAtom } from "../care-sheet/funnels/info-funnel/atoms/infoAtom";
import { diagnosisFunnelDataAtom } from "../care-sheet/funnels/diagnosis-funnel/atoms/diagnosisAtom";
import { prefillCareSheetData } from "@/utils/careSheetPrefill";
import { useEffect, useState } from "react";
import type { YearMonthDay } from "@/types/date";

export const TodayCareSheetPage = () => {
  const navigate = useNavigate();
  const { writerId } = useParams();
  const [selectedCareSheet, setSelectedCareSheet] = useState<{
    date: YearMonthDay;
    memberId: number;
  } | null>(null);

  // URL 파라미터에서 writerId 가져오기
  console.log("URL에서 가져온 writerId:", writerId);

  const { data: careSheetList } = useGetCareSheetListQuery(
    TODAY_DATE,
    writerId ? parseInt(writerId) : undefined
  );

  // 선택된 기록지 상세 데이터 조회
  const { data: careSheetDetail } = useGetCareSheetDetailQuery(
    selectedCareSheet?.date!,
    selectedCareSheet?.memberId!,
    !!selectedCareSheet
  );

  // Jotai setter 함수들
  const setHomeFunnelData = useSetAtom(homeFunnelDataAtom);
  const setInfoFunnelData = useSetAtom(infoFunnelDataAtom);
  const setDiagnosisFunnelData = useSetAtom(diagnosisFunnelDataAtom);

  // 기록지 클릭 핸들러
  const handleCareSheetClick = (date: YearMonthDay, memberId: number) => {
    setSelectedCareSheet({ date, memberId });
  };

  // careSheetDetail이 로드되면 prefill 실행
  useEffect(() => {
    if (careSheetDetail && selectedCareSheet) {
      prefillCareSheetData(
        careSheetDetail,
        setHomeFunnelData,
        setInfoFunnelData,
        setDiagnosisFunnelData
      );
      // prefill 완료 후 navigate
      navigate(`/care-sheet/new/diagnosis`);
      // 상태 초기화
      setSelectedCareSheet(null);
    }
  }, [
    careSheetDetail,
    selectedCareSheet,
    setHomeFunnelData,
    setInfoFunnelData,
    setDiagnosisFunnelData,
    navigate,
  ]);

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
                  key={careSheet.memberMeta.memberId}
                  todayCareSheet={careSheet}
                  onCareSheetClick={handleCareSheetClick}
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
