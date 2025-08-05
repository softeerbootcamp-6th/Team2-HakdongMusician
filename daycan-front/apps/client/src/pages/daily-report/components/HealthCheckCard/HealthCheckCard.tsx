import { Icon } from "@daycan/ui";
import { CardLayout } from "../CardLayout/CardLayout";
import { IndexRow } from "../IndexRow/IndexRow";

export const HealthCheckCard = ({
  isDropdown = false,
  rows,
  stampDescription,
}: {
  isDropdown?: boolean;
  rows: {
    key: string;
    value: string;
    warningDescription?: string;
  }[];
  stampDescription?: string;
}) => {
  return (
    <CardLayout
      title={"건강 체크"}
      stampCount={15}
      stampTotal={15}
      stampDescription={stampDescription ?? "오늘 완전 팔팔하셨어요!"}
      isDropdown={isDropdown}
    >
      {rows.map((row) => (
        <IndexRow
          key={row.key}
          icon={<Icon name="heartbeat" width={32} height={32} />}
          row={row}
        />
      ))}
    </CardLayout>
  );
};
