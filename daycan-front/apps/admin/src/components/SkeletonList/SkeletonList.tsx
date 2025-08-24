import { itemsContainer } from "./SkeletonList.css";
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
  const isCheckboxList = title == "리포트 전송" || title == "기록지 관리";
  const height = isCheckboxList ? "small" : "large";

  return (
    <div className={containerClassName}>
      {/* ListHeader */}
      {children}

      {/* 스켈레톤 아이템들 */}
      <div className={itemsContainer({ height })}>
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
