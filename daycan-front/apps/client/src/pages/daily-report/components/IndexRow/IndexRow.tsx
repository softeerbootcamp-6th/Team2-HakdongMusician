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
  row: {
    key: string;
    value: string;
    warningDescription?: string;
  };
}

export const IndexRow = ({ icon, row }: IndexRowProps) => {
  return (
    <>
      <div className={indexRow}>
        <div className={indexRowIconTitleContainer}>
          {icon}
          <Body type="medium" weight={600}>
            {row.key}
          </Body>
        </div>
        <div className={indexRowDescriptionContainer}>
          <div
            className={
              row.warningDescription
                ? indexRowDescriptionWarning
                : indexRowDescription
            }
          >
            <Body type="medium" weight={400} color={COLORS.gray[800]}>
              {row.value}
            </Body>
          </div>
          {row.warningDescription && (
            <Body type="xsmall" weight={400} color={COLORS.red[500]}>
              {row.warningDescription}
            </Body>
          )}
        </div>
      </div>
    </>
  );
};
