import { itemsContainer } from "@/pages/staff/components/StaffList/StaffList.css";
import { SkeletonListItem } from "../SkeletonListItem/SkeletonListItem";

interface SkeletonListProps {
  title?: string; // ListHeader 제목
  children: React.ReactNode; // ListHeader
  itemCount?: number; // 스켈레톤 아이템 개수
  gridTemplate?: string; // 그리드 템플릿
  columnsLength?: number; // 컬럼 개수
  containerClassName?: string; // 컨테이너 클래스명
}

export const SkeletonList = ({
  title,
  children,
  itemCount = 10,
  gridTemplate,
  columnsLength,
  containerClassName,
}: SkeletonListProps) => {
  return (
    <div className={containerClassName}>
      {/* ListHeader */}
      {children}

      {/* 스켈레톤 아이템들 */}
      <div className={itemsContainer}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <SkeletonListItem
            title={title}
            key={index}
            gridTemplate={gridTemplate}
            columnsLength={columnsLength}
          />
        ))}
      </div>
    </div>
  );
};
