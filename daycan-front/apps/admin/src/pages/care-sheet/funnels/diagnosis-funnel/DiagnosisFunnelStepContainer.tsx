import { FunnelProvider, FunnelStep, type FunnelState } from "@daycan/hooks";
import { Step0, Step1, Step2, Step3, Step4, Step5 } from "./steps";
import { diagnosisFunnelSteps } from "../../constants/steps";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { diagnosisFunnelDataAtom } from "./atoms/diagnosisAtom";
import { convertFunnelStateToDiagnosisFunnelData } from "./utils/parsingData";
import { infoFunnelDataAtom } from "../info-funnel/atoms/infoAtom";
import { useNavigate } from "react-router-dom";
import { getStoredValue } from "../utils/storage";

export const DiagnosisFunnelStepContainer = () => {
  const navigate = useNavigate();
  const setDiagnosisData = useSetAtom(diagnosisFunnelDataAtom);
  const infoData = useAtomValue(infoFunnelDataAtom);

  // info 퍼널 데이터가 없으면 info 퍼널로 이동 (atom 초기 null hydration 대비 로컬스토리지도 확인)
  useEffect(() => {
    const stored = getStoredValue("careSheet:infoFunnel");
    if (stored === null) {
      navigate("/care-sheet/info", { replace: true });
    }
  }, [infoData]);

  const handleComplete = (funnelState: FunnelState) => {
    //TODO- 추후에 API 연결로 수정해야함
    const diagnosisData = convertFunnelStateToDiagnosisFunnelData(funnelState);
    setDiagnosisData(diagnosisData);
    console.log("diagnosis-funnel 완료! jotai에 저장:", diagnosisData);
  };

  return (
    <FunnelProvider
      steps={diagnosisFunnelSteps}
      funnelId="diagnosis-funnel"
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
