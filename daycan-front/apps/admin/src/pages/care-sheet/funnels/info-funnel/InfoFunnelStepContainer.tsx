import { FunnelProvider, FunnelStep, type FunnelState } from "@daycan/hooks";
import { useEffect, useMemo } from "react";
import { useAtomValue } from "jotai";
import { homeFunnelDataAtom } from "../home-funnel/atoms/homeAtom";

import { infoFunnelSteps } from "../../constants/steps";
import { useNavigate } from "react-router-dom";
import { Step0, Step1, Step2, Step3, Step4, Step5 } from "./steps";
import { infoFunnelDataAtom } from "./atoms/infoAtom";
import { useSetAtom } from "jotai";
import { convertFunnelStateToInfoFunnelData } from "./utils/parsingData";
import { getStoredValue } from "../utils/storage";
import type { InfoFunnelData } from "./types/infoType";

export const InfoFunnelStepContainer = () => {
  const navigate = useNavigate();
  const homeData = useAtomValue(homeFunnelDataAtom);
  const setInfoFunnelData = useSetAtom(infoFunnelDataAtom);
  const infoData = useAtomValue(infoFunnelDataAtom);

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
    navigate("/care-sheet/new/diagnosis");
  };

  // 홈 퍼널 데이터가 없으면 홈 퍼널로 이동 (atom 초기 null hydration 대비 로컬스토리지도 확인)
  useEffect(() => {
    const stored = getStoredValue("careSheet:homeFunnel");
    if (stored === null) {
      navigate("/care-sheet/new");
    }
  }, [homeData, navigate]);

  // photo-funnel로부터 채워진 info-funnel atom을 funnelState로 프리필
  const initialState: FunnelState | undefined = useMemo(() => {
    // atom에서 데이터 확인 - 데이터가 있고 memberId가 존재하는 경우만
    if (infoData && infoData.memberId) {
      return {
        STEP_0: {
          memberId: infoData.memberId,
          searchQuery: "",
        },
        STEP_1: {
          date: infoData.date,
          isToday: false,
        },
        STEP_2: {
          startTime: infoData.startTime,
        },
        STEP_3: {
          endTime: infoData.endTime,
        },
        STEP_4: {
          isUsedCarService: Boolean(infoData.mobilityNumber),
          carNumber: infoData.mobilityNumber || "",
        },
      } as FunnelState;
    }

    // localStorage에서도 확인 (atom 초기화 전 대비) - 데이터가 있고 memberId가 존재하는 경우만
    const stored = getStoredValue<InfoFunnelData>("careSheet:infoFunnel");
    if (stored && stored.memberId) {
      return {
        STEP_0: {
          memberId: stored.memberId,
          searchQuery: "",
        },
        STEP_1: {
          date: stored.date,
          isToday: false,
        },
        STEP_2: {
          startTime: stored.startTime,
        },
        STEP_3: {
          endTime: stored.endTime,
        },
        STEP_4: {
          isUsedCarService: Boolean(stored.mobilityNumber),
          carNumber: stored.mobilityNumber || "",
        },
      } as FunnelState;
    }

    return undefined;
  }, [infoData]);

  return (
    <FunnelProvider
      steps={infoFunnelSteps}
      funnelId="info-funnel"
      onComplete={handleComplete}
      initialState={initialState}
      initialStep={initialState ? "STEP_5" : undefined}
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
