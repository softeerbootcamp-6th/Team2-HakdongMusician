import type React from "react";
import { memberListContainer } from "./DataListLayout.css";

/*
 * 이 컴포넌트는 데이터 리스트의 헤더와 바디를 구성합니다.
 * @author: 소보길
 */

interface DataListLayoutProps {
  dataListHeader?: React.ReactNode;
  dataListRows: React.ReactNode[];
}

export const DataListLayout = ({
  dataListHeader,
  dataListRows,
}: DataListLayoutProps) => {
  return (
    <div className={memberListContainer}>
      {dataListHeader}
      {dataListRows}
    </div>
  );
};
