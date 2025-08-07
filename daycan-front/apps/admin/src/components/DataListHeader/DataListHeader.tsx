import { Body } from "@daycan/ui";
import {
  dataListHeaderContainer,
  dataListHeaderItem,
  actionColumn,
} from "./DataListHeader.css.ts";
import { Chip } from "@daycan/ui";
import { headerColumn } from "./DataListHeader.css.ts";
import type { MEMBER_HEADERS } from "@/constants/memberList.ts";

interface DataListHeaderProps {
  columns: typeof MEMBER_HEADERS;
}

export const DataListHeader = ({ columns }: DataListHeaderProps) => {
  return (
    <div className={dataListHeaderContainer}>
      <div className={dataListHeaderItem}>
        {columns.map((column, index) => (
          <div
            key={index}
            className={headerColumn}
            style={{ width: column.width }}
          >
            <Body>{column.text}</Body>
          </div>
        ))}
        <div className={actionColumn}>
          <Chip style={{ backgroundColor: "transparent" }} round="s">
            <Body type="xsmall" color="transparent">
              상세 보기
            </Body>
          </Chip>
        </div>
      </div>
    </div>
  );
};
