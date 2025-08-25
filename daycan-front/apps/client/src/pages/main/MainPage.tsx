import { useState } from "react";
import {
  SummaryCard,
  RecordCheckCard,
  InfoModal,
  Greeting,
} from "./components";
import { container } from "./MainPage.css";
import { useGetMainDataQuery } from "@/services/main/useMainQuery";
import { TODAY_DATE } from "@/utils/dateUtils";
import { Loading } from "@/components";

export const MainPage = () => {
  const SEVEN_DAYS_AGO = 7 * 24 * 60 * 60 * 1000;
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { data: mainData, isLoading } = useGetMainDataQuery(TODAY_DATE);
  const oneWeekAgo = new Date(Date.now() - SEVEN_DAYS_AGO);

  return (
    <div className={container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Greeting
            parentName={mainData?.name ?? "김수급"}
            isReportArrived={mainData?.isReportArrived}
          />
          {/* 이번 주 건강 요약하기 */}
          <SummaryCard
            startDate={new Date(oneWeekAgo).toLocaleDateString()}
            endDate={new Date().toLocaleDateString()}
            weeklyChangeAmount={mainData?.weeklyChangeAmount ?? 0}
            weeklyScore={mainData?.weeklyScore ?? 0}
            onClickInfoModal={() => setIsInfoModalOpen(true)}
          />
          {/* 기록 확인하기 */}
          <RecordCheckCard />
          <InfoModal
            isOpen={isInfoModalOpen}
            onClose={() => setIsInfoModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};
