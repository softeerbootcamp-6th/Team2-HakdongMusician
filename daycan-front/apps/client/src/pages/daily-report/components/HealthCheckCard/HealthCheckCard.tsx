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
      {rows.length > 0 ? (
        rows.map((row) => <IndexRow key={row.key} row={row} />)
      ) : (
        <IndexRow
          key="empty"
          row={{
            key: "건강 체크 미참여",
            value: "건강 체크 항목이 없습니다.",
            warningDescription: "관리자에게 문의하세요",
          }}
        />
      )}
    </CardLayout>
  );
};
