import { Icon } from "@daycan/ui";
import { CardLayout } from "../CardLayout";
import { IndexColumn } from "../IndexColumn";

export const HealthImproveCard = () => {
  return (
    <CardLayout
      title="신체 건강 개선"
      stampCount={15}
      stampTotal={15}
      stampDescription="오늘 완전 메시 호날두급 신체능력"
    >
      <IndexColumn
        icon={<Icon name="activity" width={32} height={32} />}
        title="게이트 볼"
        description="게이트 볼을 통해서, 몸과 마음을 단련시켰어요."
        specificDescription="게이트볼계의 메시 호날두처럼 할머니들 마음에 불을 지폈어요!"
      />
    </CardLayout>
  );
};
