import { useState, useMemo, type ReactNode } from "react";
import { FunnelContext } from "./FunnelContext";
import type { Step, FunnelState, FunnelStepState } from "./types";

export interface FunnelProviderProps<TSteps extends readonly string[]> {
  steps: TSteps;
  funnelId?: string; // 여러 Funnel을 구분하기 위한 ID
  onComplete?: (funnelState: FunnelState) => void; // 퍼널 완료 시 상태와 함께 호출
  initialStep?: Step; // 최초 진입 스텝
  initialState?: FunnelState; // 최초 펀널 상태 주입
  children: ReactNode;
}

export function FunnelProvider<TSteps extends readonly Step[]>({
  steps,
  funnelId,
  onComplete,
  initialStep,
  initialState,
  children,
}: FunnelProviderProps<TSteps>) {
  const initialIndex = (() => {
    if (!initialStep) return 0;
    const idx = steps.indexOf(initialStep);
    return idx >= 0 ? idx : 0;
  })();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [funnelState, setFunnelState] = useState<FunnelState>(
    initialState ?? {}
  );
  const [stepHistory, setStepHistory] = useState<FunnelStepState[]>([]);

  const value = useMemo(() => {
    const currentStep = steps[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === steps.length - 1;

    const updateState = (stepData: any) => {
      const stepName = currentStep;
      const newStepState: FunnelStepState = {
        step: stepName,
        data: stepData,
        timestamp: Date.now(),
      };

      setFunnelState((prev) => ({
        ...prev,
        [stepName]: stepData,
      }));

      setStepHistory((prev) => [...prev, newStepState]);

      console.log(`Funnel 상태 업데이트: ${stepName}`, stepData);
    };

    const toNext = () => {
      if (isLast && onComplete) {
        onComplete(funnelState);
        console.log("Funnel 종료: ", funnelId, "최종 상태:", funnelState);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, steps.length - 1));
      }
    };

    const toPrev = () => {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const toStep = (step: Step) => {
      const index = steps.indexOf(step);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    };

    const getStepState = (stepName: string) => {
      return funnelState[stepName];
    };

    const getStepHistory = () => {
      return stepHistory;
    };

    const clearState = () => {
      setFunnelState({});
      setStepHistory([]);
      console.log("Funnel 상태 초기화");
    };

    return {
      steps,
      currentIndex,
      currentStep,
      isFirst,
      isLast,
      toNext,
      toPrev,
      toStep,
      updateState,
      getStepState,
      getStepHistory,
      clearState,
      funnelState,
    };
  }, [steps, currentIndex, onComplete, funnelState, stepHistory, funnelId]);

  return (
    <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>
  );
}
