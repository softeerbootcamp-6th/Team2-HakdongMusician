import { Icon } from "@daycan/ui";
import { CardLayout } from "../CardLayout/CardLayout";
import { IndexColumn } from "../IndexColumn";

export const CognitiveCard = () => {
  return (
    <CardLayout
      title="인지 능력"
      stampCount={15}
      stampTotal={15}
      stampDescription="오늘 완전 머리가 서울대생급!"
    >
      <IndexColumn
        icon={<Icon name="brain" width={32} height={32} />}
        title="노래 부르기 활동"
        description="노래 부르기를 통해서, 몸과 마음을 편안하게 할 수 있어요."
        specificDescription="Let it go 노래가 나오자마자, 엘사처럼 노래를 부르셨어요!"
      />
    </CardLayout>
  );
};
