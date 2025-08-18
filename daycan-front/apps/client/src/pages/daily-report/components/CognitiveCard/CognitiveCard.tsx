import { CardLayout } from "../CardLayout/CardLayout";
import { IndexColumn } from "../IndexColumn";

interface CognitiveCardProps {
  isDropdown?: boolean;
  columns: {
    key: string;
    value: string;
    specificDescription?: string;
  }[];
  score: number;
  additionalMemo: string;
}

export const CognitiveCard = ({
  isDropdown = false,
  columns,
  score,
  additionalMemo,
}: CognitiveCardProps) => {
  return (
    <CardLayout
      title="인지 능력"
      score={score}
      scoreMax={15}
      isDropdown={isDropdown}
      additionalMemo={additionalMemo}
    >
      {columns.map((column) => (
        <IndexColumn
          key={column.key}
          column={{
            key: column.key,
            value: column.value,
            specificDescription: column.specificDescription,
          }}
        />
      ))}
    </CardLayout>
  );
};
