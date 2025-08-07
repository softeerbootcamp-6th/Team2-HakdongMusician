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
import { getRecipientName } from "../../utils/parsingData";

export const Step3 = () => {
  const { toNext, toPrev, updateState, getStepState, funnelState } =
    useFunnel();
  const [selectedTime, setSelectedTime] = useState<string>("09:00 오전");
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 수급자 이름 가져오기
  const recipientName = getRecipientName(funnelState);

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_3");
    if (existingData) {
      setSelectedTime(existingData.selectedTime);
      setIsConfirmed(true);
    }
  }, [getStepState]);

  const handleTimeConfirm = (h: string, m: string, ap: string) => {
    const timeString = `${h}:${m} ${ap}`;
    //TODO- API 명세 나오면 확인 필요
    console.log(selectedTime);
    setSelectedTime(timeString);
    setIsConfirmed(true);

    // FunnelState에 데이터 저장
    updateState({
      selectedGoneTime: timeString,
      hour: h,
      minute: m,
      amPm: ap,
    });

    console.log(h, m, ap);
  };
  return (
    <InfoFunnelLayout>
      <div className={step3HighlightingHeadingContainer}>
        <HighlightingHeading text={recipientName} />
        <Heading type="medium" weight={600} color={COLORS.gray[800]}>
          님이 언제 가셨나요?
        </Heading>
      </div>
      <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
        시간
      </Body>
      <TimePicker
        defaultHour="05"
        defaultMinute="00"
        defaultAmPm="오후"
        onConfirm={handleTimeConfirm}
      />
      <StepButtons
        isNextEnabled={isConfirmed}
        onNext={() => {
          toNext();
        }}
        onPrev={() => {
          toPrev();
        }}
      />
    </InfoFunnelLayout>
  );
};
