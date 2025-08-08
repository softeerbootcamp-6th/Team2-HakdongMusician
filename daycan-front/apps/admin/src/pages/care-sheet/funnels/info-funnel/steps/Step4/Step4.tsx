import {
  Body,
  Button,
  COLORS,
  Heading,
  HighlightingHeading,
  Icon,
} from "@daycan/ui";
import { InfoFunnelLayout } from "../../components/InfoFunnelLayout";
import { step4HighlightingHeadingContainer } from "./Step4.css";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { useEffect, useState } from "react";
import { useFunnel } from "@daycan/hooks";
import { step4Input, step4InputContainer } from "./Step4.css";
import { getRecipientName } from "../../utils/parsingData";

export const Step4 = () => {
  const { toNext, toPrev, updateState, getStepState, funnelState } =
    useFunnel();
  const [isUsedCarService, setIsUsedCarService] = useState(false);
  const [carNumber, setCarNumber] = useState("");

  // 수급자 이름 가져오기
  const recipientName = getRecipientName(funnelState);

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_4");
    if (existingData) {
      setIsUsedCarService(existingData.isUsedCarService || false);
      setCarNumber(existingData.carNumber || "");
    }
  }, [getStepState]);

  const handleCarServiceToggle = () => {
    const newIsUsed = !isUsedCarService;
    setIsUsedCarService(newIsUsed);

    // FunnelState에 데이터 저장
    updateState({
      isUsedCarService: newIsUsed,
      carNumber: newIsUsed ? carNumber : "", // 이용하지 않으면 차량번호 초기화
    });
  };

  const handleCarNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCarNumber(value); // 로컬 상태 업데이트 추가

    // FunnelState에 데이터 저장
    updateState({
      carNumber: value,
      isUsedCarService: true, // 차량번호 입력 시 이용으로 설정
    });
  };

  const handleCarNumberSave = () => {
    updateState({
      carNumber: carNumber,
      isUsedCarService: true,
    });
  };

  const handleNext = () => {
    toNext();
  };

  const handlePrev = () => {
    toPrev();
  };

  return (
    <InfoFunnelLayout>
      <div className={step4HighlightingHeadingContainer}>
        <HighlightingHeading text={recipientName} />
        <Heading type="medium" weight={600} color={COLORS.gray[800]}>
          님이
        </Heading>
      </div>
      <Heading type="medium" weight={600} color={COLORS.gray[800]}>
        이동서비스를 이용하셨나요?
      </Heading>

      <Button
        variant="unEmphasized"
        size="fullWidth"
        flexRule="spaceBetween"
        onClick={handleCarServiceToggle}
        style={{
          padding: 24,
          backgroundColor: COLORS.white,
        }}
      >
        <Body type="small" weight={500} color={COLORS.gray[800]}>
          이동서비스 이용
        </Body>
        <Icon
          name="transportation"
          width={24}
          height={24}
          color={isUsedCarService ? COLORS.primary[300] : COLORS.gray[400]}
        />
      </Button>
      {isUsedCarService && (
        <div className={step4InputContainer}>
          <input
            type="text"
            placeholder="차량 번호를 입력해주세요."
            value={carNumber}
            onChange={handleCarNumberChange}
            className={step4Input}
          />
          {carNumber ? (
            <Button
              variant="primary"
              size="small"
              onClick={handleCarNumberSave}
            >
              저장
            </Button>
          ) : (
            <Icon name="search" width={24} height={24} />
          )}
        </div>
      )}
      {!isUsedCarService && (
        <Button
          variant="unEmphasized"
          size="fullWidth"
          flexRule="spaceBetween"
          onClick={() => {
            setIsUsedCarService(false);
            setCarNumber(""); // 차량번호 초기화
            updateState({
              isUsedCarService: false,
              carNumber: "",
            });
          }}
          style={{
            padding: 24,
            backgroundColor: COLORS.white,
          }}
        >
          <Body type="small" weight={500} color={COLORS.gray[800]}>
            이동서비스 미이용
          </Body>
          <Icon
            name="block"
            width={24}
            height={24}
            color={isUsedCarService ? COLORS.gray[400] : COLORS.primary[300]}
          />
        </Button>
      )}

      <StepButtons
        isNextEnabled={!!carNumber || !isUsedCarService}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </InfoFunnelLayout>
  );
};
