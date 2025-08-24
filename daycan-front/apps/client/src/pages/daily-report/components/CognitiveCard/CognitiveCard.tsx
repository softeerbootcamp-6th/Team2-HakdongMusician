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
      title="인지 능력 프로그램"
      score={score}
      scoreMax={15}
      isDropdown={isDropdown}
      additionalMemo={additionalMemo}
    >
      {columns.length > 0 ? (
        columns.map((column) => (
          <IndexColumn
            key={column.key}
            column={{
              key: column.key,
              value: column.value,
              specificDescription: column.specificDescription,
            }}
          />
        ))
      ) : (
        <IndexColumn
          key={"empty"}
          column={{
            key: "인지 활동 미참여",
            value: "오늘 인지 능력 프로그램에 참여하지 않았어요!",
          }}
        />
      )}
    </CardLayout>
  );
};
