import { chartLayoutContainer, chartLayoutTitle } from "./ChartLayout.css";
import { Body, Icon, type IconProps, COLORS } from "@daycan/ui";

export const ChartLayout = ({
  title,
  children,
  iconName,
}: {
  title: string;
  children: React.ReactNode;
  iconName: IconProps["name"];
}) => {
  return (
    <div className={chartLayoutContainer}>
      <div className={chartLayoutTitle}>
        <Icon name={iconName} width={32} height={32} />
        <Body type="large" weight={600} color={COLORS.gray[800]}>
          {title}
        </Body>
      </div>
      {children}
    </div>
  );
};
