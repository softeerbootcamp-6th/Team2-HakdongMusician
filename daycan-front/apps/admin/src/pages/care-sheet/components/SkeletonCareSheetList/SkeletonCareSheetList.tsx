import { Body, COLORS } from "@daycan/ui";
import { SkeletonList } from "@/components/SkeletonList";
import { CARE_SHEET_GRID_TEMPLATE } from "../../constants/CARE_SHEET_GRID_TEMPLATE";
import { careSheetContainer } from "../../CareSheetPage.css";
import { CareSheetListHeader } from "../CareSheetListHeader";

interface SkeletonCareSheetListProps {
  title: string;
  description?: string;
  itemCount: number;
}

export const SkeletonCareSheetList = ({
  title,
  description,
  itemCount,
}: SkeletonCareSheetListProps) => {
  return (
    <SkeletonList
      title={title}
      itemCount={itemCount}
      gridTemplate={CARE_SHEET_GRID_TEMPLATE}
      columnsLength={7}
      containerClassName={careSheetContainer}
    >
      <div style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb" }}>
        <Body type="medium" weight={600} color={COLORS.gray[800]}>
          {description}
        </Body>
      </div>
      <CareSheetListHeader
        isAllSelected={false}
        isIndeterminate={false}
        onSelectAll={() => {}}
        showCheckbox={true}
      />
    </SkeletonList>
  );
};
