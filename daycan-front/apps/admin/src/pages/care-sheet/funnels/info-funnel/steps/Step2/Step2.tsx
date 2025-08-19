import {
  Body,
  COLORS,
  Heading,
  HighlightingHeading,
  TimePicker,
} from "@daycan/ui";
import { InfoFunnelLayout } from "../../components/InfoFunnelLayout";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { useFunnel } from "@daycan/hooks";
import { useEffect, useState } from "react";
import { step2HighlightingHeadingContainer } from "./Step2.css";
import { getMemberName } from "../../utils/parsingData";

export const Step2 = () => {
  const { toNext, toPrev, updateState, getStepState, funnelState } =
    useFunnel();
  const [_, setSelectedTime] = useState<string>("09:00");
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 수급자 이름 가져오기
  const memberName = getMemberName(funnelState);

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_2");
    if (existingData?.startTime) {
      setSelectedTime(existingData.startTime);
      setIsConfirmed(true);
    }
  }, [getStepState]);

  const handleTimeConfirm = (time24: string) => {
    // TimePicker에서 받은 24시간 값을 그대로 사용
    setSelectedTime(time24);
    setIsConfirmed(true);

    // FunnelState에 데이터 저장
    // startTime은 24시간 포맷으로 저장
    updateState({
      startTime: time24,
    });
  };

  return (
    <>
      <InfoFunnelLayout>
        <div className={step2HighlightingHeadingContainer}>
          <HighlightingHeading text={memberName} />
          <Heading type="medium" weight={600} color={COLORS.gray[800]}>
            님이 언제 오셨나요?
          </Heading>
        </div>
        <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
          시간
        </Body>
        <TimePicker
          defaultTime24={getStepState("STEP_2")?.startTime || "09:00"}
          onConfirm={handleTimeConfirm}
        />
      </InfoFunnelLayout>
      <StepButtons
        isNextEnabled={isConfirmed}
        onNext={toNext}
        onPrev={toPrev}
      />
    </>
  );
};
