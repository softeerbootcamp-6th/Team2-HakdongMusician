import { Icon } from "@daycan/ui";
import { CardLayout } from "../CardLayout/CardLayout";
import { IndexRow } from "../IndexRow/IndexRow";

export const HealthCheckCard = () => {
  return (
    <CardLayout
      title="건강 체크"
      stampCount={15}
      stampTotal={15}
      stampDescription="오늘 완전 팔팔하셨어요!"
    >
      <IndexRow
        icon={<Icon name="heartbeat" width={32} height={32} />}
        title="혈압"
        description="135/88mmHg"
        warningDescription="정상(90~120/60~80)보다 높음"
      />
      <IndexRow
        icon={<Icon name="thermometer" width={32} height={32} />}
        title="체온"
        description="36.5℃"
      />
      <IndexRow
        icon={<Icon name="toilet" width={32} height={32} />}
        title="용변"
        description="대변 1회, 소변 3회"
        warningDescription="정상(대변: 1~3회/소변:4~6회)보다 낮음"
      />
    </CardLayout>
  );
};
