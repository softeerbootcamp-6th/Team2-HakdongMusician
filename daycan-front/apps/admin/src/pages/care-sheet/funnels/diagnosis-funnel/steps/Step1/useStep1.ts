import { useEffect, useState } from "react";
import { useFunnel } from "@daycan/hooks";

export const useStep1 = () => {
  const { toNext, toPrev, updateState, getStepState } = useFunnel();
  const [isCognitiveHelperChecked, setIsCognitiveHelperChecked] =
    useState(false);
  const [isCommunicationHelperChecked, setIsCommunicationHelperChecked] =
    useState(false);
  const [physicalActivity, setPhysicalActivity] = useState("");

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_1");
    if (existingData) {
      setIsCognitiveHelperChecked(
        existingData.isCognitiveHelperChecked || false
      );
      setIsCommunicationHelperChecked(
        existingData.isCommunicationHelperChecked || false
      );
      setPhysicalActivity(existingData.physicalActivity || "");
    }
  }, [getStepState]);

  const handleNext = () => {
    updateState({
      isCognitiveHelperChecked,
      isCommunicationHelperChecked,
      physicalActivity,
    });
    toNext();
  };

  return {
    isCognitiveHelperChecked,
    setIsCognitiveHelperChecked,
    isCommunicationHelperChecked,
    setIsCommunicationHelperChecked,
    physicalActivity,
    setPhysicalActivity,
    handleNext,
    toPrev,
  };
};

