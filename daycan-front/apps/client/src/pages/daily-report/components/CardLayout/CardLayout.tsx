import { useState } from "react";
import { Body, COLORS, Icon } from "@daycan/ui";
import {
  cardLayout,
  cardLayoutFooter,
  cardLayoutHeader,
  cardLayoutFooterStampDescription,
  dropdownContent,
  arrowIcon,
  arrowIconContainer,
  content,
} from "./CardLayout.css";

interface CardLayoutProps {
  children: React.ReactNode;
  title: string;
  stampCount: number;
  stampTotal: number;
  stampDescription: string;
  isDropdown?: boolean;
}

//TODO - API 명세 나온 후에, 점수에 따른 아이콘 및 색상 수정 필요

export const CardLayout = ({
  children,
  title,
  stampCount,
  stampTotal,
  stampDescription,
  isDropdown = false,
}: CardLayoutProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    if (isDropdown) {
      setIsExpanded(!isExpanded);
    }
  };
  function getStampIcon(stampCount: number) {
    //total을 기준으로 수정 필요
    if (stampCount >= 8 && stampCount <= 15) {
      return "stampGood";
    }
    return "stampBad";
  }

  return (
    <div className={cardLayout}>
      <div
        className={cardLayoutHeader({ isDropdown })}
        onClick={toggleExpanded}
      >
        <Icon
          name="circleCheck"
          width={32}
          height={32}
          color={COLORS.blue[500]}
          stroke={COLORS.white}
        />
        <Body type="large" weight={600}>
          오늘의
        </Body>
        <Body type="large" weight={600}>
          {title}
        </Body>
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
        <>
          <div
            className={isDropdown ? dropdownContent({ isExpanded }) : content}
          >
            {children}
          </div>
          <div className={cardLayoutFooter}>
            <Icon
              name={getStampIcon(stampCount)}
              width={60}
              height={60}
              color={COLORS.white}
            />
            <div className={cardLayoutFooterStampDescription}>
              <Body type="large" weight={600} color={COLORS.gray[700]}>
                {stampCount}/{stampTotal}
              </Body>
              <Body type="medium" weight={400} color={COLORS.gray[700]}>
                {stampDescription}
              </Body>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
