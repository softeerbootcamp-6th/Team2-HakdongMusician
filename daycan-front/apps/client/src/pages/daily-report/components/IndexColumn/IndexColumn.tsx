import { Body, COLORS } from "@daycan/ui";
import {
  indexColumn,
  indexColumnIconTitleContainer,
  indexColumnDescription,
  indexColumnDescriptionContainer,
  indexColumnDescriptionWarning,
} from "./IndexColumn.css";
import { getIconByRowKey } from "../../constants/iconMapping";

interface IndexColumnProps {
  icon?: React.ReactNode; // 선택적 prop으로 변경
  column: {
    key: string;
    value: string;
    specificDescription?: string;
    warningDescription?: string;
  };
}

export const IndexColumn = ({ icon, column }: IndexColumnProps) => {
  // icon이 제공되면 그것을 사용하고, 아니면 key에 따라 자동 매핑
  const displayIcon = icon || getIconByRowKey(column.key);
  return (
    <>
      <div className={indexColumn}>
        <div className={indexColumnIconTitleContainer}>
          {displayIcon}
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
