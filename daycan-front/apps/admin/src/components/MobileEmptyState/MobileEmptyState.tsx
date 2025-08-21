import { Body, Heading, COLORS } from "@daycan/ui";
import { emptyStateContainer, emptyStateIcon } from "./MobileEmptyState.css";

interface MobileEmptyStateProps {
  title: string;
  description: string;
  icon?: string;
}

export const MobileEmptyState = ({
  title,
  description,
  icon = "📋",
}: MobileEmptyStateProps) => {
  return (
    <div className={emptyStateContainer}>
      <div className={emptyStateIcon}>{icon}</div>
      <Heading type="xsmall" weight={600} color={COLORS.gray[700]}>
        {title}
      </Heading>
      <Body type="medium" weight={400} color={COLORS.gray[500]}>
        {description}
      </Body>
    </div>
  );
};
