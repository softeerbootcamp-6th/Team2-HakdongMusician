import { useState } from "react";
import {
  SummaryCard,
  RecordCheckCard,
  InfoModal,
  Greeting,
} from "./components";
import { Footer, Header } from "@/components";
import { container } from "./MainPage.css";

export const MainPage = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  return (
    <div className={container}>
      {/* 헤더 */}
      <Header />

      {/* 000 보호자님 리포트가 도착했어요! */}
      <Greeting parentName="홍큐티빠티스껄" isReportArrived={true} />

      {/* 이번 주 건강 요약하기 */}
      <SummaryCard
        startDate="7월 15일"
        endDate="7월 23일"
        healthIndex={8}
        healthIndexChange="down"
        healthDescription="안정적인 한 주였어요."
        gaugeValue={40}
        onClickInfoModal={() => setIsInfoModalOpen(true)}
      />

      {/* 기록 확인하기 */}
      <RecordCheckCard />

      {/* 푸터 */}
      <Footer />

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
};
