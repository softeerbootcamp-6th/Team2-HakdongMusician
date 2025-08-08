import { FunnelProvider, FunnelStep, type FunnelState } from "@daycan/hooks";
import { Step0, Step1 } from "./steps";
import { homeFunnelSteps } from "../../constants/steps";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { homeFunnelDataAtom } from "./atoms/homeAtom";
import { convertFunnelStateToHomeFunnelData } from "./utils/parseData";

export const HomeFunnelStepContainer = () => {
  const navigate = useNavigate();
  const setHomeFunnelData = useSetAtom(homeFunnelDataAtom);

  const handleComplete = (funnelState: FunnelState) => {
    // FunnelState를 home-funnel 데이터로 변환
    const homeFunnelData = convertFunnelStateToHomeFunnelData(funnelState);

    // home-funnel atom에 데이터 저장되어 나중에 케어시트 데이터 생성에 사용될 예정
    setHomeFunnelData(homeFunnelData);

    console.log(
      "home-funnel 완료! 데이터를 jotai에 저장했습니다:",
      homeFunnelData
    );

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
