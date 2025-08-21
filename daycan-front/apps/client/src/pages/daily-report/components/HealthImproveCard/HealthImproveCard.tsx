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
      title={"신체 건강 개선"}
      score={score}
      scoreMax={15}
      isDropdown={isDropdown}
      additionalMemo={additionalMemo}
    >
      {columns.map((column) => (
        <IndexColumn key={column.key} column={column} />
      ))}
    </CardLayout>
  );
};
