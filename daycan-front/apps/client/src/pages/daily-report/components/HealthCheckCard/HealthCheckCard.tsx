import { CardLayout } from "../CardLayout/CardLayout";
import { IndexRow } from "../IndexRow/IndexRow";

interface HealthCheckCardProps {
  isDropdown?: boolean;
  rows: {
    key: string;
    value: string;
    warningDescription?: string;
  }[];
  score: number;
  additionalMemo?: string;
}

export const HealthCheckCard = ({
  isDropdown = false,
  rows,
  score,
  additionalMemo,
}: HealthCheckCardProps) => {
  return (
    <CardLayout
      title={"건강 체크"}
      score={score}
      scoreMax={55}
      isDropdown={isDropdown}
      additionalMemo={additionalMemo}
    >
      {rows.map((row) => (
        <IndexRow key={row.key} row={row} />
      ))}
    </CardLayout>
  );
};
