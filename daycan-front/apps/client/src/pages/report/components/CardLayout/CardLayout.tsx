import { Body, COLORS, Icon } from "@daycan/ui";
import {
  cardLayout,
  cardLayoutFooter,
  cardLayoutHeader,
  cardLayoutFooterStampDescription,
} from "./CardLayout.css";

interface CardLayoutProps {
  children: React.ReactNode;
  title: string;
  stampCount: number;
  stampTotal: number;
  stampDescription: string;
}

//TODO - API 명세 나온 후에, 점수에 따른 아이콘 및 색상 수정 필요

export const CardLayout = ({
  children,
  title,
  stampCount,
  stampTotal,
  stampDescription,
}: CardLayoutProps) => {
  function getStampIcon(stampCount: number) {
    //total을 기준으로 수정 필요
    if (stampCount >= 8 && stampCount <= 15) {
      return "stampGood";
    }
    return "stampBad";
  }

  return (
    <div className={cardLayout}>
      <div className={cardLayoutHeader}>
        <Icon
          name="circleCheck"
          width={32}
          height={32}
          color={COLORS.blue[500]}
        />
        <Body type="large" weight={600}>
          오늘의
        </Body>
        <Body type="large" weight={600}>
          {title}
        </Body>
      </div>
      {children}
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
    </div>
  );
};
