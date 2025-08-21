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
import { UpDownIcon } from "@/components/UpDownIcon/UpDownIcon";

interface SummaryCardProps {
  startDate: string;
  endDate: string;
  weeklyChangeAmount: number;
  weeklyScore: number;
  onClickInfoModal: () => void;
}

export const SummaryCard = ({
  startDate,
  endDate,
  weeklyChangeAmount,
  weeklyScore,
  onClickInfoModal,
}: SummaryCardProps) => {
  // weeklyChangeAmount에 따른 건강 설명 생성
  const getHealthDescription = (changeAmount: number): string => {
    if (changeAmount > 0) {
      return `지난 주 대비 ${Math.abs(changeAmount)}점 상승했어요!`;
    } else if (changeAmount < 0) {
      return `지난 주 대비 ${Math.abs(changeAmount)}점 하락했어요.`;
    } else {
      return "지난 주와 동일한 건강 상태를 유지하고 있어요.";
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
              <UpDownIcon value={weeklyChangeAmount} />
            </div>
            <Body type="small" weight={500} color={COLORS.gray[600]}>
              {getHealthDescription(weeklyChangeAmount)}
            </Body>
          </div>
          <div className={semiCircularGaugeContainer}>
            <SemiCircularGaugeChart
              value={weeklyScore}
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
