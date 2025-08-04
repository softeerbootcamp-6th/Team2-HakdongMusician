import { Body, COLORS } from "@daycan/ui";
import {
  indexRow,
  indexRowIconTitleContainer,
  indexRowDescription,
  indexRowDescriptionContainer,
  indexRowDescriptionWarning,
} from "./IndexRow.css";

interface IndexRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  warningDescription?: string;
}

export const IndexRow = ({
  icon,
  title,
  description,
  warningDescription,
}: IndexRowProps) => {
  return (
    <>
      <div className={indexRow}>
        <div className={indexRowIconTitleContainer}>
          {icon}
          <Body type="medium" weight={600}>
            {title}
          </Body>
        </div>
        <div className={indexRowDescriptionContainer}>
          <div
            className={
              warningDescription
                ? indexRowDescriptionWarning
                : indexRowDescription
            }
          >
            <Body type="medium" weight={400} color={COLORS.gray[800]}>
              {description}
            </Body>
          </div>
          {warningDescription && (
            <Body type="xsmall" weight={400} color={COLORS.red[500]}>
              {warningDescription}
            </Body>
          )}
        </div>
      </div>
    </>
  );
};
