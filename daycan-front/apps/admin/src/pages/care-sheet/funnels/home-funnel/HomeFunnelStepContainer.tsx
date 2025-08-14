import { FunnelProvider, FunnelStep, type FunnelState } from "@daycan/hooks";
import { Step0, Step1 } from "./steps";
import { homeFunnelSteps } from "../../constants/steps";
import { useNavigate } from "react-router-dom";
import { useSetAtom, useAtomValue } from "jotai";
import { homeFunnelDataAtom } from "./atoms/homeAtom";
import { convertFunnelStateToHomeFunnelData } from "./utils/parseData";
import { useMemo } from "react";
import { getStoredValue } from "../utils/storage";
import type { HomeFunnelData } from "./types/homeType";

export const HomeFunnelStepContainer = () => {
  const navigate = useNavigate();
  const setHomeFunnelData = useSetAtom(homeFunnelDataAtom);
  const homeData = useAtomValue(homeFunnelDataAtom);

  const handleComplete = (funnelState: FunnelState) => {
    // FunnelState를 home-funnel 데이터로 변환
    const homeFunnelData = convertFunnelStateToHomeFunnelData(funnelState);

    // home-funnel atom에 데이터 저장되어 나중에 케어시트 데이터 생성에 사용될 예정
    setHomeFunnelData(homeFunnelData);

    console.log(
      "home-funnel 완료! 데이터를 jotai에 저장했습니다:",
      homeFunnelData
    );

    navigate("/care-sheet/new/info");
  };

  // 기본값이 있으면 Step1로 프리필
  const initialState: FunnelState | undefined = useMemo(() => {
    // atom에서 데이터 확인
    if (homeData) {
      return {
        STEP_0: {
          writerId: homeData.writerId,
        },
        STEP_1: {},
      };
    }

    // localStorage에서도 확인 (atom 초기화 전 대비)
    const stored = getStoredValue<HomeFunnelData>("careSheet:homeFunnel");
    if (stored) {
      return {
        STEP_0: {
          writerId: stored.writerId,
        },
        STEP_1: {},
      };
    }

    return undefined;
  }, [homeData]);

  return (
    <FunnelProvider
      steps={homeFunnelSteps}
      funnelId="home-funnel"
      onComplete={handleComplete}
      initialState={initialState}
      initialStep={initialState ? "STEP_1" : "STEP_0"}
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
