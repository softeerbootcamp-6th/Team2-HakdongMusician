import { useState } from "react";
import { SemiCircularGaugeChart, UpDownIcon } from "../../../../components";
import { Body, COLORS, Icon } from "@daycan/ui";
import {
  container,
  indexChartDescriptionContainer,
  healthIndexHeader,
  indexCard,
  indexCardContainer,
  indexValue,
  indexDescription,
  indexChartDescription,
  dropdownContent,
  arrowIcon,
  arrowIconContainer,
} from "./HealthIndexCard.css";

interface HealthIndexCardProps {
  index: number;
  description: string;
  indexCardData: {
    title: string;
    value: number;
  }[];
  isDropdown?: boolean;
}

export const HealthIndexCard = ({
  index,
  description,
  indexCardData,
  isDropdown = false,
}: HealthIndexCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    if (isDropdown) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={container}>
      <div
        className={healthIndexHeader({ isDropdown })}
        onClick={toggleExpanded}
      >
        <Icon name="health" width={24} height={24} />
        <Body type="large" weight={600}>
          건강지수
        </Body>
        <Body type="xsmall" weight={500} color={COLORS.red[500]}>
          이전 기록 대비
        </Body>
        <UpDownIcon value={10} />
        <div className={arrowIconContainer}>
          {isDropdown && (
            <Icon
              name="arrowDown"
              width={16}
              height={16}
              className={arrowIcon({ isExpanded })}
            />
          )}
        </div>
      </div>

      {(!isDropdown || isExpanded) && (
        <div className={isDropdown ? dropdownContent({ isExpanded }) : ""}>
          <div className={indexChartDescriptionContainer}>
            <SemiCircularGaugeChart
              value={index}
              width={300}
              height={150}
              fontType="xlarge"
              barSize={45}
              fontStyle={{
                position: "absolute",
                left: "50%",
                bottom: "50%",
                transform: "translate(-50%, 190%)",
                lineHeight: "100%",
                color: COLORS.red[500],
              }}
            />
            <Body type="small" weight={500} className={indexChartDescription}>
              {description}
            </Body>
          </div>
          <div className={indexCardContainer}>
            <div className={indexCard}>
              <Icon name="meal" width={20} height={20} />
              <div className={indexValue}>
                <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
                  {indexCardData[0].title}
                </Body>
                <Body type="xsmall" weight={500} color={COLORS.gray[900]}>
                  {indexCardData[0].value}점
                </Body>
              </div>
            </div>
            <div className={indexCard}>
              <Icon name="health" width={20} height={20} />
              <div className={indexValue}>
                <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
                  {indexCardData[1].title}
                </Body>
                <Body type="xsmall" weight={500} color={COLORS.gray[900]}>
                  {indexCardData[1].value}점
                </Body>
              </div>
            </div>

            <div className={indexCard}>
              <Icon name="activity" width={20} height={20} />
              <div className={indexValue}>
                <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
                  {indexCardData[2].title}
                </Body>
                <Body type="xsmall" weight={500} color={COLORS.gray[900]}>
                  {indexCardData[2].value}점
                </Body>
              </div>
            </div>
            <div className={indexCard}>
              <Icon name="brain" width={20} height={20} />
              <div className={indexValue}>
                <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
                  {indexCardData[3].title}
                </Body>
                <Body type="xsmall" weight={500} color={COLORS.gray[900]}>
                  {indexCardData[3].value}점
                </Body>
              </div>
            </div>
          </div>

          <Body
            type="xsmall"
            weight={400}
            color={COLORS.gray[600]}
            className={indexDescription}
          >
            카드를 옆으로 넘겨 상세 정보를 확인해 보세요!
          </Body>
        </div>
      )}
    </div>
  );
};
