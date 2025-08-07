import {
  Body,
  Calendar,
  COLORS,
  Heading,
  HighlightingHeading,
  Icon,
} from "@daycan/ui";
import { InfoFunnelLayout } from "../../components/InfoFunnelLayout";
import { useEffect, useState } from "react";
import {
  step1Container,
  step1HighlightingHeadingContainer,
  step1TodayContainer,
  step1DateContainer,
} from "./Step1.css";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { useFunnel } from "@daycan/hooks";
import { getRecipientName } from "../../utils/parsingData";

export const Step1 = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isToday, setIsToday] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { toNext, toPrev, getStepState, updateState, funnelState } =
    useFunnel();

  // 수급자 이름 가져오기
  const recipientName = getRecipientName(funnelState);

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_1");
    if (existingData) {
      setSelectedDate(existingData.selectedDate);
      setIsToday(existingData.isToday || false);
    }
  }, [getStepState]);

  const handleTodayToggle = () => {
    const newIsToday = !isToday;
    setIsToday(newIsToday);

    // 오늘 선택 시 날짜를 오늘로 설정
    if (newIsToday) {
      const today = new Date();
      setSelectedDate(today);
      updateState({
        isToday: newIsToday,
        selectedDate: today,
      });
    } else {
      setSelectedDate(undefined);
      updateState({
        isToday: newIsToday,
        selectedDate: undefined,
      });
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    updateState({
      selectedDate: date,
      isToday: false, // 다른 날짜 선택 시 오늘 선택 해제
    });
  };

  return (
    <InfoFunnelLayout>
      <div className={step1Container}>
        <div className={step1HighlightingHeadingContainer}>
          <HighlightingHeading text={recipientName} />
          <Heading type="medium" weight={600} color={COLORS.gray[800]}>
            님이 어떤 날에 오셨나요?
          </Heading>
        </div>
        <div
          className={step1TodayContainer}
          onClick={() => {
            handleTodayToggle();
          }}
        >
          <Body type="medium" weight={600} color={COLORS.gray[800]}>
            오늘 이용했어요
          </Body>
          <Icon
            name="circleCheck"
            width={24}
            height={24}
            color={isToday ? COLORS.primary[300] : COLORS.gray[50]}
          />
        </div>
        <div
          className={step1DateContainer}
          onClick={() => {
            setIsDatePickerOpen(!isDatePickerOpen);
          }}
        >
          <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
            다른 날짜 선택
          </Body>
          <Icon
            name="calendar"
            width={20}
            height={20}
            color={COLORS.gray[600]}
          />
        </div>
        {isDatePickerOpen && (
          <Calendar
            onDateSelect={(date) => {
              handleDateSelect(date);
            }}
            onConfirm={(date) => {
              handleDateSelect(date);
              setIsDatePickerOpen(false);
            }}
            initialDate={new Date()}
          />
        )}
      </div>
      <StepButtons
        onNext={() => {
          toNext();
        }}
        onPrev={() => {
          toPrev();
        }}
        isNextEnabled={!!selectedDate || isToday}
      />
    </InfoFunnelLayout>
  );
};
