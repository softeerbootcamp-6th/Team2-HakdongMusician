import { ListHeaderLayout } from "@/components";

interface CareSheetListHeaderProps {
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onSelectAll?: (checked: boolean) => void;
  showCheckbox?: boolean;
}

export const CareSheetListHeader = ({
  isAllSelected,
  isIndeterminate,
  onSelectAll,
  showCheckbox = false,
}: CareSheetListHeaderProps) => {
  const columns = [
    { key: "order", label: "순서" },
    { key: "status", label: "작성 상태" },
    { key: "recipientName", label: "수급자 이름" },
    { key: "birthDate", label: "생년월일" },
    { key: "gender", label: "성별" },
    { key: "attendance", label: "출석 여부" },
    { key: "writer", label: "작성자" },
  ];

  const gridTemplate = "auto 80px 100px 1fr 120px 80px 100px 120px";

  return (
    <ListHeaderLayout
      isAllSelected={isAllSelected}
      isIndeterminate={isIndeterminate}
      onSelectAll={onSelectAll}
      showCheckbox={showCheckbox}
      columns={columns}
      gridTemplate={gridTemplate}
    />
  );
};
