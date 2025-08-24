import { CardLayout } from "../CardLayout";
import { IndexColumn } from "../IndexColumn";

interface HealthImproveCardProps {
  isDropdown?: boolean;
  columns: {
    key: string;
    value: string;
    specificDescription?: string;
  }[];
  score: number;
  additionalMemo?: string;
}

export const HealthImproveCard = ({
  isDropdown = false,
  columns,
  score,
  additionalMemo,
}: HealthImproveCardProps) => {
  return (
    <CardLayout
      title={"신체 건강 개선 프로그램"}
      score={score}
      scoreMax={15}
      isDropdown={isDropdown}
      additionalMemo={additionalMemo}
    >
      {columns.length > 0 ? (
        columns.map((column) => (
          <IndexColumn key={column.key} column={column} />
        ))
      ) : (
        <IndexColumn
          key={"empty"}
          column={{
            key: "신체 활동 미참여",
            value: "오늘 신체 건강 개선 프로그램에 참여하지 않았어요!",
          }}
        />
      )}
    </CardLayout>
  );
};
