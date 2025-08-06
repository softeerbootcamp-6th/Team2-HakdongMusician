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
import { useNavigate } from "react-router-dom";

export const Step1 = () => {
  const { toPrev } = useFunnel();
  const navigate = useNavigate();

  return (
    <div className={careSheetPageContainer}>
      <Header />
      <div className={careSheetPageContent}>
        <div className={careSheetPageContentTitleContainer}>
          <HighlightingHeading text={`홍요양님`} />
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
            navigate("/care-sheet/info");
          }}
        />
        <WritingMethodCard
          title="사진 등록"
          description="손으로 직접 쓴 활동일지를 찍고 업로드해요."
          image={pictureMethod}
          isSelected={false}
          onClick={() => {
            // navigate("/care-sheet/info");
            console.log("사진 등록");
          }}
        />
        <StepButtons onPrev={toPrev} />
      </div>
    </div>
  );
};
