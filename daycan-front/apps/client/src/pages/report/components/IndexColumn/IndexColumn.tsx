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
  title: string;
  description: string;
  specificDescription?: string;
  warningDescription?: string;
}

export const IndexColumn = ({
  icon,
  title,
  description,
  specificDescription,
  warningDescription,
}: IndexColumnProps) => {
  return (
    <>
      <div className={indexColumn}>
        <div className={indexColumnIconTitleContainer}>
          {icon}
          <Body type="medium" weight={600}>
            {title}
          </Body>
        </div>
        <div className={indexColumnDescriptionContainer}>
          <div
            className={
              warningDescription
                ? indexColumnDescriptionWarning
                : indexColumnDescription
            }
          >
            <Body type="medium" weight={400} color={COLORS.gray[800]}>
              {description}
            </Body>
          </div>
          {specificDescription && (
            <Body type="xsmall" weight={400} color={COLORS.gray[800]}>
              {specificDescription}
            </Body>
          )}
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
