import { Body, COLORS } from "@daycan/ui";
import {
  indexColumn,
  indexColumnIconTitleContainer,
  indexColumnDescription,
  indexColumnDescriptionContainer,
  indexColumnDescriptionWarning,
} from "./IndexColumn.css";

interface IndexColumnProps {
  icon: React.ReactNode;
  column: {
    key: string;
    value: string;
    specificDescription?: string;
    warningDescription?: string;
  };
}

export const IndexColumn = ({ icon, column }: IndexColumnProps) => {
  return (
    <>
      <div className={indexColumn}>
        <div className={indexColumnIconTitleContainer}>
          {icon}
          <Body type="medium" weight={600}>
            {column.key}
          </Body>
        </div>
        <div className={indexColumnDescriptionContainer}>
          <div
            className={
              column.warningDescription
                ? indexColumnDescriptionWarning
                : indexColumnDescription
            }
          >
            <Body type="medium" weight={400} color={COLORS.gray[800]}>
              {column.value}
            </Body>
          </div>
          {column.specificDescription && (
            <Body type="xsmall" weight={400} color={COLORS.gray[800]}>
              {column.specificDescription}
            </Body>
          )}
          {column.warningDescription && (
            <Body type="xsmall" weight={400} color={COLORS.red[500]}>
              {column.warningDescription}
            </Body>
          )}
        </div>
      </div>
    </>
  );
};
