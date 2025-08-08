import { FunnelProvider, FunnelStep, type FunnelState } from "@daycan/hooks";

import { infoFunnelSteps } from "../../constants/steps";
import { useNavigate } from "react-router-dom";
import { Step0, Step1, Step2, Step3, Step4, Step5 } from "./steps";
import { infoFunnelDataAtom } from "./atoms/infoAtom";
import { useSetAtom } from "jotai";
import { convertFunnelStateToInfoFunnelData } from "./utils/parsingData";

export const InfoFunnelStepContainer = () => {
  const navigate = useNavigate();
  const setInfoFunnelData = useSetAtom(infoFunnelDataAtom);

  const handleComplete = (funnelState: FunnelState) => {
    // FunnelState를 info-funnel 데이터로 변환
    const infoFunnelData = convertFunnelStateToInfoFunnelData(funnelState);

    // info-funnel atom에 데이터 저장
    setInfoFunnelData(infoFunnelData);

    console.log(
      "info-funnel 완료! 데이터를 jotai에 저장했습니다:",
      infoFunnelData
    );

    // 다음 페이지로 이동
    navigate("/care-sheet/diagnosis");
  };

  return (
    <FunnelProvider
      steps={infoFunnelSteps}
      funnelId="info-funnel"
      onComplete={handleComplete}
    >
      <FunnelStep name="STEP_0">
        <Step0 />
      </FunnelStep>
      <FunnelStep name="STEP_1">
        <Step1 />
      </FunnelStep>
      <FunnelStep name="STEP_2">
        <Step2 />
      </FunnelStep>
      <FunnelStep name="STEP_3">
        <Step3 />
      </FunnelStep>
      <FunnelStep name="STEP_4">
        <Step4 />
      </FunnelStep>
      <FunnelStep name="STEP_5">
        <Step5 />
      </FunnelStep>
    </FunnelProvider>
  );
};
