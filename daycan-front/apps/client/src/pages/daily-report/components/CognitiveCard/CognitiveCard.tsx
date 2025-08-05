import { Icon } from "@daycan/ui";
import { CardLayout } from "../CardLayout/CardLayout";
import { IndexColumn } from "../IndexColumn";

export const CognitiveCard = ({
  isDropdown = false,
  columns,
}: {
  isDropdown?: boolean;
  columns: {
    key: string;
    value: string;
    specificDescription?: string;
  }[];
}) => {
  return (
    <CardLayout
      title="인지 능력"
      stampCount={15}
      stampTotal={15}
      stampDescription="오늘 완전 머리가 서울대생급!"
      isDropdown={isDropdown}
    >
      {columns.map((column) => (
        <IndexColumn
          key={column.key}
          icon={<Icon name="brain" width={32} height={32} />}
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
