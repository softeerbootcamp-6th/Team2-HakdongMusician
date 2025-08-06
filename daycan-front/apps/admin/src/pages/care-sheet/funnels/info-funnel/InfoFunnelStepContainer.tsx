import { FunnelProvider, FunnelStep } from "@daycan/hooks";

import { infoFunnelSteps } from "../../constants/steps";
import { useNavigate } from "react-router-dom";
import { Step0, Step1 } from "./steps";

export const InfoFunnelStepContainer = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/care-sheet/complete");
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
    </FunnelProvider>
  );
};
