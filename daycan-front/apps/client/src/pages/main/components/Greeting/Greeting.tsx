import { COLORS, Heading, HighlightingHeading } from "@daycan/ui";
import { greetingText } from "./Greeting.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DailyReportModal } from "../DailyReportModal/DailyReportModal";
import { REPORT_STATUS_CONFIG } from "../../constants";

interface GreetingProps {
  parentName: string;
  isReportArrived: boolean | null | undefined;
}

export const Greeting = ({ parentName, isReportArrived }: GreetingProps) => {
  const navigate = useNavigate();
  const [isDailyReportModalOpen, setIsDailyReportModalOpen] = useState(false);

  // 현재 상태에 따른 설정 가져오기
  const currentConfig =
    REPORT_STATUS_CONFIG[
      String(isReportArrived) as keyof typeof REPORT_STATUS_CONFIG
    ];

  const handleClick = () => {
    if (currentConfig.action === "navigate") {
      // 새로운 리포트 도착 - 리포트 작성 페이지로 이동
      navigate("/to-daily-report");
    } else {
      // 모달 표시
      setIsDailyReportModalOpen(true);
    }
  };

  return (
    <>
      <div className={currentConfig.containerClassName} onClick={handleClick}>
        {/* 편지 이미지 (애니메이션 적용) */}
        <div
          className={currentConfig.envelopeClassName}
          style={{
            backgroundImage: `url(${currentConfig.envelopeImage})`,
            zIndex: 0,
          }}
        />
        <div className={greetingText}>
          <HighlightingHeading text={parentName} />
          <Heading type="medium" weight={400} color={COLORS.gray[600]}>
            보호자님!
          </Heading>
        </div>
        <div className={greetingText}>
          <Heading type="medium" weight={400} color={COLORS.gray[600]}>
            {currentConfig.greetingMessage}
          </Heading>
        </div>
      </div>
      <DailyReportModal
        isOpen={isDailyReportModalOpen}
        title={currentConfig.modalTitle}
        content={currentConfig.modalContent}
        onClose={() => setIsDailyReportModalOpen(false)}
        onAgain={
          currentConfig.showAgainButton
            ? () => {
                setIsDailyReportModalOpen(false);
                navigate("/to-daily-report");
              }
            : undefined
        }
      />
    </>
  );
};
