import { header, headerLeft, headerRight } from "./Header.css";
import { Body, COLORS, Icon } from "@daycan/ui";

export const Header = () => {
  return (
    <div className={header}>
      <div className={headerLeft}>
        <Icon name="smallLogo" width={36} height={40} />
      </div>
      <div className={headerRight}>
        <Body type="small" weight={500} color={COLORS.gray[600]}>
          데이케어센터소프티어점
        </Body>
        <Icon name="location" width={16} height={16} color={COLORS.gray[500]} />
      </div>
    </div>
  );
};
