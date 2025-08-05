import { Icon } from "@daycan/ui";
import { CardLayout } from "../CardLayout/CardLayout";
import { IndexRow } from "../IndexRow/IndexRow";

export const MealCard = ({
  isDropdown = false,
  rows,
}: {
  isDropdown?: boolean;
  rows: {
    key: string;
    value: string;
    warningDescription?: string;
  }[];
}) => {
  return (
    <CardLayout
      title="식사"
      stampCount={15}
      stampTotal={15}
      stampDescription="오늘 식사를 완료했어요"
      isDropdown={isDropdown}
    >
      {rows.map((row) => (
        <IndexRow
          key={row.key}
          icon={<Icon name="meal" width={32} height={32} />}
          row={row}
        />
      ))}
    </CardLayout>
  );
};
