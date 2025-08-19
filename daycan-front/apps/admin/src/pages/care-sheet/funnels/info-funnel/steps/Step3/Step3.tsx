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
import { step3HighlightingHeadingContainer } from "./Step3.css";
import { getMemberName } from "../../utils/parsingData";

export const Step3 = () => {
  const { toNext, toPrev, updateState, getStepState, funnelState } =
    useFunnel();
  const [selectedTime, setSelectedTime] = useState<string>("17:00");
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 수급자 이름 가져오기
  const memberName = getMemberName(funnelState);

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_3");
    if (existingData?.endTime) {
      setSelectedTime(existingData.endTime);
      setIsConfirmed(true);
    }
  }, [getStepState]);

  const handleTimeConfirm = (time24: string) => {
    // TimePicker에서 받은 24시간 값을 그대로 사용
    //TODO- API 명세 나오면 확인 필요
    console.log(selectedTime);
    setSelectedTime(time24);
    setIsConfirmed(true);

    // FunnelState에 데이터 저장
    updateState({
      endTime: time24,
    });
  };

  return (
    <>
      <InfoFunnelLayout>
        <div className={step3HighlightingHeadingContainer}>
          <HighlightingHeading text={memberName} />
          <Heading type="medium" weight={600} color={COLORS.gray[800]}>
            님이 언제 가셨나요?
          </Heading>
        </div>
        <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
          시간
        </Body>
        <TimePicker
          defaultTime24={getStepState("STEP_3")?.endTime || "17:00"}
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
