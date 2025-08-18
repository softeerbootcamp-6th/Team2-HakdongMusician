import { Body, COLORS } from "@daycan/ui";
import {
  indexRow,
  indexRowIconTitleContainer,
  indexRowDescription,
  indexRowDescriptionContainer,
  indexRowDescriptionWarning,
} from "./IndexRow.css";
import { getIconByRowKey } from "../../constants/iconMapping";

interface IndexRowProps {
  icon?: React.ReactNode; // 선택적 prop으로 변경
  row: {
    key: string;
    value: string;
    warningDescription?: string;
  };
}

export const IndexRow = ({ icon, row }: IndexRowProps) => {
  // icon이 제공되면 그것을 사용하고, 아니면 key에 따라 자동 매핑
  const displayIcon = icon || getIconByRowKey(row.key);
  return (
    <>
      <div className={indexRow}>
        <div className={indexRowIconTitleContainer}>
          {displayIcon}
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
