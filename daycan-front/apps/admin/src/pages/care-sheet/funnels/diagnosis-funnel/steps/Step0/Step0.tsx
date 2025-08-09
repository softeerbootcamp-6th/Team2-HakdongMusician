import { DiagnosisCardLayout } from "../../components/DiagnosisCardLayout";
import { DiagnosisLayout } from "../../components/DiagnosisLayout/DiagnosisLayout";
import { RowCheckBox } from "../../components/RowCheckBox";
import { RowSegment } from "../../components/RowSegment";
import { RowCounter } from "../../components/RowCounter";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { ColumnTextArea } from "../../components/ColumnTextArea/ColumnTextArea";
import { useStep0 } from "./useStep0";

export const Step0 = () => {
  const {
    // 상태들
    isWashHelperChecked,
    setIsWashHelperChecked,
    isMoveHelperChecked,
    setIsMoveHelperChecked,
    isBathHelperChecked,
    setIsBathHelperChecked,
    isBreakfastChecked,
    setIsBreakfastChecked,
    isLunchChecked,
    setIsLunchChecked,
    isDinnerChecked,
    setIsDinnerChecked,
    breakfastType,
    setBreakfastType,
    breakfastAmount,
    setBreakfastAmount,
    lunchType,
    setLunchType,
    lunchAmount,
    setLunchAmount,
    dinnerType,
    setDinnerType,
    dinnerAmount,
    setDinnerAmount,
    urineCount,
    stoolCount,
    physicalActivity,
    setPhysicalActivity,

    // 이벤트 핸들러들
    handleIncrementUrineCount,
    handleDecrementUrineCount,
    handleIncrementStoolCount,
    handleDecrementStoolCount,
    handleNext,
    toPrev,
  } = useStep0();

  return (
    <DiagnosisLayout title="신체 활동" nextTitle="인지 활동">
      <DiagnosisCardLayout title="도움">
        <RowCheckBox
          label="세면, 구강청결 도움"
          checked={isWashHelperChecked}
          onClick={() => setIsWashHelperChecked(!isWashHelperChecked)}
        />
        <RowCheckBox
          label="이동 도움"
          checked={isMoveHelperChecked}
          onClick={() => setIsMoveHelperChecked(!isMoveHelperChecked)}
        />
        <RowCheckBox
          label="목욕 도움"
          checked={isBathHelperChecked}
          onClick={() => setIsBathHelperChecked(!isBathHelperChecked)}
        />
      </DiagnosisCardLayout>
      <DiagnosisCardLayout title="식사지원">
        <RowCheckBox
          label="아침"
          checked={isBreakfastChecked}
          onClick={() => setIsBreakfastChecked(!isBreakfastChecked)}
          isExpandable={true}
          expandableChildren={
            <>
              <RowSegment
                label="식사 종류"
                options={["일반식", "죽", "유동식"]}
                value={breakfastType}
                onSegmentChange={setBreakfastType}
              />
              <RowSegment
                label="식사량"
                options={["1인분", "1/2이상", "1/3이하"]}
                value={breakfastAmount}
                onSegmentChange={setBreakfastAmount}
              />
            </>
          }
        />
        <RowCheckBox
          label="점심"
          checked={isLunchChecked}
          onClick={() => setIsLunchChecked(!isLunchChecked)}
          isExpandable={true}
          expandableChildren={
            <>
              <RowSegment
                label="식사 종류"
                options={["일반식", "죽", "유동식"]}
                value={lunchType}
                onSegmentChange={setLunchType}
              />
              <RowSegment
                label="식사량"
                options={["1인분", "1/2이상", "1/3이하"]}
                value={lunchAmount}
                onSegmentChange={setLunchAmount}
              />
            </>
          }
        />
        <RowCheckBox
          label="저녁"
          checked={isDinnerChecked}
          onClick={() => setIsDinnerChecked(!isDinnerChecked)}
          isExpandable={true}
          expandableChildren={
            <>
              <RowSegment
                label="식사 종류"
                options={["일반식", "죽", "유동식"]}
                value={dinnerType}
                onSegmentChange={setDinnerType}
              />
              <RowSegment
                label="식사량"
                options={["1인분", "1/2이상", "1/3이하"]}
                value={dinnerAmount}
                onSegmentChange={setDinnerAmount}
              />
            </>
          }
        />
      </DiagnosisCardLayout>
      <DiagnosisCardLayout title="화장실 이용" isRequired={true}>
        <RowCounter
          label="소변 횟수"
          value={urineCount}
          onIncrement={handleIncrementUrineCount}
          onDecrement={handleDecrementUrineCount}
        />
        <RowCounter
          label="대변 횟수"
          value={stoolCount}
          onIncrement={handleIncrementStoolCount}
          onDecrement={handleDecrementStoolCount}
        />
      </DiagnosisCardLayout>

      <DiagnosisCardLayout title="특이사항">
        <ColumnTextArea
          label="신체활동"
          value={physicalActivity}
          onChange={setPhysicalActivity}
          autoSelectTags={[
            {
              value: "식사를 잘 드셨어요!",
              isGood: true,
            },
            {
              value: "속이 좀 안 좋으시대요.",
              isGood: false,
            },
            {
              value: "장이 안 좋으시대요.",
              isGood: false,
            },
          ]}
        />
      </DiagnosisCardLayout>

      <StepButtons onNext={handleNext} onPrev={toPrev} isNextEnabled={true} />
    </DiagnosisLayout>
  );
};
