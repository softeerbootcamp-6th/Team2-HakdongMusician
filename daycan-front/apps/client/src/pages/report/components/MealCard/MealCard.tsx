import { Icon } from "@daycan/ui";
import { CardLayout } from "../CardLayout/CardLayout";
import { IndexRow } from "../IndexRow/IndexRow";

export const MealCard = () => {
  return (
    <CardLayout
      title="식사"
      stampCount={15}
      stampTotal={15}
      stampDescription="오늘 식사를 완료했어요"
    >
      <IndexRow
        icon={<Icon name="meal" width={32} height={32} />}
        title="아침"
        description="오늘 식사를 완료했어요"
      />
      <IndexRow
        icon={<Icon name="meal" width={32} height={32} />}
        title="점심"
        description="오늘 식사를 완료했어요"
      />
      <IndexRow
        icon={<Icon name="meal" width={32} height={32} />}
        title="저녁"
        description="아무것도 드시지 않으셨어요"
        warningDescription="차은우가 먹여주는 게 아니라면 안 먹는대요"
      />
    </CardLayout>
  );
};
