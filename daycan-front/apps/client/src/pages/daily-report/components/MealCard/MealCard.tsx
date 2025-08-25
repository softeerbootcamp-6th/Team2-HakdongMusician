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
      {rows.length > 0 ? (
        rows.map((row) => <IndexRow key={row.key} row={row} />)
      ) : (
        <IndexRow
          key="empty"
          row={{
            key: "식사 미참여",
            value: "식사 항목이 없습니다.",
            warningDescription: "관리자에게 문의하세요",
          }}
        />
      )}
    </CardLayout>
  );
};
