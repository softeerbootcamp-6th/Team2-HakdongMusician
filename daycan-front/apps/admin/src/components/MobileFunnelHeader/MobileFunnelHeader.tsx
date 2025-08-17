import { Body, COLORS, Icon } from "@daycan/ui";
import { mobileFunnelHeaderContainer } from "./MobileFunnelHeader.css";

interface MobileFunnelHeaderProps {
  onPrev: () => void;
  title: string;
}

export const MobileFunnelHeader = ({
  onPrev,
  title,
}: MobileFunnelHeaderProps) => {
  return (
    <div className={mobileFunnelHeaderContainer}>
      <Icon
        name="chevronLeft"
        width={24}
        height={24}
        color={COLORS.gray[50]}
        onClick={() => {
          onPrev();
        }}
      />
      <Body type="medium" color={COLORS.gray[900]} weight={600}>
        {title}
      </Body>
      <div></div>
    </div>
  );
};
