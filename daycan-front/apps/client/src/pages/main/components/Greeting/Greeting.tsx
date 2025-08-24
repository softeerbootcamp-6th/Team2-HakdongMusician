import { COLORS, Heading, HighlightingHeading } from "@daycan/ui";
import {
  greeting,
  greetingWithAnimation,
  envelopeImageStyle,
  envelopeImageWithAnimation,
  greetingText,
} from "./Greeting.css";
import envelopeImage from "@/assets/png/envelope.png";
import openedEnvelopeImage from "@/assets/png/envelope_opened.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DailyReportModal } from "../DailyReportModal/DailyReportModal";
interface GreetingProps {
  parentName: string;
  isReportArrived: boolean;
}

export const Greeting = ({ parentName, isReportArrived }: GreetingProps) => {
  const navigate = useNavigate();
  const [isDailyReportModalOpen, setIsDailyReportModalOpen] = useState(false);
  return (
    <>
      <div
        className={`${isReportArrived ? greetingWithAnimation : greeting}`}
        onClick={() => {
          if (isReportArrived) {
            navigate("/to-daily-report");
          } else {
            setIsDailyReportModalOpen(true);
          }
        }}
      >
        {/* 편지 이미지 (애니메이션 적용) */}
        <div
          className={
            isReportArrived ? envelopeImageWithAnimation : envelopeImageStyle
          }
          style={{
            backgroundImage: `url(${isReportArrived ? envelopeImage : openedEnvelopeImage})`,
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
            {isReportArrived ? "리포트가 도착했어요!" : "리포트를 확인했어요!"}
          </Heading>
        </div>
      </div>
      <DailyReportModal
        isOpen={isDailyReportModalOpen}
        onClose={() => setIsDailyReportModalOpen(false)}
        onAgain={() => {
          setIsDailyReportModalOpen(false);
          navigate("/to-daily-report");
        }}
      />
    </>
  );
};
