import { SkeletonAnimationBlock } from "@daycan/ui";
import { ListItemLayout } from "../ListItemLayout/ListItemLayout";

interface SkeletonListItemProps {
  title?: string;
  gridTemplate?: string;
  columnsLength?: number;
}

export const SkeletonListItem = ({
  title,
  gridTemplate,
  columnsLength = 8,
}: SkeletonListItemProps) => {
  const isCheckboxList = title == "리포트 전송" || title == "기록지 관리";
  const columns = Array.from({ length: columnsLength }).map((_, index) => ({
    key: `column-${index}`,
    content:
      index === 1 && !isCheckboxList ? (
        <SkeletonAnimationBlock variant="circle" size="profile" />
      ) : (
        <SkeletonAnimationBlock />
      ),
  }));
  if (isCheckboxList) {
    return (
      <ListItemLayout
        showCheckbox={true}
        columns={columns}
        gridTemplate={gridTemplate}
      />
    );
  }
  return <ListItemLayout columns={columns} gridTemplate={gridTemplate} />;
};
