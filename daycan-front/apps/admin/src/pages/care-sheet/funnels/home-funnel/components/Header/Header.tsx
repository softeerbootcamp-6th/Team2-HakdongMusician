import { Body, COLORS, Icon } from "@daycan/ui";
import { headerContainer, headerLeft, headerRight } from "./Header.css";
export const Header = () => {
  return (
    <div className={headerContainer}>
      <div className={headerLeft}>
        <Icon name="smallLogo" width={40} height={40} />
        <Body type="medium" weight={500} color={COLORS.gray[800]}>
          시설 종사자
        </Body>
      </div>
      <div className={headerRight}>
        <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
          데이케어센터소프티어점
        </Body>
        <Icon name="location" width={16} height={16} color={COLORS.gray[500]} />
      </div>
    </div>
  );
};
