import { ListHeaderLayout } from "@/components";
import { REPORT_LIST_GRID_TEMPLATE } from "../../constants/grid";

interface ReportListHeaderProps {
  showCheckbox?: boolean;
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
  onSelectAll?: (checked: boolean) => void;
}

export const ReportListHeader = ({
  showCheckbox = true,
  isAllSelected = false,
  isIndeterminate = false,
  onSelectAll,
}: ReportListHeaderProps) => {
  const columns = [
    { key: "order", label: "순서" },
    { key: "status", label: "리포트 상태" },
    { key: "recipientName", label: "수급자 이름" },
    { key: "birthDate", label: "생년월일" },
    { key: "gender", label: "성별" },
    { key: "guardian", label: "보호자" },
    { key: "guardianContact", label: "보호자 연락처" },
    { key: "isReviewable", label: "검토 가능" },
  ];

  return (
    <ListHeaderLayout
      isAllSelected={isAllSelected}
      isIndeterminate={isIndeterminate}
      onSelectAll={onSelectAll}
      showCheckbox={showCheckbox}
      columns={columns}
      gridTemplate={REPORT_LIST_GRID_TEMPLATE}
    />
  );
};
