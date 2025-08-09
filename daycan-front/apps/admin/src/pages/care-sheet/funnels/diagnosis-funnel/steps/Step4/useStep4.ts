import { useEffect } from "react";
import { useFunnel } from "@daycan/hooks";
import { convertFunnelStateToDiagnosisSummary } from "../../utils/parsingData";

export const useStep4 = () => {
  const { funnelState, toPrev, toNext, getStepState } = useFunnel();
  const sections = convertFunnelStateToDiagnosisSummary(funnelState);

  // 기존 데이터가 있으면 로드 (Step4는 요약 화면이므로 실제로는 필요 없지만 일관성을 위해 추가)
  useEffect(() => {
    const existingData = getStepState("STEP_4");
    if (existingData) {
      // Step4는 요약 화면이므로 특별한 상태 복원이 필요하지 않음
      console.log("Step4 기존 데이터:", existingData);
    }
  }, [getStepState]);

  return {
    sections,
    toPrev,
    toNext,
  };
};

