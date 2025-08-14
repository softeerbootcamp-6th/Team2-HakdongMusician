import { Body, CircularProgress, COLORS } from "@daycan/ui";
import { useFunnel } from "@daycan/hooks";
import {
  diagnosisFunnelHeader,
  diagnosisFunnelTitle,
  diagnosisFunnelTitleStep,
} from "./Header.css";

interface HeaderProps {
  title: string;
  nextTitle?: string;
}

export const Header = ({ title, nextTitle }: HeaderProps) => {
  const MAX_STEP = 5;
  const { currentIndex } = useFunnel();

  return (
    <div className={diagnosisFunnelHeader}>
      <CircularProgress max={MAX_STEP} value={currentIndex} size="large" />
      <div className={diagnosisFunnelTitle}>
        <Body type="large" weight={600}>
          {title}
        </Body>
        {nextTitle && (
          <div className={diagnosisFunnelTitleStep}>
            <Body type="xsmall" weight={600} color={COLORS.gray[400]}>
              다음 단계
            </Body>
            <Body type="xsmall" weight={600} color={COLORS.gray[500]}>
              {nextTitle}
            </Body>
          </div>
        )}
      </div>
    </div>
  );
};
