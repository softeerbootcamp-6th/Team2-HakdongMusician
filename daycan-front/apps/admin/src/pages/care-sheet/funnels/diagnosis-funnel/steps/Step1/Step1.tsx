import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import {
  DiagnosisCardLayout,
  DiagnosisLayout,
  ColumnTextArea,
  RowCheckBox,
} from "../../components";
import { useStep1 } from "./useStep1";

export const Step1 = () => {
  const {
    isCognitiveHelperChecked,
    setIsCognitiveHelperChecked,
    isCommunicationHelperChecked,
    setIsCommunicationHelperChecked,
    physicalActivity,
    setPhysicalActivity,
    handleNext,
    toPrev,
  } = useStep1();

  return (
    <DiagnosisLayout title="인지 활동" nextTitle="건강관리">
      <DiagnosisCardLayout title="도움">
        <RowCheckBox
          label="인지 관리 도움"
          checked={isCognitiveHelperChecked}
          onClick={() => setIsCognitiveHelperChecked(!isCognitiveHelperChecked)}
        />
        <RowCheckBox
          label="의사소통 도움"
          checked={isCommunicationHelperChecked}
          onClick={() =>
            setIsCommunicationHelperChecked(!isCommunicationHelperChecked)
          }
        />
      </DiagnosisCardLayout>
      <DiagnosisCardLayout title="특이사항">
        <ColumnTextArea
          label="신체활동"
          value={physicalActivity}
          onChange={setPhysicalActivity}
          autoSelectTags={[
            {
              value: "인지 관리 도움없이도 잘 해내셨어요.",
              isGood: true,
            },
            {
              value: "인지 관리 도움이 많이 필요했어요.",
              isGood: false,
            },
            {
              value: "의사소통 관련 도움없이도 잘 해내셨어요.",
              isGood: true,
            },
            {
              value: "의사소통 도움이 많이 필요했어요.",
              isGood: false,
            },
          ]}
        />
      </DiagnosisCardLayout>

      <StepButtons onNext={handleNext} onPrev={toPrev} isNextEnabled={true} />
    </DiagnosisLayout>
  );
};
