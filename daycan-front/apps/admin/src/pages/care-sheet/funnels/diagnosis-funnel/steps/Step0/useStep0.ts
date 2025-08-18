import { useEffect, useState } from "react";
import { useFunnel } from "@daycan/hooks";
import { DIAGNOSIS_CONSTANTS } from "../../constants/diagnosis";

export const useStep0 = () => {
  const { toNext, toPrev, updateState, getStepState } = useFunnel();

  // 상태들
  const [isWashHelperChecked, setIsWashHelperChecked] = useState(false);
  const [isMoveHelperChecked, setIsMoveHelperChecked] = useState(false);
  const [isBathHelperChecked, setIsBathHelperChecked] = useState(false);
  const [bathingDurationMinutes, setBathingDurationMinutes] =
    useState<string>("30분");
  const [bathingType, setBathingType] = useState<string>("전신입욕");
  const [isBreakfastChecked, setIsBreakfastChecked] = useState(false);
  const [isLunchChecked, setIsLunchChecked] = useState(false);
  const [isDinnerChecked, setIsDinnerChecked] = useState(false);
  const [breakfastType, setBreakfastType] = useState("일반식");
  const [breakfastAmount, setBreakfastAmount] = useState("1인분");
  const [lunchType, setLunchType] = useState("일반식");
  const [lunchAmount, setLunchAmount] = useState("1인분");
  const [dinnerType, setDinnerType] = useState("일반식");
  const [dinnerAmount, setDinnerAmount] = useState("1인분");
  const [urineCount, setUrineCount] = useState(0);
  const [stoolCount, setStoolCount] = useState(0);
  const [physicalActivity, setPhysicalActivity] = useState("");

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_0");
    if (existingData) {
      setIsWashHelperChecked(existingData.isWashHelperChecked || false);
      setIsMoveHelperChecked(existingData.isMoveHelperChecked || false);
      setIsBathHelperChecked(existingData.isBathHelperChecked || false);
      setBathingDurationMinutes(existingData.bathingDurationMinutes || null);
      setBathingType(existingData.bathingType || null);
      setIsBreakfastChecked(existingData.isBreakfastChecked || false);
      setIsLunchChecked(existingData.isLunchChecked || false);
      setIsDinnerChecked(existingData.isDinnerChecked || false);
      setBreakfastType(existingData.breakfastType || "일반식");
      setBreakfastAmount(existingData.breakfastAmount || "1인분");
      setLunchType(existingData.lunchType || "일반식");
      setLunchAmount(existingData.lunchAmount || "1인분");
      setDinnerType(existingData.dinnerType || "일반식");
      setDinnerAmount(existingData.dinnerAmount || "1인분");
      setUrineCount(existingData.urineCount || 0);
      setStoolCount(existingData.stoolCount || 0);
      setPhysicalActivity(existingData.physicalActivity || "");
    }
  }, [getStepState]);

  // 이벤트 핸들러들
  const handleIncrementUrineCount = () => {
    if (urineCount < DIAGNOSIS_CONSTANTS.MAX_URINE_COUNT) {
      setUrineCount(urineCount + 1);
    }
  };

  const handleDecrementUrineCount = () => {
    if (urineCount > DIAGNOSIS_CONSTANTS.MIN_URINE_COUNT) {
      setUrineCount(urineCount - 1);
    }
  };

  const handleIncrementStoolCount = () => {
    if (stoolCount < DIAGNOSIS_CONSTANTS.MAX_STOOL_COUNT) {
      setStoolCount(stoolCount + 1);
    }
  };

  const handleDecrementStoolCount = () => {
    if (stoolCount > DIAGNOSIS_CONSTANTS.MIN_STOOL_COUNT) {
      setStoolCount(stoolCount - 1);
    }
  };

  const handleNext = () => {
    updateState({
      isWashHelperChecked,
      isMoveHelperChecked,
      isBathHelperChecked,
      bathingDurationMinutes,
      bathingType,
      isBreakfastChecked,
      isLunchChecked,
      isDinnerChecked,
      breakfastType,
      breakfastAmount,
      lunchType,
      lunchAmount,
      dinnerType,
      dinnerAmount,
      urineCount,
      stoolCount,
      physicalActivity,
    });
    toNext();
  };

  return {
    // 상태들
    isWashHelperChecked,
    setIsWashHelperChecked,
    isMoveHelperChecked,
    setIsMoveHelperChecked,
    isBathHelperChecked,
    setIsBathHelperChecked,
    bathingDurationMinutes,
    setBathingDurationMinutes,
    bathingType,
    setBathingType,
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
  };
};
