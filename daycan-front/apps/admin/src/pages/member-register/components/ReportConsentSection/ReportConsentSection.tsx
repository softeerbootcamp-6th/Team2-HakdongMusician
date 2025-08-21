import { Body, COLORS, Heading, Icon } from "@daycan/ui";
import { AcceptReportInfoModal } from "../AcceptReportInfoModal";
import { useState } from "react";
import {
  reportConsentSectionContainer,
  reportConsentSectionContent,
  reportConsentSectionLeftContent,
} from "./ReportConsentSection.css";

interface ReportConsentSectionProps {
  isConsented: boolean;
  onConsentToggle: () => void;
}

export const ReportConsentSection = ({
  isConsented,
  onConsentToggle,
}: ReportConsentSectionProps) => {
  const [isReportConsentModalOpen, setIsReportConsentModalOpen] =
    useState(false);

  const handleInfoModalOpen = () => {
    setIsReportConsentModalOpen(true);
  };

  const handleInfoModalClose = () => {
    setIsReportConsentModalOpen(false);
  };

  return (
    <>
      <div className={reportConsentSectionContainer}>
        <Heading>리포트 수신 여부</Heading>
        <div className={reportConsentSectionContent}>
          <div className={reportConsentSectionLeftContent}>
            <Icon
              name="circleCheck"
              stroke={isConsented ? COLORS.gray[700] : COLORS.gray[400]}
              width={48}
              height={48}
              onClick={onConsentToggle}
              style={{ cursor: "pointer" }}
              color={isConsented ? COLORS.primary[300] : COLORS.gray[200]}
            />
            <Body type="small" weight={600}>
              수급자 정보 리포트 수신 동의 (선택)
            </Body>
          </div>
          <Icon
            name="arrowRight"
            width={24}
            height={24}
            onClick={handleInfoModalOpen}
            color={COLORS.white}
            stroke={COLORS.gray[700]}
          />
        </div>
      </div>

      <AcceptReportInfoModal
        isOpen={isReportConsentModalOpen}
        onClose={handleInfoModalClose}
      />
    </>
  );
};
