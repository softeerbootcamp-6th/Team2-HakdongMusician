import { Body } from "@daycan/ui";
import {
  dataListHeaderContainer,
  dataListHeaderItem,
  headerColumn,
  actionColumn,
} from "./DataListHeader.css";
import { Chip } from "@daycan/ui";

import type { HeaderColumn } from "@/types/elder.ts"; // Assuming this is the correct path for your types

interface DataListHeaderProps {
  columns: HeaderColumn[];
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
