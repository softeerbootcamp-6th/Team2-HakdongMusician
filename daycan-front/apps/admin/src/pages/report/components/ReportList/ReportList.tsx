import { ReportListHeader } from "../ReportListHeader/ReportListHeader";
import { ReportListItem } from "../ReportListItem/ReportListItem";
import { Body, COLORS } from "@daycan/ui";
import type { ReportListItemType } from "../ReportListItem/ReportListItem";
import { reportListContainer } from "./ReportList.css";
import { useReports } from "../../hooks/useReports";

interface ReportListProps {
  reports?: ReportListItemType[];
  showCheckbox?: boolean;
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
  onSelectAll?: (checked: boolean) => void;
}

export const ReportList = ({
  reports = [],
  showCheckbox = true,
  isAllSelected = false,
  isIndeterminate = false,
  onSelectAll,
}: ReportListProps) => {
  const { checkedReportIds, handleCheckChange } = useReports();

  // 리포트가 없으면 빈 상태 렌더링
  if (reports.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: COLORS.gray[500],
        }}
      >
        <Body type="medium" weight={500}>
          리포트가 없습니다.
        </Body>
      </div>
    );
  }

  return (
    <div>
      <ReportListHeader
        showCheckbox={showCheckbox}
        isAllSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        onSelectAll={onSelectAll}
      />
      <div className={reportListContainer}>
        {reports.map((report, index) => {
          const isSelectable = report.status === "REVIEWED";
          const isChecked = checkedReportIds.has(report.id);

          return (
            <ReportListItem
              key={report.id}
              report={report}
              index={index}
              isChecked={isChecked}
              onCheckChange={handleCheckChange}
              isSelectable={isSelectable}
            />
          );
        })}
      </div>
    </div>
  );
};
