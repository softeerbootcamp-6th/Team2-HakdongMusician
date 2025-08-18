import { CardLayout } from "../CardLayout/CardLayout";
import { IndexRow } from "../IndexRow/IndexRow";

interface MealCardProps {
  isDropdown?: boolean;
  rows: {
    key: string;
    value: string;
    warningDescription?: string;
  }[];
  score: number;
  additionalMemo?: string;
}

export const MealCard = ({
  isDropdown = false,
  rows,
  score,
  additionalMemo,
}: MealCardProps) => {
  return (
    <CardLayout
      title="식사"
      score={score}
      scoreMax={15}
      isDropdown={isDropdown}
      additionalMemo={additionalMemo}
    >
      {rows.map((row) => (
        <IndexRow key={row.key} row={row} />
      ))}
    </CardLayout>
  );
};
