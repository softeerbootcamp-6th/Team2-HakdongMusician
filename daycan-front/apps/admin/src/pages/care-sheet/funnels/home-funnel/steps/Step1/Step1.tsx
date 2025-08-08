import { Body, COLORS, HighlightingHeading } from "@daycan/ui";
import {
  careSheetPageContainer,
  careSheetPageContent,
  careSheetPageContentTitleContainer,
} from "../Step0/Step0.css";
import { Header, WritingMethodCard } from "../../components";
import { StepButtons } from "../../../../components/StepButtons";
import pictureMethod from "@/assets/png/picture-method.png";
import selectMethod from "@/assets/png/select-method.png";
import { useFunnel } from "@daycan/hooks";
import { getWriterName } from "../../utils/parseData";

export const Step1 = () => {
  const { toPrev, toNext, funnelState, updateState } = useFunnel();

  // 작성자 이름 가져오기
  const writerName = getWriterName(funnelState);

  const handleMethodSelect = (method: string) => {
    // FunnelState에 선택된 방법 저장
    updateState({
      selectedMethod: method,
    });

    if (method === "direct") {
      toNext();
    } else {
      console.log("사진 등록");
    }
  };

  return (
    <div className={careSheetPageContainer}>
      <Header />
      <div className={careSheetPageContent}>
        <div className={careSheetPageContentTitleContainer}>
          <HighlightingHeading text={`${writerName}님!`} />
        </div>
        <Body type="large" weight={600} color={COLORS.gray[800]}>
          어떻게 기록지를 작성할까요?
        </Body>
        <WritingMethodCard
          title="직접 입력"
          description="온라인으로 바로 활동 일지를 작성해요"
          image={selectMethod}
          isSelected={true}
          onClick={() => {
            handleMethodSelect("direct");
          }}
        />
        <WritingMethodCard
          title="사진 등록"
          description="손으로 직접 쓴 활동일지를 찍고 업로드해요."
          image={pictureMethod}
          isSelected={false}
          onClick={() => {
            handleMethodSelect("photo");
          }}
        />
        <StepButtons onPrev={toPrev} />
      </div>
    </div>
  );
};
