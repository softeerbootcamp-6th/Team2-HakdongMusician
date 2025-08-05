import { Icon } from "@daycan/ui";
import { CardLayout } from "../CardLayout";
import { IndexColumn } from "../IndexColumn";

export const HealthImproveCard = ({
  isDropdown = false,
  columns,
  stampDescription,
}: {
  isDropdown?: boolean;
  columns: {
    key: string;
    value: string;
    specificDescription?: string;
  }[];
  stampDescription?: string;
}) => {
  return (
    <CardLayout
      title={"신체 건강 개선"}
      stampCount={15}
      stampTotal={15}
      stampDescription={stampDescription ?? "오늘 완전 메시 호날두급 신체능력"}
      isDropdown={isDropdown}
    >
      {columns.map((column) => (
        <IndexColumn
          key={column.key}
          icon={<Icon name="activity" width={32} height={32} />}
          column={column}
        />
      ))}
    </CardLayout>
  );
};
