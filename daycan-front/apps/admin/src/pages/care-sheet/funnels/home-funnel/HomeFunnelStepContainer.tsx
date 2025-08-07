import { FunnelProvider, FunnelStep } from "@daycan/hooks";
import { Step0, Step1 } from "./steps";
import { homeFunnelSteps } from "../../constants/steps";
import { useNavigate } from "react-router-dom";

export const HomeFunnelStepContainer = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/care-sheet/info");
  };

  return (
    <FunnelProvider
      steps={homeFunnelSteps}
      funnelId="home-funnel"
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
