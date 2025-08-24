import { FunnelProvider, FunnelStep, type FunnelState } from "@daycan/hooks";
import { Step0, Step1 } from "./steps";
import { homeFunnelSteps } from "../../constants/steps";
import { useSetAtom, useAtomValue } from "jotai";
import { homeFunnelDataAtom } from "./atoms/homeAtom";
import { convertFunnelStateToHomeFunnelData } from "./utils/parseData";
import { getStoredValue } from "../utils/storage";
import { useMemo } from "react";
import type { HomeFunnelData } from "./types/homeType";

export const HomeFunnelStepContainer = () => {
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
  };

  // 기본값이 있으면 Step1로 프리필
  const initialState: FunnelState | undefined = useMemo(() => {
    // atom에서 데이터 확인 - 데이터가 있고 writerId가 존재하는 경우만
    if (homeData && homeData.writerId) {
      return {
        STEP_0: {
          writerId: homeData.writerId,
        },
        STEP_1: {},
      };
    }

    // localStorage에서도 확인 (atom 초기화 전 대비) - 데이터가 있고 writerId가 존재하는 경우만
    const stored = getStoredValue<HomeFunnelData>("careSheet:homeFunnel");
    if (stored && stored.writerId) {
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
    <>
      <FunnelProvider
        steps={homeFunnelSteps}
        funnelId="home-funnel"
        onComplete={handleComplete}
        initialState={initialState}
        initialStep={initialState ? "STEP_1" : undefined}
      >
        <FunnelStep name="STEP_0">
          <Step0 />
        </FunnelStep>
        <FunnelStep name="STEP_1">
          <Step1 />
        </FunnelStep>
      </FunnelProvider>
    </>
  );
};
