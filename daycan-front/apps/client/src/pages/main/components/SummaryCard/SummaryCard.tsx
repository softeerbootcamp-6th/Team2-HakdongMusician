import { Icon, Body, COLORS, Heading } from "@daycan/ui";
import {
  container,
  summarySection,
  healthSummary,
  indexValue,
  indexValueTitle,
  gaugeInfo,
  semiCircularGaugeContainer,
} from "./SummaryCard.css";
import { SemiCircularGaugeChart } from "@/components";

interface SummaryCardProps {
  startDate: string;
  endDate: string;
  healthIndex: number;
  healthIndexChange: "up" | "down" | "stable";
  healthDescription: string;
  gaugeValue: number;
  onClickInfoModal: () => void;
}

export const SummaryCard = ({
  startDate,
  endDate,
  healthIndex,
  healthIndexChange,
  healthDescription,
  gaugeValue = 40,
  onClickInfoModal,
}: SummaryCardProps) => {
  const getHealthIndexIcon = () => {
    switch (healthIndexChange) {
      case "up":
        return (
          <Icon
            name="arrowUp"
            width={12}
            height={12}
            color={COLORS.green[500]}
          />
        );
      case "down":
        return (
          <Icon
            name="arrowDown"
            width={12}
            height={12}
            color={COLORS.blue[500]}
          />
        );
      case "stable":
        return (
          <Icon
            name="arrowRight"
            width={12}
            height={12}
            color={COLORS.gray[500]}
          />
        );
      default:
        return null;
    }
  };

  const getHealthIndexColor = () => {
    switch (healthIndexChange) {
      case "up":
        return COLORS.green[500];
      case "down":
        return COLORS.blue[500];
      case "stable":
        return COLORS.gray[500];
      default:
        return COLORS.gray[500];
    }
  };

  return (
    <>
      <div className={container}>
        {/* 요약 섹션 */}
        <div className={summarySection}>
          <Heading type="xsmall" weight={600} color={COLORS.gray[800]}>
            이번 주 건강 요약
          </Heading>
          <Body type="small" weight={400} color={COLORS.gray[600]}>
            {`${startDate} ~ ${endDate}`}
          </Body>
        </div>

        {/* 건강 요약 */}
        <div className={healthSummary}>
          <div className={indexValue}>
            <div className={indexValueTitle}>
              <Body type="medium" weight={600} color={COLORS.gray[900]}>
                평균 건강 지수
              </Body>
              {getHealthIndexIcon()}
              <Body type="small" weight={500} color={getHealthIndexColor()}>
                {`${healthIndex}`}
              </Body>
            </div>
            <Body type="small" weight={500} color={COLORS.gray[600]}>
              {healthDescription}
            </Body>
          </div>
          <div className={semiCircularGaugeContainer}>
            <SemiCircularGaugeChart
              value={gaugeValue}
              width={150}
              height={100}
              fontType="large"
              fontStyle={{
                position: "absolute",
                left: "50%",
                bottom: "50%",
                transform: "translate(-50%, 120%)",
                color: COLORS.red[500],
              }}
            />
          </div>
        </div>
      </div>
      {/* 게이지 정보 */}
      <div className={gaugeInfo} onClick={onClickInfoModal}>
        <Icon name="search" width={12} height={12} color={COLORS.gray[500]} />
        <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
          {`어떻게 산출되나요? >`}
        </Body>
      </div>
    </>
  );
};
