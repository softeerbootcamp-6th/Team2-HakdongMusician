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
import { getMemberName } from "../../utils/parsingData";
import { formatYYYYMMDD, TODAY_DATE } from "@/utils/dateFormatter";

export const Step1 = () => {
  const [date, setDate] = useState<Date>();
  const [isToday, setIsToday] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { toNext, toPrev, getStepState, updateState, funnelState } =
    useFunnel();

  // 수급자 이름 가져오기
  const memberName = getMemberName(funnelState);

  // 기존 데이터가 있으면 로드
  // 단 기존의 데이터는 "YYYY-MM-DD" 형식으로 들어옴. 이를 Date 객체로 변환
  useEffect(() => {
    const existingData = getStepState("STEP_1");
    if (existingData) {
      if (existingData.date) {
        setDate(new Date(existingData.date));
      }
      setIsToday(existingData.isToday || false);
    }
  }, [getStepState]);

  const handleTodayToggle = () => {
    const newIsToday = !isToday;
    setIsToday(newIsToday);

    // 오늘 선택 시 날짜를 오늘로 설정
    if (newIsToday) {
      const today = new Date();
      setDate(today);
      updateState({
        isToday: newIsToday,
        date: TODAY_DATE,
      });
    } else {
      setDate(undefined);
      updateState({
        isToday: newIsToday,
        date: undefined,
      });
    }
  };

  const handleDateSelect = (date: Date) => {
    setDate(date);
    updateState({
      date: formatYYYYMMDD(date),
      isToday: false, // 다른 날짜 선택 시 오늘 선택 해제
    });
  };

  return (
    <>
      <InfoFunnelLayout>
        <div className={step1Container}>
          <div>
            <>
              <div className={step1HighlightingHeadingContainer}>
                <HighlightingHeading text={memberName} />
                <Heading type="medium" weight={600} color={COLORS.gray[800]}>
                  님이
                </Heading>
              </div>
              <Heading type="medium" weight={600} color={COLORS.gray[800]}>
                어떤 날에 오셨나요?
              </Heading>
            </>
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
              stroke={COLORS.white}
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
            {date && !isToday && (
              <Body type="xsmall" weight={500} color={COLORS.primary[300]}>
                {formatYYYYMMDD(date)}
              </Body>
            )}
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
              initialDate={date || new Date()}
            />
          )}
        </div>
      </InfoFunnelLayout>
      <StepButtons
        onNext={() => {
          toNext();
        }}
        onPrev={() => {
          toPrev();
        }}
        isNextEnabled={!!date || isToday}
      />
    </>
  );
};
